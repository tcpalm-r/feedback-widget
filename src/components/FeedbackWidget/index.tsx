'use client';

import { useEffect, useRef, useState, useCallback, useSyncExternalStore } from 'react';
import { getWidgetStyles } from './styles';
import { getFeedbackFormHTML, FeedbackType, SubmissionState } from './FeedbackForm';
import { getSelectionModeOverlayHTML } from './SelectionMode';
import { isInteractiveElement, findInteractiveParent, createSelectedElementData, SelectedElementData } from './utils/elements';
import {
  initializePosition,
  startDrag,
  updateDragPosition,
  endDrag,
  subscribe,
  getSnapshot,
  getServerSnapshot,
  getExpandedPositionForCorner,
  WIDGET_SIZE,
  PADDING,
} from './utils/positionStore';
import { submitFeedback, FeedbackMetadata, SubmitFeedbackResult } from '../../lib/supabase';
import { detectUserId, JwtConfig } from './utils/jwt';
import {
  initConfig,
  getConfig,
  FeedbackWidgetConfig,
  WidgetPosition,
} from './utils/config';

// MessageSquare icon SVG path (from Lucide)
const MessageSquareIcon = `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
`;

export interface FeedbackWidgetProps {
  position?: WidgetPosition;
  appId?: string;
  jwtConfig?: JwtConfig;
}

// Hook to detect client-side mount
function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

/**
 * Initialize the FeedbackWidget with configuration.
 * Must be called before rendering the widget.
 *
 * @param config - Configuration object
 * @param config.appId - Required. Unique identifier for your application
 * @param config.position - Optional. Initial position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
 * @param config.jwtConfig - Optional. JWT detection configuration
 *
 * @throws Error if appId is missing or invalid
 *
 * @example
 * ```tsx
 * // In your app initialization
 * FeedbackWidget.init({
 *   appId: 'my-app',
 *   position: 'bottom-left',
 *   jwtConfig: {
 *     cookieKeys: ['auth_token'],
 *     userIdClaim: 'user_id'
 *   }
 * });
 *
 * // Then render the widget
 * <FeedbackWidget />
 * ```
 */
FeedbackWidget.init = function init(config: FeedbackWidgetConfig): void {
  initConfig(config);
};

export function FeedbackWidget({
  position,
  appId,
  jwtConfig,
}: FeedbackWidgetProps = {}) {
  // Get config from init() if available, with props as overrides
  const globalConfig = getConfig();

  // Resolve effective values: props override init() config
  const effectiveAppId = appId ?? globalConfig?.appId ?? 'default';
  const effectivePosition = position ?? globalConfig?.position ?? 'bottom-right';
  const effectiveJwtConfig = jwtConfig ?? globalConfig?.jwtConfig;
  const hostRef = useRef<HTMLDivElement>(null);
  const shadowRootRef = useRef<ShadowRoot | null>(null);
  const morphContainerRef = useRef<HTMLDivElement | null>(null);
  const containerListenersAddedRef = useRef(false);
  // Refs to track current state for event handlers (so they don't capture stale values)
  const isExpandedRef = useRef(false);
  const isSelectionModeRef = useRef(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const isDraggingRef = useRef(false);
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('general');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isNetworkError, setIsNetworkError] = useState(false);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  // Update refs for event handlers to read current state
  isExpandedRef.current = isExpanded;
  isSelectionModeRef.current = isSelectionMode;
  // Ref to hold current handleMouseDown (so container listener doesn't capture stale version)
  const handleMouseDownRef = useRef<(e: MouseEvent) => void>(() => {});
  const [selectedElements, setSelectedElements] = useState<SelectedElementData[]>([]);
  const [selectionWarning, setSelectionWarning] = useState<string | null>(null);
  const [isElementListExpanded, setIsElementListExpanded] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const dragStartPositionRef = useRef<{ x: number; y: number } | null>(null);
  const hasDraggedRef = useRef(false);
  const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const highlightOverlayRef = useRef<HTMLDivElement | null>(null);
  const hoveredElementRef = useRef<HTMLElement | null>(null);
  const selectionBadgesRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const warningTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const MAX_SELECTED_ELEMENTS = 5;

  const isClient = useIsClient();

  // Use external store for position
  const widgetState = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { position: widgetPosition, isDragging } = widgetState;

  // Initialize position on mount
  useEffect(() => {
    initializePosition(effectivePosition);
  }, [effectivePosition]);

  // Track if drag has been started (to avoid re-calling startDrag)
  const dragStartedRef = useRef(false);

  // Drag handlers
  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      // Only start drag on left click, and only when collapsed
      if (e.button !== 0 || isExpanded) return;

      isDraggingRef.current = true;
      hasDraggedRef.current = false;
      dragStartedRef.current = false;
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      dragStartPositionRef.current = { ...widgetPosition };
      // Don't call startDrag() here - wait until user actually moves
    },
    [widgetPosition, isExpanded]
  );
  // Update ref so container listener always uses latest version
  handleMouseDownRef.current = handleMouseDown;

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (
        !isDraggingRef.current ||
        !dragStartRef.current ||
        !dragStartPositionRef.current
      ) {
        return;
      }

      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;

      // Mark as dragged if moved more than 5 pixels
      if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        hasDraggedRef.current = true;

        // Start drag mode only when user actually moves (not on mousedown)
        if (!dragStartedRef.current) {
          dragStartedRef.current = true;
          startDrag();
        }
      }

      // Only update position if we've actually started dragging
      if (!dragStartedRef.current) return;

      // Constrain to viewport
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const newX = Math.max(PADDING, Math.min(
        dragStartPositionRef.current.x + deltaX,
        viewportWidth - WIDGET_SIZE - PADDING
      ));
      const newY = Math.max(PADDING, Math.min(
        dragStartPositionRef.current.y + deltaY,
        viewportHeight - WIDGET_SIZE - PADDING
      ));

      updateDragPosition(newX, newY);
    },
    []
  );

  const handleMouseUp = useCallback(() => {
    if (isDraggingRef.current && dragStartedRef.current) {
      // Snap to nearest corner (only if drag actually started)
      endDrag();
    }

    isDraggingRef.current = false;
    dragStartedRef.current = false;
    dragStartRef.current = null;
    dragStartPositionRef.current = null;
  }, []);

  // Global mouse event listeners for drag - always listen, check ref inside handlers
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // Clear auto-close timer, warning timeout, highlight overlay, and selection badges on unmount
  useEffect(() => {
    const badgesMap = selectionBadgesRef.current;
    return () => {
      if (autoCloseTimerRef.current) {
        clearTimeout(autoCloseTimerRef.current);
      }
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
      }
      if (highlightOverlayRef.current) {
        highlightOverlayRef.current.remove();
        highlightOverlayRef.current = null;
      }
      // Clean up all selection badges
      badgesMap.forEach(badge => badge.remove());
      badgesMap.clear();
    };
  }, []);

  // ESC key handler to exit selection mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSelectionMode) {
        setIsSelectionMode(false);
      }
    };

    if (isSelectionMode) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isSelectionMode]);

  // Helper to create a numbered badge for a selected element
  // Uses Sonance brand colors and Montserrat font
  const createSelectionBadge = useCallback((element: HTMLElement, number: number): HTMLDivElement => {
    const badge = document.createElement('div');
    badge.className = 'feedback-selection-badge';
    badge.setAttribute('data-selection-badge', String(number));
    badge.textContent = String(number);
    badge.style.cssText = `
      position: fixed;
      z-index: 999998;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: #00A3E1;
      color: white;
      font-size: 12px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    `;
    const rect = element.getBoundingClientRect();
    badge.style.left = `${rect.left - 8}px`;
    badge.style.top = `${rect.top - 8}px`;
    document.body.appendChild(badge);
    return badge;
  }, []);

  // Helper to update all badge positions (for scroll/resize)
  const updateBadgePositions = useCallback(() => {
    selectionBadgesRef.current.forEach((badge, selector) => {
      const element = document.querySelector(selector) as HTMLElement | null;
      if (element) {
        const rect = element.getBoundingClientRect();
        badge.style.left = `${rect.left - 8}px`;
        badge.style.top = `${rect.top - 8}px`;
      }
    });
  }, []);

  // Helper to show a warning message
  const showWarning = useCallback((message: string) => {
    setSelectionWarning(message);
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
    }
    warningTimeoutRef.current = setTimeout(() => {
      setSelectionWarning(null);
    }, 2000);
  }, []);

  // Hover highlighting and click selection in selection mode
  useEffect(() => {
    if (!isSelectionMode) {
      // Clean up highlight overlay when exiting selection mode
      if (highlightOverlayRef.current) {
        highlightOverlayRef.current.remove();
        highlightOverlayRef.current = null;
      }
      hoveredElementRef.current = null;
      // Note: We keep the badges when exiting selection mode so they're visible
      return;
    }

    // Create highlight overlay element if it doesn't exist
    // Uses Sonance "The Beam" blue (#00A3E1) for consistent branding
    if (!highlightOverlayRef.current) {
      const overlay = document.createElement('div');
      overlay.id = 'feedback-highlight-overlay';
      overlay.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 999997;
        border: 2px solid #00A3E1;
        background-color: rgba(0, 163, 225, 0.1);
        border-radius: 4px;
        transition: all 0.1s ease-out;
        display: none;
      `;
      document.body.appendChild(overlay);
      highlightOverlayRef.current = overlay;
    }

    const overlay = highlightOverlayRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      // Get element under cursor (ignoring the overlay and widget)
      overlay.style.display = 'none';
      const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      overlay.style.display = hoveredElementRef.current ? 'block' : 'none';

      if (!elementUnderCursor) {
        hoveredElementRef.current = null;
        overlay.style.display = 'none';
        return;
      }

      // Skip if inside feedback widget
      if (elementUnderCursor.closest('[data-feedback-widget]')) {
        hoveredElementRef.current = null;
        overlay.style.display = 'none';
        return;
      }

      // Skip if it's part of the selection mode overlay (inside shadow DOM)
      if (elementUnderCursor.closest('#feedback-highlight-overlay')) {
        return;
      }

      // Skip selection badges
      if (elementUnderCursor.classList.contains('feedback-selection-badge')) {
        return;
      }

      // Find interactive element - either the element itself or its closest interactive parent
      let interactiveEl: HTMLElement | null = null;
      if (isInteractiveElement(elementUnderCursor)) {
        interactiveEl = elementUnderCursor;
      } else {
        interactiveEl = findInteractiveParent(elementUnderCursor);
      }

      if (interactiveEl) {
        hoveredElementRef.current = interactiveEl;
        const rect = interactiveEl.getBoundingClientRect();
        overlay.style.left = `${rect.left - 2}px`;
        overlay.style.top = `${rect.top - 2}px`;
        overlay.style.width = `${rect.width + 4}px`;
        overlay.style.height = `${rect.height + 4}px`;
        overlay.style.display = 'block';
      } else {
        hoveredElementRef.current = null;
        overlay.style.display = 'none';
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Hide overlay to get element under cursor
      overlay.style.display = 'none';
      const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      overlay.style.display = hoveredElementRef.current ? 'block' : 'none';

      if (!elementUnderCursor) return;

      // Skip if inside feedback widget
      if (elementUnderCursor.closest('[data-feedback-widget]')) {
        return;
      }

      // Skip selection badges
      if (elementUnderCursor.classList.contains('feedback-selection-badge')) {
        return;
      }

      // Find the interactive element
      let interactiveEl: HTMLElement | null = null;
      if (isInteractiveElement(elementUnderCursor)) {
        interactiveEl = elementUnderCursor;
      } else {
        interactiveEl = findInteractiveParent(elementUnderCursor);
      }

      if (!interactiveEl) return;

      // Prevent default action (e.g., navigating a link)
      e.preventDefault();
      e.stopPropagation();

      const selector = interactiveEl.id
        ? `#${CSS.escape(interactiveEl.id)}`
        : createSelectedElementData(interactiveEl, 0).selector;

      // Check if already selected (using selector as key)
      const existingIndex = selectedElements.findIndex(el => el.selector === selector);

      if (existingIndex !== -1) {
        // Deselect - remove from array
        setSelectedElements(prev => {
          const newElements = prev.filter(el => el.selector !== selector);
          // Re-number remaining elements
          return newElements.map((el, idx) => ({ ...el, id: idx + 1 }));
        });
        // Remove badge
        const badge = selectionBadgesRef.current.get(selector);
        if (badge) {
          badge.remove();
          selectionBadgesRef.current.delete(selector);
        }
        // Update remaining badge numbers
        setTimeout(() => {
          let badgeNum = 1;
          selectionBadgesRef.current.forEach((b) => {
            b.textContent = String(badgeNum);
            b.setAttribute('data-selection-badge', String(badgeNum));
            badgeNum++;
          });
        }, 0);
      } else {
        // Select - add to array if under limit
        if (selectedElements.length >= MAX_SELECTED_ELEMENTS) {
          showWarning(`Maximum ${MAX_SELECTED_ELEMENTS} elements can be selected`);
          return;
        }
        const newId = selectedElements.length + 1;
        const elementData = createSelectedElementData(interactiveEl, newId);
        setSelectedElements(prev => [...prev, elementData]);
        // Create badge
        const badge = createSelectionBadge(interactiveEl, newId);
        selectionBadgesRef.current.set(selector, badge);
      }
    };

    // Update badge positions on scroll
    const handleScroll = () => {
      updateBadgePositions();
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick, true); // Use capture phase
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', updateBadgePositions);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick, true);
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', updateBadgePositions);
    };
  }, [isSelectionMode, selectedElements, createSelectionBadge, updateBadgePositions, showWarning]);

  // Close form handler
  const handleClose = useCallback(() => {
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
      autoCloseTimerRef.current = null;
    }
    setIsExpanded(false);
    setSubmissionState('idle');
    setErrorMessage('');
  }, []);

  // Collect metadata
  const collectMetadata = useCallback((): FeedbackMetadata => {
    const userId = detectUserId(effectiveJwtConfig);
    return {
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      timestamp: new Date().toISOString(),
      ...(userId && { userId }),
    };
  }, [effectiveJwtConfig]);

  // Form submit handler
  const handleSubmit = useCallback(async (e?: Event) => {
    if (e) {
      e.preventDefault();
    }

    // Validate message is not empty
    if (!feedbackMessage.trim()) {
      setSubmissionState('error');
      setErrorMessage('Please enter a message');
      setIsNetworkError(false);
      return;
    }

    setSubmissionState('loading');
    setErrorMessage('');
    setIsNetworkError(false);

    const metadata = collectMetadata();
    const result: SubmitFeedbackResult = await submitFeedback({
      app_id: effectiveAppId,
      type: feedbackType,
      message: feedbackMessage.trim(),
      elements: selectedElements.length > 0 ? selectedElements : undefined,
      metadata,
    });

    if (result.success) {
      setSubmissionState('success');
      // Reset form fields
      setFeedbackMessage('');
      setFeedbackType('general');
      setSelectedElements([]);
      setIsElementListExpanded(false);
      // Auto-collapse after 2 seconds
      autoCloseTimerRef.current = setTimeout(() => {
        setIsExpanded(false);
        setSubmissionState('idle');
      }, 2000);
    } else {
      setSubmissionState('error');
      setErrorMessage(result.error || 'Something went wrong. Please try again.');
      setIsNetworkError(result.isNetworkError || false);
    }
  }, [feedbackType, feedbackMessage, effectiveAppId, collectMetadata, selectedElements]);

  // Retry handler for error state - actually retries submission
  const handleRetry = useCallback(() => {
    // Re-submit the feedback
    handleSubmit();
  }, [handleSubmit]);

  // Remove an element from selection by index
  const handleRemoveElement = useCallback((index: number) => {
    setSelectedElements(prev => {
      const newElements = prev.filter((_, i) => i !== index);
      // Re-number remaining elements
      return newElements.map((el, idx) => ({ ...el, id: idx + 1 }));
    });
  }, []);

  // Clear all selected elements
  const handleClearAllElements = useCallback(() => {
    setSelectedElements([]);
    setIsElementListExpanded(false);
  }, []);

  // Toggle element list expansion
  const handleToggleElementList = useCallback(() => {
    setIsElementListExpanded(prev => !prev);
  }, []);

  // Enter selection mode handler
  const handleEnterSelectionMode = useCallback(() => {
    setIsSelectionMode(true);
    setIsExpanded(false); // Collapse form when entering selection mode
  }, []);

  // Exit selection mode handler
  const handleExitSelectionMode = useCallback(() => {
    setIsSelectionMode(false);
    setIsExpanded(true); // Re-expand form when exiting selection mode
    // Clean up selection badges (they'll be recreated if user re-enters selection mode)
    selectionBadgesRef.current.forEach(badge => badge.remove());
    selectionBadgesRef.current.clear();
    // Clear warning
    setSelectionWarning(null);
  }, []);

  // Render Shadow DOM content
  useEffect(() => {
    if (!hostRef.current || !isClient) return;

    // Create Shadow DOM if it doesn't exist
    if (!shadowRootRef.current) {
      shadowRootRef.current = hostRef.current.attachShadow({ mode: 'open' });
    }

    const shadowRoot = shadowRootRef.current;

    // Build CSS classes for the morph container
    const expandedClass = isExpanded ? 'expanded' : '';
    const draggingClass = isDragging ? 'dragging' : '';

    // Calculate position - use expanded position when expanded (expands toward center)
    const currentPosition = isExpanded
      ? getExpandedPositionForCorner(widgetState.corner)
      : widgetPosition;
    const positionStyle = `left: ${currentPosition.x}px; top: ${currentPosition.y}px;`;

    // Selection mode overlay (separate from widget)
    const selectionModeOverlay = isSelectionMode ? getSelectionModeOverlayHTML(selectedElements.length, selectionWarning) : '';

    // Form content (always rendered, visibility controlled by CSS)
    const formContent = getFeedbackFormHTML(feedbackType, feedbackMessage, submissionState, errorMessage, selectedElements, isElementListExpanded, isNetworkError);

    // Check if morph container already exists - if so, just update style/class
    let morphContainer = morphContainerRef.current;
    if (morphContainer && shadowRoot.contains(morphContainer)) {
      // Update existing element (preserves CSS transitions!)
      morphContainer.className = `feedback-widget-morph ${expandedClass} ${draggingClass}`.trim();
      morphContainer.style.cssText = positionStyle;
      morphContainer.setAttribute('aria-expanded', String(isExpanded));

      // Update form content
      const formLayer = morphContainer.querySelector('.form-layer');
      if (formLayer) {
        formLayer.innerHTML = formContent;
      }

      // Update selection mode overlay
      const existingOverlay = shadowRoot.querySelector('.selection-mode-overlay');
      if (isSelectionMode && !existingOverlay) {
        // Add overlay
        morphContainer.insertAdjacentHTML('beforebegin', selectionModeOverlay);
      } else if (!isSelectionMode && existingOverlay) {
        // Remove overlay
        existingOverlay.remove();
      } else if (isSelectionMode && existingOverlay) {
        // Update overlay content - can't use outerHTML in shadow DOM, so remove and re-add
        existingOverlay.remove();
        morphContainer.insertAdjacentHTML('beforebegin', selectionModeOverlay);
      }
    } else {
      // Initial render - create the full structure
      shadowRoot.innerHTML = `
        <style>${getWidgetStyles()}</style>
        ${selectionModeOverlay}
        <div
          class="feedback-widget-morph ${expandedClass} ${draggingClass}"
          style="${positionStyle}"
          role="dialog"
          aria-label="Feedback widget"
          aria-expanded="${isExpanded}"
        >
          <!-- Button layer (visible when collapsed) -->
          <div class="button-layer">
            ${MessageSquareIcon}
          </div>

          <!-- Form layer (visible when expanded) -->
          <div class="form-layer">
            ${formContent}
          </div>
        </div>
      `;
      morphContainer = shadowRoot.querySelector('.feedback-widget-morph') as HTMLDivElement;
      morphContainerRef.current = morphContainer;
    }

    // Add event listeners to the morph container (only once)
    if (morphContainerRef.current && !containerListenersAddedRef.current) {
      const container = morphContainerRef.current;
      containerListenersAddedRef.current = true;

      // Handle mousedown for drag start (only on button layer, when collapsed)
      // Uses refs to read current state values and get latest handler
      container.addEventListener('mousedown', (e: Event) => {
        if (!isSelectionModeRef.current && !isExpandedRef.current) {
          handleMouseDownRef.current(e as MouseEvent);
        }
      });

      // Handle click on button layer (only if not dragged)
      // Uses refs to read current state values
      container.addEventListener('click', () => {
        // Only respond to clicks when collapsed
        if (isExpandedRef.current) return;

        // Reset hasDragged for next interaction
        const wasDragged = hasDraggedRef.current;
        hasDraggedRef.current = false;

        if (!wasDragged) {
          if (isSelectionModeRef.current) {
            handleExitSelectionMode();
          } else {
            setIsExpanded(true);
          }
        }
      });
    }

    // Selection mode event listeners (re-added when overlay is created/updated)
    if (isSelectionMode) {
      const doneButton = shadowRoot.querySelector('.selection-mode-done-button');
      if (doneButton) {
        doneButton.addEventListener('click', handleExitSelectionMode);
      }
    }

    // Form event listeners (always present in DOM now)
    const closeButton = shadowRoot.querySelector('.feedback-close-button');
    const form = shadowRoot.querySelector('.feedback-form-body');
    const typeSelect = shadowRoot.querySelector('#feedback-type') as HTMLSelectElement;
    const messageTextarea = shadowRoot.querySelector('#feedback-message') as HTMLTextAreaElement;
    const retryButton = shadowRoot.querySelector('.feedback-retry-button');
    const selectOnScreenButton = shadowRoot.querySelector('.feedback-select-button');

    if (closeButton) {
      closeButton.addEventListener('click', handleClose);
    }

    if (form) {
      form.addEventListener('submit', handleSubmit);
    }

    if (typeSelect) {
      typeSelect.addEventListener('change', (e) => {
        setFeedbackType((e.target as HTMLSelectElement).value as FeedbackType);
      });
    }

    if (messageTextarea) {
      messageTextarea.addEventListener('input', (e) => {
        setFeedbackMessage((e.target as HTMLTextAreaElement).value);
      });
    }

    if (retryButton) {
      retryButton.addEventListener('click', handleRetry);
    }

    if (selectOnScreenButton) {
      selectOnScreenButton.addEventListener('click', handleEnterSelectionMode);
    }

    // Element list event listeners
    const elementListBadge = shadowRoot.querySelector('.element-list-badge');
    const clearAllButton = shadowRoot.querySelector('.element-list-clear-all');
    const removeButtons = shadowRoot.querySelectorAll('.element-item-remove');

    if (elementListBadge) {
      elementListBadge.addEventListener('click', handleToggleElementList);
    }

    if (clearAllButton) {
      clearAllButton.addEventListener('click', handleClearAllElements);
    }

    removeButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const index = parseInt((e.currentTarget as HTMLElement).getAttribute('data-remove-index') || '0', 10);
        handleRemoveElement(index);
      });
    });

    // Cleanup is minimal - container listeners use refs so they stay valid
    // Form element listeners are on elements that get replaced via innerHTML
    return () => {
      // Nothing to clean up - container listeners are permanent and use refs
      // Form listeners are on elements that get replaced each render
    };
  }, [
    effectivePosition,
    isExpanded,
    widgetPosition,
    isDragging,
    isClient,
    handleMouseDown,
    handleClose,
    handleSubmit,
    handleRetry,
    handleEnterSelectionMode,
    handleExitSelectionMode,
    handleToggleElementList,
    handleClearAllElements,
    handleRemoveElement,
    feedbackType,
    feedbackMessage,
    submissionState,
    errorMessage,
    isNetworkError,
    isSelectionMode,
    selectedElements,
    isElementListExpanded,
    selectionWarning,
  ]);

  return <div ref={hostRef} data-feedback-widget />;
}

// Re-export types for convenience
export type { FeedbackWidgetConfig, WidgetPosition } from './utils/config';
export type { JwtConfig } from './utils/jwt';

export default FeedbackWidget;

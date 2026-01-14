'use client';

import { useEffect, useRef, useState, useCallback, useSyncExternalStore } from 'react';
import { getWidgetStyles } from './styles';
import { constrainToViewport } from './utils/storage';
import { getFeedbackFormHTML, FeedbackType, SubmissionState } from './FeedbackForm';
import { getSelectionModeOverlayHTML } from './SelectionMode';
import { isInteractiveElement, findInteractiveParent, createSelectedElementData, SelectedElementData } from './utils/elements';
import {
  initializePosition,
  setPosition,
  updateAndSavePosition,
  constrainPositionToViewport,
  subscribe,
  getSnapshot,
  getServerSnapshot,
  WIDGET_SIZE,
} from './utils/positionStore';
import { submitFeedback, FeedbackMetadata } from '../../lib/supabase';
import { detectUserId, JwtConfig } from './utils/jwt';

// MessageSquare icon SVG path (from Lucide)
const MessageSquareIcon = `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
`;

export interface FeedbackWidgetProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
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

export function FeedbackWidget({
  position = 'bottom-right',
  appId = 'default',
  jwtConfig,
}: FeedbackWidgetProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const shadowRootRef = useRef<ShadowRoot | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('general');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedElements, setSelectedElements] = useState<SelectedElementData[]>([]);
  const [selectionWarning, setSelectionWarning] = useState<string | null>(null);
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
  const widgetPosition = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Initialize position on mount
  useEffect(() => {
    initializePosition(position);
  }, [position]);

  // Handle window resize to keep widget within bounds
  useEffect(() => {
    const handleResize = () => {
      constrainPositionToViewport();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Drag handlers
  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      // Only start drag on left click
      if (e.button !== 0) return;

      setIsDragging(true);
      hasDraggedRef.current = false;
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      dragStartPositionRef.current = { ...widgetPosition };

      e.preventDefault();
    },
    [widgetPosition]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (
        !isDragging ||
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
      }

      const newPosition = constrainToViewport(
        {
          x: dragStartPositionRef.current.x + deltaX,
          y: dragStartPositionRef.current.y + deltaY,
        },
        WIDGET_SIZE,
        WIDGET_SIZE
      );

      setPosition(newPosition);
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      // Save position to localStorage
      updateAndSavePosition(widgetPosition);
    }

    setIsDragging(false);
    dragStartRef.current = null;
    dragStartPositionRef.current = null;
  }, [isDragging, widgetPosition]);

  // Global mouse event listeners for drag
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

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
      background-color: #6366f1;
      color: white;
      font-size: 12px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
    if (!highlightOverlayRef.current) {
      const overlay = document.createElement('div');
      overlay.id = 'feedback-highlight-overlay';
      overlay.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 999997;
        border: 2px solid #6366f1;
        background-color: rgba(99, 102, 241, 0.1);
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
    const userId = detectUserId(jwtConfig);
    return {
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      timestamp: new Date().toISOString(),
      ...(userId && { userId }),
    };
  }, [jwtConfig]);

  // Form submit handler
  const handleSubmit = useCallback(async (e: Event) => {
    e.preventDefault();

    // Validate message is not empty
    if (!feedbackMessage.trim()) {
      setSubmissionState('error');
      setErrorMessage('Please enter a message');
      return;
    }

    setSubmissionState('loading');
    setErrorMessage('');

    const metadata = collectMetadata();
    const result = await submitFeedback({
      app_id: appId,
      type: feedbackType,
      message: feedbackMessage.trim(),
      metadata,
    });

    if (result.success) {
      setSubmissionState('success');
      // Reset form fields
      setFeedbackMessage('');
      setFeedbackType('general');
      // Auto-collapse after 2 seconds
      autoCloseTimerRef.current = setTimeout(() => {
        setIsExpanded(false);
        setSubmissionState('idle');
      }, 2000);
    } else {
      setSubmissionState('error');
      setErrorMessage(result.error || 'Failed to submit feedback');
    }
  }, [feedbackType, feedbackMessage, appId, collectMetadata]);

  // Retry handler for error state
  const handleRetry = useCallback(() => {
    setSubmissionState('idle');
    setErrorMessage('');
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

    // Use absolute positioning with draggable state
    const draggingClass = isDragging ? 'dragging' : '';
    const expandedClass = isExpanded ? 'expanded' : '';
    const selectionModeClass = isSelectionMode ? 'selection-mode' : '';

    const formHTML = isExpanded ? `
      <div class="feedback-form-panel">
        ${getFeedbackFormHTML(feedbackType, feedbackMessage, submissionState, errorMessage, selectedElements.length)}
      </div>
    ` : '';

    const selectionModeOverlay = isSelectionMode ? getSelectionModeOverlayHTML(selectedElements.length, selectionWarning) : '';

    shadowRoot.innerHTML = `
      <style>${getWidgetStyles()}</style>
      ${selectionModeOverlay}
      <div class="feedback-widget-container draggable ${expandedClass} ${selectionModeClass}" style="left: ${widgetPosition.x}px; top: ${widgetPosition.y}px;">
        <div class="feedback-button-wrapper">
          <button
            class="feedback-button ${draggingClass}"
            aria-label="${isSelectionMode ? 'Exit selection mode' : 'Open feedback form'}"
            aria-expanded="${isExpanded}"
          >
            ${MessageSquareIcon}
          </button>
          <div class="feedback-tooltip" role="tooltip">${isSelectionMode ? 'Exit Selection' : 'Feedback'}</div>
        </div>
        ${formHTML}
      </div>
    `;

    // Add event listeners
    const button = shadowRoot.querySelector('.feedback-button');
    if (button) {
      // Handle mousedown for drag start (only when not in selection mode)
      const onMouseDown = (e: Event) => {
        if (!isSelectionMode) {
          handleMouseDown(e as MouseEvent);
        }
      };
      button.addEventListener('mousedown', onMouseDown);

      // Handle click (only if not dragged)
      const onClick = () => {
        if (!hasDraggedRef.current) {
          if (isSelectionMode) {
            // Exit selection mode when clicking button
            handleExitSelectionMode();
          } else {
            setIsExpanded((prev) => !prev);
          }
        }
      };
      button.addEventListener('click', onClick);
    }

    // Selection mode event listeners
    if (isSelectionMode) {
      const doneButton = shadowRoot.querySelector('.selection-mode-done-button');
      if (doneButton) {
        doneButton.addEventListener('click', handleExitSelectionMode);
      }
    }

    // Form event listeners (when expanded)
    if (isExpanded) {
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
    }

    // Cleanup function
    return () => {
      const button = shadowRoot.querySelector('.feedback-button');
      if (button) {
        button.removeEventListener('mousedown', handleMouseDown as EventListener);
        button.removeEventListener('click', () => {});
      }
      if (isSelectionMode) {
        const doneButton = shadowRoot.querySelector('.selection-mode-done-button');
        if (doneButton) doneButton.removeEventListener('click', handleExitSelectionMode);
      }
      if (isExpanded) {
        const closeButton = shadowRoot.querySelector('.feedback-close-button');
        const form = shadowRoot.querySelector('.feedback-form-body');
        const retryButton = shadowRoot.querySelector('.feedback-retry-button');
        const selectOnScreenButton = shadowRoot.querySelector('.feedback-select-button');
        if (closeButton) closeButton.removeEventListener('click', handleClose);
        if (form) form.removeEventListener('submit', handleSubmit);
        if (retryButton) retryButton.removeEventListener('click', handleRetry);
        if (selectOnScreenButton) selectOnScreenButton.removeEventListener('click', handleEnterSelectionMode);
      }
    };
  }, [
    position,
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
    feedbackType,
    feedbackMessage,
    submissionState,
    errorMessage,
    isSelectionMode,
    selectedElements.length,
    selectionWarning,
  ]);

  return <div ref={hostRef} data-feedback-widget />;
}

export default FeedbackWidget;

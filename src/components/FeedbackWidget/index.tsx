'use client';

import { useEffect, useLayoutEffect, useRef, useState, useCallback, useSyncExternalStore } from 'react';
import { getWidgetStyles } from './styles';
import { getFeedbackFormHTML, FeedbackType, SubmissionState } from './FeedbackForm';
import { getSelectionModeOverlayHTML, canvasUtils, DrawnRectangle } from './SelectionMode';
import { CapturedScreenshot, captureScreenshot, releaseScreenshot } from './utils/screenshot';
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
import { submitFeedback, FeedbackMetadata, SubmitFeedbackResult, uploadScreenshot } from '../../lib/supabase';
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
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('bug');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isNetworkError, setIsNetworkError] = useState(false);
  const [isValidationError, setIsValidationError] = useState(false);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  // Update refs for event handlers to read current state
  isExpandedRef.current = isExpanded;
  isSelectionModeRef.current = isSelectionMode;
  // Ref to hold current handleMouseDown (so container listener doesn't capture stale version)
  const handleMouseDownRef = useRef<(e: MouseEvent) => void>(() => {});
  // Screenshot capture state (replaces selectedElements)
  const [capturedScreenshots, setCapturedScreenshots] = useState<CapturedScreenshot[]>([]);
  const [drawnRectangles, setDrawnRectangles] = useState<DrawnRectangle[]>([]);
  const [selectionWarning, setSelectionWarning] = useState<string | null>(null);
  const [isScreenshotListExpanded, setIsScreenshotListExpanded] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const dragStartPositionRef = useRef<{ x: number; y: number } | null>(null);
  const hasDraggedRef = useRef(false);
  const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null);
  // Canvas drawing refs for lasso selection
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const isDrawingRef = useRef(false);
  const drawStartRef = useRef<{ x: number; y: number } | null>(null);
  const warningTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const MAX_SCREENSHOTS = 5;

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

  // Clear auto-close timer, warning timeout, and release screenshots on unmount
  useEffect(() => {
    return () => {
      if (autoCloseTimerRef.current) {
        clearTimeout(autoCloseTimerRef.current);
      }
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
      }
      // Release all captured screenshot blob URLs
      capturedScreenshots.forEach(screenshot => releaseScreenshot(screenshot));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Canvas-based lasso rectangle drawing in selection mode
  // This effect sets up canvas event handlers for drawing rectangles
  useEffect(() => {
    if (!isSelectionMode || !shadowRootRef.current) {
      // Clean up canvas ref when exiting selection mode
      canvasRef.current = null;
      canvasCtxRef.current = null;
      isDrawingRef.current = false;
      drawStartRef.current = null;
      return;
    }

    // Store cleanup functions
    let cleanupFns: (() => void)[] = [];

    // Use requestAnimationFrame to ensure DOM has been updated after render
    const frameId = requestAnimationFrame(() => {
      if (!shadowRootRef.current) return;

      // Get canvas element from shadow DOM
      const canvas = shadowRootRef.current.querySelector('.selection-mode-canvas') as HTMLCanvasElement | null;
      console.log('[FeedbackWidget] RAF - Canvas found:', !!canvas);
      if (!canvas) return;

      canvasRef.current = canvas;
      const ctx = canvasUtils.initCanvas(canvas);
      console.log('[FeedbackWidget] Canvas context:', !!ctx, 'size:', canvas.width, 'x', canvas.height);
      if (!ctx) return;
      canvasCtxRef.current = ctx;

      // Redraw existing rectangles
      canvasUtils.redrawRectangles(ctx, canvas, drawnRectangles);

      const handleCanvasMouseDown = (e: MouseEvent) => {
        console.log('[FeedbackWidget] Canvas mousedown!', e.clientX, e.clientY);
        isDrawingRef.current = true;
        drawStartRef.current = { x: e.clientX, y: e.clientY };
      };

      const handleCanvasMouseMove = (e: MouseEvent) => {
        if (!isDrawingRef.current || !drawStartRef.current || !canvasCtxRef.current || !canvasRef.current) {
          return;
        }

        const ctx = canvasCtxRef.current;
        const cvs = canvasRef.current;

        // Redraw all completed rectangles
        canvasUtils.redrawRectangles(ctx, cvs, drawnRectangles);

        // Draw current active rectangle
        const { x, y, width, height } = canvasUtils.normalizeRect(
          drawStartRef.current.x,
          drawStartRef.current.y,
          e.clientX,
          e.clientY
        );
        canvasUtils.drawRectangle(ctx, x, y, width, height, true);
      };

      const handleCanvasMouseUp = async (e: MouseEvent) => {
        if (!isDrawingRef.current || !drawStartRef.current) {
          return;
        }

        isDrawingRef.current = false;

        const { x, y, width, height } = canvasUtils.normalizeRect(
          drawStartRef.current.x,
          drawStartRef.current.y,
          e.clientX,
          e.clientY
        );

        drawStartRef.current = null;

        // Check max limit
        if (drawnRectangles.length >= MAX_SCREENSHOTS) {
          showWarning(`Maximum ${MAX_SCREENSHOTS} screenshots allowed`);
          if (canvasCtxRef.current && canvasRef.current) {
            canvasUtils.redrawRectangles(canvasCtxRef.current, canvasRef.current, drawnRectangles);
          }
          return;
        }

        // Create new rectangle
        const newNumber = drawnRectangles.length + 1;
        const newRect: DrawnRectangle = {
          id: `rect-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
          x,
          y,
          width,
          height,
          number: newNumber,
        };

        // Add to state first (optimistic update)
        setDrawnRectangles(prev => [...prev, newRect]);

        // Capture screenshot of the region
        try {
          if (canvasRef.current) {
            canvasRef.current.style.visibility = 'hidden';
          }

          const screenshot = await captureScreenshot(x, y, width, height);

          if (canvasRef.current) {
            canvasRef.current.style.visibility = 'visible';
          }

          setCapturedScreenshots(prev => [...prev, screenshot]);
        } catch (error) {
          if (canvasRef.current) {
            canvasRef.current.style.visibility = 'visible';
          }

          console.error('Failed to capture screenshot:', error);
          showWarning('Failed to capture screenshot');
          setDrawnRectangles(prev => prev.filter(r => r.id !== newRect.id));
        }
      };

      const handleResize = () => {
        if (canvasRef.current && canvasCtxRef.current) {
          canvasUtils.initCanvas(canvasRef.current);
          canvasCtxRef.current = canvasRef.current.getContext('2d');
          if (canvasCtxRef.current) {
            canvasUtils.redrawRectangles(canvasCtxRef.current, canvasRef.current, drawnRectangles);
          }
        }
      };

      // Add event listeners
      canvas.addEventListener('mousedown', handleCanvasMouseDown);
      document.addEventListener('mousemove', handleCanvasMouseMove);
      document.addEventListener('mouseup', handleCanvasMouseUp);
      window.addEventListener('resize', handleResize);

      // Store cleanup
      cleanupFns.push(() => {
        canvas.removeEventListener('mousedown', handleCanvasMouseDown);
        document.removeEventListener('mousemove', handleCanvasMouseMove);
        document.removeEventListener('mouseup', handleCanvasMouseUp);
        window.removeEventListener('resize', handleResize);
      });
    });

    return () => {
      cancelAnimationFrame(frameId);
      cleanupFns.forEach(fn => fn());
    };
  }, [isSelectionMode, drawnRectangles, showWarning]);

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
      setIsValidationError(true);
      return;
    }

    setSubmissionState('loading');
    setErrorMessage('');
    setIsNetworkError(false);
    setIsValidationError(false);

    const metadata = collectMetadata();

    // Upload screenshots to Supabase Storage
    const uploadedScreenshots: Array<{
      url: string;
      storagePath: string;
      region: { x: number; y: number; width: number; height: number };
      capturedAt: number;
      sizeBytes: number;
    }> = [];

    for (let i = 0; i < capturedScreenshots.length; i++) {
      const screenshot = capturedScreenshots[i];
      try {
        // Fetch the blob from the blob URL
        const response = await fetch(screenshot.blobUrl);
        const blob = await response.blob();

        // Upload to Supabase Storage
        const uploadResult = await uploadScreenshot(blob, effectiveAppId, i + 1);

        if (uploadResult) {
          uploadedScreenshots.push({
            url: uploadResult.url,
            storagePath: uploadResult.storagePath,
            region: screenshot.region,
            capturedAt: screenshot.capturedAt,
            sizeBytes: screenshot.sizeBytes,
          });
        } else {
          console.warn(`[FeedbackWidget] Failed to upload screenshot ${i + 1}`);
        }
      } catch (err) {
        console.error(`[FeedbackWidget] Error uploading screenshot ${i + 1}:`, err);
      }
    }

    const result: SubmitFeedbackResult = await submitFeedback({
      app_id: effectiveAppId,
      type: feedbackType,
      message: feedbackMessage.trim(),
      // Include uploaded screenshot URLs (uses elements field for backwards compatibility)
      elements: uploadedScreenshots.length > 0 ? uploadedScreenshots : undefined,
      metadata,
    });

    if (result.success) {
      setSubmissionState('success');
      // Reset form fields
      setFeedbackMessage('');
      setFeedbackType('general');
      // Release screenshot blob URLs
      capturedScreenshots.forEach(screenshot => releaseScreenshot(screenshot));
      setCapturedScreenshots([]);
      setDrawnRectangles([]);
      setIsScreenshotListExpanded(false);
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
  }, [feedbackType, feedbackMessage, effectiveAppId, collectMetadata, capturedScreenshots]);

  // Retry handler for error state - actually retries submission
  const handleRetry = useCallback(() => {
    // Re-submit the feedback
    handleSubmit();
  }, [handleSubmit]);

  // Remove a screenshot from selection by index
  const handleRemoveScreenshot = useCallback((index: number) => {
    setCapturedScreenshots(prev => {
      const removed = prev[index];
      if (removed) {
        releaseScreenshot(removed);
      }
      return prev.filter((_, i) => i !== index);
    });
    setDrawnRectangles(prev => {
      const newRects = prev.filter((_, i) => i !== index);
      // Re-number remaining rectangles
      return newRects.map((rect, idx) => ({ ...rect, number: idx + 1 }));
    });
  }, []);

  // Clear all screenshots
  const handleClearAllScreenshots = useCallback(() => {
    capturedScreenshots.forEach(screenshot => releaseScreenshot(screenshot));
    setCapturedScreenshots([]);
    setDrawnRectangles([]);
    setIsScreenshotListExpanded(false);
  }, [capturedScreenshots]);

  // Toggle screenshot list expansion
  const handleToggleScreenshotList = useCallback(() => {
    setIsScreenshotListExpanded(prev => !prev);
  }, []);

  // Show screenshot preview (larger view)
  const handleShowScreenshotPreview = useCallback((screenshot: CapturedScreenshot) => {
    if (!shadowRootRef.current) return;

    const shadowRoot = shadowRootRef.current;

    // Remove any existing preview overlay
    const existingOverlay = shadowRoot.querySelector('[data-preview-overlay]');
    if (existingOverlay) {
      existingOverlay.remove();
    }

    // Create preview overlay element
    const overlay = document.createElement('div');
    overlay.className = 'screenshot-preview-overlay';
    overlay.setAttribute('data-preview-overlay', '');
    overlay.innerHTML = `
      <div class="screenshot-preview-container">
        <img src="${screenshot.blobUrl}" alt="Screenshot preview" class="screenshot-preview-image" />
        <button type="button" class="screenshot-preview-close" aria-label="Close preview">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </div>
    `;

    // Add click handler to close preview
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || (e.target as HTMLElement).closest('.screenshot-preview-close')) {
        overlay.remove();
      }
    });

    // Append to shadow root
    shadowRoot.appendChild(overlay);
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
    // Clear warning
    setSelectionWarning(null);
    // Clear drawn rectangles (screenshots are kept)
    setDrawnRectangles([]);
  }, []);

  // Handle file upload (from file picker or drag-drop)
  const handleFileUpload = useCallback((files: FileList | null | undefined) => {
    if (!files) return;

    let addedCount = 0;
    for (const file of Array.from(files)) {
      if (capturedScreenshots.length + addedCount >= MAX_SCREENSHOTS) {
        showWarning(`Maximum ${MAX_SCREENSHOTS} screenshots allowed`);
        break;
      }
      if (!file.type.startsWith('image/')) continue;

      const blobUrl = URL.createObjectURL(file);
      const screenshot: CapturedScreenshot = {
        id: `upload-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        blobUrl,
        region: { x: 0, y: 0, width: 0, height: 0 },
        capturedAt: Date.now(),
        sizeBytes: file.size,
      };
      setCapturedScreenshots(prev => [...prev, screenshot]);
      addedCount++;
    }
  }, [capturedScreenshots.length, showWarning]);

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
    const selectionModeOverlay = isSelectionMode ? getSelectionModeOverlayHTML(capturedScreenshots.length, selectionWarning) : '';

    // Form content (always rendered, visibility controlled by CSS)
    const formContent = getFeedbackFormHTML(feedbackType, feedbackMessage, submissionState, errorMessage, isNetworkError, capturedScreenshots, isScreenshotListExpanded, !isValidationError, isValidationError);

    // Check if morph container already exists - if so, just update style/class
    let morphContainer = morphContainerRef.current;
    if (morphContainer && shadowRoot.contains(morphContainer)) {
      // Update existing element (preserves CSS transitions!)
      morphContainer.className = `feedback-widget-morph ${expandedClass} ${draggingClass}`.trim();
      morphContainer.style.cssText = positionStyle;
      morphContainer.setAttribute('aria-expanded', String(isExpanded));

      // Update form content - but preserve textarea focus
      const formLayer = morphContainer.querySelector('.form-layer');
      if (formLayer) {
        const existingTextarea = formLayer.querySelector('#feedback-message') as HTMLTextAreaElement | null;
        const activeElement = shadowRoot.activeElement;
        const textareaHadFocus = activeElement === existingTextarea;
        const selectionStart = existingTextarea?.selectionStart;
        const selectionEnd = existingTextarea?.selectionEnd;
        const scrollTop = existingTextarea?.scrollTop;

        formLayer.innerHTML = formContent;

        // Restore focus, cursor position, and scroll if textarea was focused
        if (textareaHadFocus) {
          const newTextarea = formLayer.querySelector('#feedback-message') as HTMLTextAreaElement | null;
          if (newTextarea) {
            newTextarea.focus();
            if (selectionStart !== undefined && selectionEnd !== undefined) {
              newTextarea.setSelectionRange(selectionStart, selectionEnd);
            }
            if (scrollTop !== undefined) {
              newTextarea.scrollTop = scrollTop;
            }
            // Ensure cursor line is visible after restoring position
            // This triggers the browser's native scroll-to-cursor behavior
            const pos = newTextarea.selectionStart;
            newTextarea.setSelectionRange(pos, pos);
          }
        }
      }

      // Update selection mode overlay
      const existingOverlay = shadowRoot.querySelector('.selection-mode-overlay');
      console.log('[FeedbackWidget] isSelectionMode:', isSelectionMode, 'existingOverlay:', !!existingOverlay);
      if (isSelectionMode && !existingOverlay) {
        // Add overlay and canvas
        console.log('[FeedbackWidget] Inserting overlay HTML:', selectionModeOverlay.substring(0, 200));
        morphContainer.insertAdjacentHTML('beforebegin', selectionModeOverlay);
        console.log('[FeedbackWidget] After insert - canvas:', !!shadowRoot.querySelector('.selection-mode-canvas'));
      } else if (!isSelectionMode && existingOverlay) {
        // Remove overlay
        existingOverlay.remove();
      } else if (isSelectionMode && existingOverlay) {
        // Update just the counter text without destroying the canvas
        const counter = existingOverlay.querySelector('.selection-mode-counter');
        if (counter) {
          counter.textContent = `${capturedScreenshots.length}/5 captured`;
        }
        // Update warning if present
        const existingWarning = existingOverlay.querySelector('.selection-mode-warning');
        if (selectionWarning && !existingWarning) {
          const hint = existingOverlay.querySelector('.selection-mode-hint');
          if (hint) {
            hint.insertAdjacentHTML('beforebegin', `<div class="selection-mode-warning">${selectionWarning}</div>`);
          }
        } else if (!selectionWarning && existingWarning) {
          existingWarning.remove();
        } else if (selectionWarning && existingWarning) {
          existingWarning.textContent = selectionWarning;
        }
      }
    } else {
      // Initial render - create the full structure
      shadowRoot.innerHTML = `
        <style>${getWidgetStyles()}</style>
        ${selectionModeOverlay}
        <div class="feedback-tooltip" id="widget-tooltip">Provide Feedback</div>
        <div
          class="feedback-widget-morph ${expandedClass} ${draggingClass}"
          style="${positionStyle}"
          role="dialog"
          aria-label="Feedback widget"
          aria-expanded="${isExpanded}"
        >
          <!-- Button layer (visible when collapsed) -->
          <div class="button-layer" data-tooltip="Provide Feedback">
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

      // Tooltip element (used by multiple handlers)
      const tooltip = shadowRoot.querySelector('#widget-tooltip') as HTMLElement;

      // Handle click on button layer (only if not dragged)
      // Uses refs to read current state values
      container.addEventListener('click', () => {
        // Hide tooltip when clicked
        if (tooltip) {
          tooltip.classList.remove('visible');
        }

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

      // Tooltip hover handlers for collapsed widget
      if (tooltip) {
        const positionTooltip = (targetRect: DOMRect, text: string) => {
          tooltip.textContent = text;
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;
          const centerX = targetRect.left + targetRect.width / 2;
          const centerY = targetRect.top + targetRect.height / 2;

          // Position tooltip toward center of viewport
          // Horizontal: if element is on right half, show tooltip to the left
          if (centerX > viewportWidth / 2) {
            tooltip.style.left = `${targetRect.left - 8}px`;
            tooltip.style.transform = 'translateX(-100%)';
          } else {
            tooltip.style.left = `${targetRect.right + 8}px`;
            tooltip.style.transform = 'translateX(0)';
          }

          // Vertical: center tooltip vertically with the element
          tooltip.style.top = `${centerY}px`;
          tooltip.style.transform += ' translateY(-50%)';

          tooltip.classList.add('visible');
        };

        container.addEventListener('mouseenter', () => {
          if (!isExpandedRef.current && !isSelectionModeRef.current) {
            const rect = container.getBoundingClientRect();
            positionTooltip(rect, 'Provide Feedback');
          }
        });
        container.addEventListener('mouseleave', () => {
          tooltip.classList.remove('visible');
        });
      }
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
      // Prevent keyboard events from bubbling to the main app
      typeSelect.addEventListener('keydown', (e) => {
        e.stopPropagation();
      });
    }

    if (messageTextarea) {
      messageTextarea.addEventListener('input', (e) => {
        setFeedbackMessage((e.target as HTMLTextAreaElement).value);
        // Clear validation error when user starts typing
        if (isValidationError) {
          setIsValidationError(false);
          setSubmissionState('idle');
          setErrorMessage('');
        }
      });
      // Prevent keyboard events from bubbling to the main app
      messageTextarea.addEventListener('keydown', (e) => {
        e.stopPropagation();
      });
      messageTextarea.addEventListener('keyup', (e) => {
        e.stopPropagation();
      });
      messageTextarea.addEventListener('keypress', (e) => {
        e.stopPropagation();
      });
    }

    if (retryButton) {
      retryButton.addEventListener('click', handleRetry);
    }

    // Screenshot dropdown menu handlers
    const screenshotMenu = shadowRoot.querySelector('.feedback-screenshot-menu');
    const fileInput = shadowRoot.querySelector('#screenshot-file-input') as HTMLInputElement | null;
    const captureMenuItem = shadowRoot.querySelector('[data-action="capture"]');
    const uploadMenuItem = shadowRoot.querySelector('[data-action="upload"]');
    const dropzone = shadowRoot.querySelector('#screenshot-dropzone');

    // Tooltip for screenshot button
    const screenshotTooltip = shadowRoot.querySelector('#widget-tooltip') as HTMLElement;

    // Toggle dropdown menu
    if (selectOnScreenButton && screenshotMenu) {
      selectOnScreenButton.addEventListener('click', (e) => {
        e.stopPropagation();
        // Hide tooltip when clicked
        if (screenshotTooltip) {
          screenshotTooltip.classList.remove('visible');
        }
        screenshotMenu.classList.toggle('open');
      });
    }

    // Tooltip hover for screenshot button
    if (selectOnScreenButton && screenshotTooltip) {
      selectOnScreenButton.addEventListener('mouseenter', () => {
        const tooltipText = selectOnScreenButton.getAttribute('data-tooltip');
        if (tooltipText) {
          const rect = selectOnScreenButton.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const centerY = rect.top + rect.height / 2;

          screenshotTooltip.textContent = tooltipText;
          screenshotTooltip.style.left = `${rect.left + rect.width / 2}px`;
          screenshotTooltip.style.transform = 'translateX(-50%)';

          // Position above or below based on vertical position
          if (centerY > viewportHeight / 2) {
            screenshotTooltip.style.top = `${rect.top - 8}px`;
            screenshotTooltip.style.transform += ' translateY(-100%)';
          } else {
            screenshotTooltip.style.top = `${rect.bottom + 8}px`;
            screenshotTooltip.style.transform += ' translateY(0)';
          }

          screenshotTooltip.classList.add('visible');
        }
      });
      selectOnScreenButton.addEventListener('mouseleave', () => {
        screenshotTooltip.classList.remove('visible');
      });
    }

    // Capture region menu item
    if (captureMenuItem && screenshotMenu) {
      captureMenuItem.addEventListener('click', () => {
        screenshotMenu.classList.remove('open');
        handleEnterSelectionMode();
      });
    }

    // Upload image menu item
    if (uploadMenuItem && fileInput && screenshotMenu) {
      uploadMenuItem.addEventListener('click', () => {
        screenshotMenu.classList.remove('open');
        fileInput.click();
      });
    }

    // File input change handler
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const files = (e.target as HTMLInputElement).files;
        handleFileUpload(files);
        fileInput.value = ''; // Reset for re-uploads
      });
    }

    // Drag-drop handlers
    if (dropzone) {
      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('drag-over');
      });
      dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('drag-over');
      });
      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('drag-over');
        const files = (e as DragEvent).dataTransfer?.files;
        handleFileUpload(files);
      });
    }

    // Close dropdown when clicking outside
    const handleDocumentClick = (e: MouseEvent) => {
      const container = shadowRoot.querySelector('.feedback-screenshot-container');
      if (container && !container.contains(e.target as Node)) {
        screenshotMenu?.classList.remove('open');
      }
    };
    document.addEventListener('click', handleDocumentClick);

    // Screenshot list event listeners
    const screenshotListBadge = shadowRoot.querySelector('.screenshot-list-badge');
    const clearAllScreenshotsButton = shadowRoot.querySelector('.screenshot-list-clear-all');
    const removeScreenshotButtons = shadowRoot.querySelectorAll('.screenshot-thumbnail-remove');
    const screenshotThumbnails = shadowRoot.querySelectorAll('.screenshot-thumbnail-wrapper');

    if (screenshotListBadge) {
      screenshotListBadge.addEventListener('click', handleToggleScreenshotList);
    }

    if (clearAllScreenshotsButton) {
      clearAllScreenshotsButton.addEventListener('click', handleClearAllScreenshots);
    }

    removeScreenshotButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Don't trigger thumbnail click
        const index = parseInt((e.currentTarget as HTMLElement).getAttribute('data-remove-index') || '0', 10);
        handleRemoveScreenshot(index);
      });
    });

    // Click on thumbnail to show preview
    screenshotThumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener('click', (e) => {
        // Don't show preview if clicking remove button
        if ((e.target as HTMLElement).closest('.screenshot-thumbnail-remove')) return;

        const item = (e.currentTarget as HTMLElement).closest('.screenshot-thumbnail-item');
        const index = parseInt(item?.getAttribute('data-screenshot-index') || '0', 10);
        if (capturedScreenshots[index]) {
          handleShowScreenshotPreview(capturedScreenshots[index]);
        }
      });
    });

    // Cleanup - remove document listener
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [
    effectivePosition,
    isExpanded,
    widgetPosition,
    widgetState.corner,
    isDragging,
    isClient,
    handleMouseDown,
    handleClose,
    handleSubmit,
    handleRetry,
    handleEnterSelectionMode,
    handleExitSelectionMode,
    handleToggleScreenshotList,
    handleClearAllScreenshots,
    handleRemoveScreenshot,
    handleShowScreenshotPreview,
    handleFileUpload,
    feedbackType,
    feedbackMessage,
    submissionState,
    errorMessage,
    isNetworkError,
    isValidationError,
    isSelectionMode,
    capturedScreenshots,
    isScreenshotListExpanded,
    selectionWarning,
  ]);

  return <div ref={hostRef} data-feedback-widget />;
}

// Re-export types for convenience
export type { FeedbackWidgetConfig, WidgetPosition } from './utils/config';
export type { JwtConfig } from './utils/jwt';

export default FeedbackWidget;

'use client';

import { useEffect, useRef, useState, useCallback, useSyncExternalStore } from 'react';
import { getWidgetStyles } from './styles';
import { constrainToViewport } from './utils/storage';
import { getFeedbackFormHTML, FeedbackType, SubmissionState } from './FeedbackForm';
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
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const dragStartPositionRef = useRef<{ x: number; y: number } | null>(null);
  const hasDraggedRef = useRef(false);
  const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  // Clear auto-close timer on unmount
  useEffect(() => {
    return () => {
      if (autoCloseTimerRef.current) {
        clearTimeout(autoCloseTimerRef.current);
      }
    };
  }, []);

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

    const formHTML = isExpanded ? `
      <div class="feedback-form-panel">
        ${getFeedbackFormHTML(feedbackType, feedbackMessage, submissionState, errorMessage)}
      </div>
    ` : '';

    shadowRoot.innerHTML = `
      <style>${getWidgetStyles()}</style>
      <div class="feedback-widget-container draggable ${expandedClass}" style="left: ${widgetPosition.x}px; top: ${widgetPosition.y}px;">
        <div class="feedback-button-wrapper">
          <button
            class="feedback-button ${draggingClass}"
            aria-label="Open feedback form"
            aria-expanded="${isExpanded}"
          >
            ${MessageSquareIcon}
          </button>
          <div class="feedback-tooltip" role="tooltip">Feedback</div>
        </div>
        ${formHTML}
      </div>
    `;

    // Add event listeners
    const button = shadowRoot.querySelector('.feedback-button');
    if (button) {
      // Handle mousedown for drag start
      const onMouseDown = (e: Event) => handleMouseDown(e as MouseEvent);
      button.addEventListener('mousedown', onMouseDown);

      // Handle click (only if not dragged)
      const onClick = () => {
        if (!hasDraggedRef.current) {
          setIsExpanded((prev) => !prev);
        }
      };
      button.addEventListener('click', onClick);
    }

    // Form event listeners (when expanded)
    if (isExpanded) {
      const closeButton = shadowRoot.querySelector('.feedback-close-button');
      const form = shadowRoot.querySelector('.feedback-form-body');
      const typeSelect = shadowRoot.querySelector('#feedback-type') as HTMLSelectElement;
      const messageTextarea = shadowRoot.querySelector('#feedback-message') as HTMLTextAreaElement;
      const retryButton = shadowRoot.querySelector('.feedback-retry-button');

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
    }

    // Cleanup function
    return () => {
      const button = shadowRoot.querySelector('.feedback-button');
      if (button) {
        button.removeEventListener('mousedown', handleMouseDown as EventListener);
        button.removeEventListener('click', () => {});
      }
      if (isExpanded) {
        const closeButton = shadowRoot.querySelector('.feedback-close-button');
        const form = shadowRoot.querySelector('.feedback-form-body');
        const retryButton = shadowRoot.querySelector('.feedback-retry-button');
        if (closeButton) closeButton.removeEventListener('click', handleClose);
        if (form) form.removeEventListener('submit', handleSubmit);
        if (retryButton) retryButton.removeEventListener('click', handleRetry);
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
    feedbackType,
    feedbackMessage,
    submissionState,
    errorMessage,
  ]);

  return <div ref={hostRef} data-feedback-widget />;
}

export default FeedbackWidget;

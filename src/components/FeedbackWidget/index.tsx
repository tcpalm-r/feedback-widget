'use client';

import { useEffect, useRef, useState, useCallback, useSyncExternalStore } from 'react';
import { getWidgetStyles } from './styles';
import { constrainToViewport } from './utils/storage';
import { getFeedbackFormHTML, FeedbackType } from './FeedbackForm';
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

// MessageSquare icon SVG path (from Lucide)
const MessageSquareIcon = `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
`;

export interface FeedbackWidgetProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
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
}: FeedbackWidgetProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const shadowRootRef = useRef<ShadowRoot | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('general');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const dragStartPositionRef = useRef<{ x: number; y: number } | null>(null);
  const hasDraggedRef = useRef(false);

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

  // Close form handler
  const handleClose = useCallback(() => {
    setIsExpanded(false);
  }, []);

  // Form submit handler
  const handleSubmit = useCallback((e: Event) => {
    e.preventDefault();
    // For now, just log - will be connected to Supabase in STORY-007
    console.log('Feedback submitted:', { type: feedbackType, message: feedbackMessage });
    // Reset form and close
    setFeedbackMessage('');
    setFeedbackType('general');
    setIsExpanded(false);
  }, [feedbackType, feedbackMessage]);

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
        ${getFeedbackFormHTML(feedbackType, feedbackMessage)}
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
        if (closeButton) closeButton.removeEventListener('click', handleClose);
        if (form) form.removeEventListener('submit', handleSubmit);
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
    feedbackType,
    feedbackMessage,
  ]);

  return <div ref={hostRef} data-feedback-widget />;
}

export default FeedbackWidget;

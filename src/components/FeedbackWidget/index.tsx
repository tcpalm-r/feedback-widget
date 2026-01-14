'use client';

import { useEffect, useRef, useState, useCallback, useSyncExternalStore } from 'react';
import { getWidgetStyles } from './styles';
import { constrainToViewport } from './utils/storage';
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

    shadowRoot.innerHTML = `
      <style>${getWidgetStyles()}</style>
      <div class="feedback-widget-container draggable" style="left: ${widgetPosition.x}px; top: ${widgetPosition.y}px;">
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

      return () => {
        button.removeEventListener('mousedown', onMouseDown);
        button.removeEventListener('click', onClick);
      };
    }
  }, [
    position,
    isExpanded,
    widgetPosition,
    isDragging,
    isClient,
    handleMouseDown,
  ]);

  return <div ref={hostRef} data-feedback-widget />;
}

export default FeedbackWidget;

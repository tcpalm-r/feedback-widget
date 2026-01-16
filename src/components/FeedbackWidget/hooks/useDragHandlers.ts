import { useRef, useCallback, useEffect } from 'react';
import {
  startDrag,
  updateDragPosition,
  endDrag,
  WIDGET_SIZE,
  PADDING,
} from '../utils/positionStore';

interface UseDragHandlersProps {
  widgetPosition: { x: number; y: number };
  isExpanded: boolean;
}

export function useDragHandlers({ widgetPosition, isExpanded }: UseDragHandlersProps) {
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const dragStartPositionRef = useRef<{ x: number; y: number } | null>(null);
  const hasDraggedRef = useRef(false);
  const dragStartedRef = useRef(false);
  const handleMouseDownRef = useRef<(e: MouseEvent) => void>(() => {});

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      // Only start drag on left click, and only when collapsed
      if (e.button !== 0 || isExpanded) return;

      isDraggingRef.current = true;
      hasDraggedRef.current = false;
      dragStartedRef.current = false;
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      dragStartPositionRef.current = { ...widgetPosition };
    },
    [widgetPosition, isExpanded]
  );

  // Update ref so container listener always uses latest version
  handleMouseDownRef.current = handleMouseDown;

  const handleMouseMove = useCallback((e: MouseEvent) => {
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
    const newX = Math.max(
      PADDING,
      Math.min(dragStartPositionRef.current.x + deltaX, viewportWidth - WIDGET_SIZE - PADDING)
    );
    const newY = Math.max(
      PADDING,
      Math.min(dragStartPositionRef.current.y + deltaY, viewportHeight - WIDGET_SIZE - PADDING)
    );

    updateDragPosition(newX, newY);
  }, []);

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

  // Global mouse event listeners for drag
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return { handleMouseDownRef, hasDraggedRef };
}

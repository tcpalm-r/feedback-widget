import { useLayoutEffect, useSyncExternalStore } from 'react';
import {
  initializePosition,
  subscribe,
  getSnapshot,
  getServerSnapshot,
} from '../utils/positionStore';
import type { WidgetPosition } from '../utils/config';

export function useWidgetPosition(effectivePosition: WidgetPosition) {
  const widgetState = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { position: widgetPosition, isDragging, isInitialized, corner, isAnimatingToCorner } = widgetState;

  // Initialize position on mount - useLayoutEffect ensures this runs before paint
  // This prevents the widget from animating from default position to saved position
  useLayoutEffect(() => {
    initializePosition(effectivePosition);
  }, [effectivePosition]);

  return { widgetPosition, isDragging, isInitialized, corner, isAnimatingToCorner, widgetState };
}

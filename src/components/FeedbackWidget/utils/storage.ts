// LocalStorage utilities for FeedbackWidget position persistence

export interface WidgetPosition {
  x: number;
  y: number;
}

const STORAGE_KEY = 'feedback-widget-position';

/**
 * Save widget position to localStorage
 */
export function savePosition(position: WidgetPosition): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(position));
  } catch {
    // localStorage may not be available (SSR, private browsing, etc.)
    console.warn('FeedbackWidget: Unable to save position to localStorage');
  }
}

/**
 * Load widget position from localStorage
 * Returns null if no position is saved or localStorage is unavailable
 */
export function loadPosition(): WidgetPosition | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored) as WidgetPosition;

    // Validate the parsed data has required properties
    if (typeof parsed.x === 'number' && typeof parsed.y === 'number') {
      return parsed;
    }

    return null;
  } catch {
    // localStorage may not be available or data may be corrupted
    return null;
  }
}

/**
 * Clear saved widget position from localStorage
 */
export function clearPosition(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore errors when clearing
  }
}

/**
 * Constrain position within viewport bounds
 * Ensures the widget stays fully visible on screen
 */
export function constrainToViewport(
  position: WidgetPosition,
  widgetWidth: number,
  widgetHeight: number
): WidgetPosition {
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 0;

  // Minimum padding from edges
  const padding = 8;

  const constrainedX = Math.max(
    padding,
    Math.min(position.x, viewportWidth - widgetWidth - padding)
  );

  const constrainedY = Math.max(
    padding,
    Math.min(position.y, viewportHeight - widgetHeight - padding)
  );

  return {
    x: constrainedX,
    y: constrainedY,
  };
}

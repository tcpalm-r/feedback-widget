// LocalStorage utilities for FeedbackWidget position persistence

export type WidgetCorner = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

export interface WidgetPosition {
  x: number;
  y: number;
}

const STORAGE_KEY = 'feedback-widget-corner';

/**
 * Save widget corner to localStorage
 */
export function saveCorner(corner: WidgetCorner): void {
  try {
    localStorage.setItem(STORAGE_KEY, corner);
  } catch {
    // localStorage may not be available (SSR, private browsing, etc.)
    console.warn('FeedbackWidget: Unable to save position to localStorage');
  }
}

/**
 * Load widget corner from localStorage
 * Returns null if no corner is saved or localStorage is unavailable
 */
export function loadCorner(): WidgetCorner | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    // Validate it's a valid corner
    if (['bottom-right', 'bottom-left', 'top-right', 'top-left'].includes(stored)) {
      return stored as WidgetCorner;
    }

    return null;
  } catch {
    // localStorage may not be available or data may be corrupted
    return null;
  }
}

/**
 * Clear saved widget corner from localStorage
 */
export function clearCorner(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore errors when clearing
  }
}

/**
 * Determine nearest corner based on x/y position
 */
export function getNearestCorner(x: number, y: number): WidgetCorner {
  // Use clientWidth/clientHeight to exclude scrollbar from calculations
  const viewportWidth = typeof window !== 'undefined' ? document.documentElement.clientWidth : 800;
  const viewportHeight = typeof window !== 'undefined' ? document.documentElement.clientHeight : 600;

  const isLeft = x < viewportWidth / 2;
  const isTop = y < viewportHeight / 2;

  if (isTop && isLeft) return 'top-left';
  if (isTop && !isLeft) return 'top-right';
  if (!isTop && isLeft) return 'bottom-left';
  return 'bottom-right';
}

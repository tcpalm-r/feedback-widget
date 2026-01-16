// External store for widget position - allows useSyncExternalStore pattern
import {
  saveCorner,
  loadCorner,
  getNearestCorner,
  type WidgetCorner,
} from './storage';

export const WIDGET_SIZE = 56;
export const EXPANDED_WIDTH = 320;
export const EXPANDED_HEIGHT = 346;
export const PADDING = 24;

type Listener = () => void;

// Store the corner position - load from localStorage immediately if available
let corner: WidgetCorner = (typeof window !== 'undefined' ? loadCorner() : null) || 'bottom-right';
const listeners = new Set<Listener>();

// Track if we're currently dragging (for temporary x/y position)
let isDragging = false;
let isSnapping = false; // True when transitioning from drag to corner
let isAnimatingToCorner = false; // True during the snap animation (use left/top positioning)
let dragPosition = { x: 0, y: 0 };

// Cached snapshot to avoid infinite loops with useSyncExternalStore
let cachedSnapshot: { corner: WidgetCorner; position: { x: number; y: number }; isDragging: boolean; isAnimatingToCorner: boolean; isInitialized: boolean } | null = null;

function invalidateSnapshot() {
  cachedSnapshot = null;
}

function emitChange() {
  invalidateSnapshot();
  for (const listener of listeners) {
    listener();
  }
}

/**
 * Get x/y coordinates for a given corner (collapsed state)
 */
export function getPositionForCorner(c: WidgetCorner): { x: number; y: number } {
  if (typeof window === 'undefined') {
    return { x: 0, y: 0 };
  }

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  switch (c) {
    case 'top-left':
      return { x: PADDING, y: PADDING };
    case 'top-right':
      return { x: viewportWidth - WIDGET_SIZE - PADDING, y: PADDING };
    case 'bottom-left':
      return { x: PADDING, y: viewportHeight - WIDGET_SIZE - PADDING };
    case 'bottom-right':
    default:
      return {
        x: viewportWidth - WIDGET_SIZE - PADDING,
        y: viewportHeight - WIDGET_SIZE - PADDING,
      };
  }
}

/**
 * Get x/y coordinates for expanded state - expands toward center of viewport
 */
export function getExpandedPositionForCorner(c: WidgetCorner): { x: number; y: number } {
  if (typeof window === 'undefined') {
    return { x: 0, y: 0 };
  }

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  switch (c) {
    case 'top-left':
      // Anchor top-left, expand down-right
      return { x: PADDING, y: PADDING };
    case 'top-right':
      // Anchor top-right, expand down-left
      return { x: viewportWidth - EXPANDED_WIDTH - PADDING, y: PADDING };
    case 'bottom-left':
      // Anchor bottom-left, expand up-right
      return { x: PADDING, y: viewportHeight - EXPANDED_HEIGHT - PADDING };
    case 'bottom-right':
    default:
      // Anchor bottom-right, expand up-left
      return {
        x: viewportWidth - EXPANDED_WIDTH - PADDING,
        y: viewportHeight - EXPANDED_HEIGHT - PADDING,
      };
  }
}

let initialized = false;

/**
 * Check if the position store has been initialized
 */
export function isPositionInitialized(): boolean {
  return initialized;
}

export function initializePosition(
  positionProp: WidgetCorner = 'bottom-right'
): void {
  if (initialized) return;

  // Setup resize listener to keep widget responsive
  setupResizeListener();

  const savedCorner = loadCorner();
  corner = savedCorner || positionProp;

  // Mark as initialized and emit change
  initialized = true;
  emitChange();
}

export function resetPosition(
  positionProp: WidgetCorner = 'bottom-right'
): void {
  try {
    localStorage.removeItem('feedback-widget-corner');
  } catch {
    // Ignore
  }
  corner = positionProp;
  emitChange();
}

export function getCorner(): WidgetCorner {
  return corner;
}

export function setCorner(newCorner: WidgetCorner): void {
  corner = newCorner;
  saveCorner(newCorner);
  emitChange();
}

/**
 * Start dragging - switches to x/y based positioning temporarily
 */
export function startDrag(): void {
  isDragging = true;
  dragPosition = getPositionForCorner(corner);
  emitChange();
}

/**
 * Update position during drag
 */
export function updateDragPosition(x: number, y: number): void {
  if (!isDragging) return;
  dragPosition = { x, y };
  emitChange();
}

/**
 * End dragging - snaps to nearest corner with animation
 */
export function endDrag(): void {
  if (!isDragging) return;

  // Calculate center of widget
  const centerX = dragPosition.x + WIDGET_SIZE / 2;
  const centerY = dragPosition.y + WIDGET_SIZE / 2;

  // Determine the new corner
  const newCorner = getNearestCorner(centerX, centerY);

  // Step 1: Remove dragging state but enter snapping state
  // isSnapping keeps returning dragPosition so CSS transition is enabled at current position
  isDragging = false;
  isSnapping = true;
  emitChange();

  // Step 2: Use setTimeout to ensure browser has painted with transitions enabled
  // before changing position to trigger the CSS transition
  setTimeout(() => {
    corner = newCorner;
    saveCorner(newCorner);
    cachedCornerPosition = null; // Invalidate cache
    cachedCornerForPosition = null;
    isSnapping = false;
    isAnimatingToCorner = true; // Keep using left/top during animation
    emitChange();

    // Step 3: After animation completes, switch to corner-based positioning
    setTimeout(() => {
      isAnimatingToCorner = false;
      emitChange();
    }, 350); // Match the CSS transition duration (0.35s)
  }, 50); // 50ms delay ensures paint has occurred
}

/**
 * Cancel drag without saving
 */
export function cancelDrag(): void {
  isDragging = false;
  isSnapping = false;
  emitChange();
}

/**
 * Check if currently dragging
 */
export function getIsDragging(): boolean {
  return isDragging;
}

// Cached corner position (recalculated when corner changes or window resizes)
let cachedCornerPosition: { x: number; y: number } | null = null;
let cachedCornerForPosition: WidgetCorner | null = null;

// Track viewport size to detect resize
let lastViewportWidth = 0;
let lastViewportHeight = 0;

// Setup resize listener (called once when store is first used)
let resizeListenerAdded = false;
function setupResizeListener() {
  if (resizeListenerAdded || typeof window === 'undefined') return;
  resizeListenerAdded = true;

  window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    // Only emit change if size actually changed
    if (newWidth !== lastViewportWidth || newHeight !== lastViewportHeight) {
      lastViewportWidth = newWidth;
      lastViewportHeight = newHeight;
      // Invalidate cached positions
      cachedCornerPosition = null;
      cachedCornerForPosition = null;
      emitChange();
    }
  });

  // Initialize viewport size
  lastViewportWidth = window.innerWidth;
  lastViewportHeight = window.innerHeight;
}

/**
 * Get current position (either drag position or corner position)
 */
export function getPosition(): { x: number; y: number } {
  // During dragging OR snapping, return the drag position
  // isSnapping keeps the position at dragPosition while CSS transition is set up
  if (isDragging || isSnapping) {
    return dragPosition;
  }
  // Cache corner position to avoid creating new objects
  if (cachedCornerPosition === null || cachedCornerForPosition !== corner) {
    cachedCornerPosition = getPositionForCorner(corner);
    cachedCornerForPosition = corner;
  }
  return cachedCornerPosition;
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): { corner: WidgetCorner; position: { x: number; y: number }; isDragging: boolean; isAnimatingToCorner: boolean; isInitialized: boolean } {
  if (cachedSnapshot === null) {
    cachedSnapshot = {
      corner,
      position: getPosition(),
      isDragging,
      isAnimatingToCorner,
      isInitialized: initialized,
    };
  }
  return cachedSnapshot;
}

export function getServerSnapshot(): { corner: WidgetCorner; position: { x: number; y: number }; isDragging: boolean; isAnimatingToCorner: boolean; isInitialized: boolean } {
  return {
    corner: 'bottom-right',
    position: { x: 0, y: 0 },
    isDragging: false,
    isAnimatingToCorner: false,
    isInitialized: false,
  };
}

// Re-export type
export type { WidgetCorner };

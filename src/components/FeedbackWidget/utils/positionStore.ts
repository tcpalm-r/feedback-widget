// External store for widget position - allows useSyncExternalStore pattern
import {
  savePosition,
  loadPosition,
  constrainToViewport,
  type WidgetPosition,
} from './storage';

const WIDGET_SIZE = 56;
const PADDING = 24;

type Listener = () => void;

let position: WidgetPosition | null = null;
const listeners = new Set<Listener>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function getDefaultPosition(
  positionProp: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' = 'bottom-right'
): WidgetPosition {
  if (typeof window === 'undefined') {
    return { x: 0, y: 0 };
  }

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  switch (positionProp) {
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

export function initializePosition(
  positionProp: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' = 'bottom-right'
): void {
  if (position !== null) return; // Already initialized

  const savedPosition = loadPosition();
  if (savedPosition) {
    position = constrainToViewport(savedPosition, WIDGET_SIZE, WIDGET_SIZE);
  } else {
    position = getDefaultPosition(positionProp);
  }
  emitChange();
}

export function getPosition(): WidgetPosition {
  if (position === null) {
    return { x: 0, y: 0 };
  }
  return position;
}

export function setPosition(newPosition: WidgetPosition): void {
  position = newPosition;
  emitChange();
}

export function updateAndSavePosition(newPosition: WidgetPosition): void {
  position = newPosition;
  savePosition(newPosition);
  emitChange();
}

export function constrainPositionToViewport(): void {
  if (position !== null) {
    position = constrainToViewport(position, WIDGET_SIZE, WIDGET_SIZE);
    emitChange();
  }
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): WidgetPosition {
  return getPosition();
}

export function getServerSnapshot(): WidgetPosition {
  return { x: 0, y: 0 };
}

export { WIDGET_SIZE };

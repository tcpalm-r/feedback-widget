'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { getWidgetStyles } from './styles';
import { getFeedbackFormHTML, FeedbackType } from './FeedbackForm';
import { getSelectionModeOverlayHTML, getDisplayCanvasHTML, DrawnRectangle } from './SelectionMode';
import { initConfig, getConfig, FeedbackWidgetConfig, WidgetPosition } from './utils/config';
import { JwtConfig } from './utils/jwt';
import { useWidgetPosition } from './hooks/useWidgetPosition';
import { useDragHandlers } from './hooks/useDragHandlers';
import { useSelectionMode } from './hooks/useSelectionMode';
import { useScreenshots } from './hooks/useScreenshots';
import { useCanvasDrawing } from './hooks/useCanvasDrawing';
import { useFeedbackSubmission } from './hooks/useFeedbackSubmission';
import { setupFormEventListeners, setupContainerListeners } from './hooks/useShadowDomEvents';

const MessageSquareIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;

export interface FeedbackWidgetProps {
  position?: WidgetPosition;
  appId?: string;
  jwtConfig?: JwtConfig;
  apiBaseUrl?: string;
}

function useIsClient() {
  return useSyncExternalStore(() => () => {}, () => true, () => false);
}

FeedbackWidget.init = function init(config: FeedbackWidgetConfig): void {
  initConfig(config);
};

export function FeedbackWidget({ position, appId, jwtConfig, apiBaseUrl }: FeedbackWidgetProps = {}) {
  const globalConfig = getConfig();
  const effectiveAppId = appId ?? globalConfig?.appId ?? 'default';
  const effectivePosition = position ?? globalConfig?.position ?? 'top-right';
  const effectiveJwtConfig = jwtConfig ?? globalConfig?.jwtConfig;
  const effectiveApiBaseUrl = apiBaseUrl ?? globalConfig?.apiBaseUrl;

  const hostRef = useRef<HTMLDivElement>(null);
  const shadowRootRef = useRef<ShadowRoot | null>(null);
  const morphContainerRef = useRef<HTMLDivElement | null>(null);
  const containerListenersAddedRef = useRef(false);
  const isExpandedRef = useRef(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const prevExpandedRef = useRef(false);
  isExpandedRef.current = isExpanded;

  // Track when transitioning from expanded to collapsed (closing)
  useEffect(() => {
    if (prevExpandedRef.current && !isExpanded) {
      // Was expanded, now collapsed - we're closing
      setIsClosing(true);
      const timer = setTimeout(() => setIsClosing(false), 150); // Match CSS transition
      return () => clearTimeout(timer);
    }
    prevExpandedRef.current = isExpanded;
  }, [isExpanded]);


  const isClient = useIsClient();
  const { widgetPosition, isDragging, isSnapping, isInitialized, isAnimatingToCorner, widgetState } = useWidgetPosition(effectivePosition);
  const { handleMouseDownRef, hasDraggedRef } = useDragHandlers({ widgetPosition, isExpanded });

  const {
    capturedScreenshots, setCapturedScreenshots, drawnRectangles, setDrawnRectangles,
    selectionWarning, setSelectionWarning, isScreenshotListExpanded, setIsScreenshotListExpanded,
    showWarning, handleRemoveScreenshot, handleClearAllScreenshots,
    handleToggleScreenshotList, handleShowScreenshotPreview, handleFileUpload, MAX_SCREENSHOTS,
  } = useScreenshots({ shadowRootRef });

  const { isSelectionMode, isSelectionModeRef, handleEnterSelectionMode, handleExitSelectionMode } = useSelectionMode({ setIsExpanded, setSelectionWarning });

  useCanvasDrawing({ isSelectionMode, drawnRectangles, setDrawnRectangles, setCapturedScreenshots, showWarning, shadowRootRef, maxScreenshots: MAX_SCREENSHOTS });

  const {
    feedbackType, setFeedbackType, feedbackMessage, setFeedbackMessage,
    feedbackInitials, setFeedbackInitials,
    submissionState, errorMessage, isNetworkError, isValidationError,
    handleClose, handleSubmit, handleRetry,
  } = useFeedbackSubmission({
    effectiveAppId, effectiveApiBaseUrl, effectiveJwtConfig, capturedScreenshots, setCapturedScreenshots,
    setDrawnRectangles: setDrawnRectangles as React.Dispatch<React.SetStateAction<DrawnRectangle[]>>,
    setIsScreenshotListExpanded, setIsExpanded,
  });

  useEffect(() => {
    if (!hostRef.current || !isClient || !isInitialized) return;
    if (!shadowRootRef.current) shadowRootRef.current = hostRef.current.attachShadow({ mode: 'open' });
    const shadowRoot = shadowRootRef.current;

    const expandedClass = isExpanded ? 'expanded' : '';
    const draggingClass = isDragging ? 'dragging' : '';
    const initializingClass = !isInitialized ? 'initializing' : '';
    const animatingClass = isAnimatingToCorner ? 'animating-to-corner' : '';

    // When dragging or animating to corner, use left/top positioning
    // When settled (expanded or collapsed), use corner-appropriate positioning (right/bottom for right/bottom corners)
    // This allows the widget to expand FROM the corner it's located in and collapse TOWARD it
    // Using corner-based positioning when collapsed ensures consistent layout without position-switch glitches
    const useAbsolutePosition = isDragging || isSnapping || isAnimatingToCorner;
    let positionStyle: string;
    if (useAbsolutePosition) {
      positionStyle = `left: ${widgetPosition.x}px; top: ${widgetPosition.y}px; right: auto; bottom: auto;`;
    } else {
      const padding = 24;
      switch (widgetState.corner) {
        case 'top-left':
          positionStyle = `left: ${padding}px; top: ${padding}px; right: auto; bottom: auto;`;
          break;
        case 'top-right':
          positionStyle = `right: ${padding}px; top: ${padding}px; left: auto; bottom: auto;`;
          break;
        case 'bottom-left':
          positionStyle = `left: ${padding}px; bottom: ${padding}px; right: auto; top: auto;`;
          break;
        case 'bottom-right':
        default:
          positionStyle = `right: ${padding}px; bottom: ${padding}px; left: auto; top: auto;`;
          break;
      }
    }
    const hasRectanglesToDisplay = drawnRectangles.length > 0;
    const selectionModeOverlay = isSelectionMode ? getSelectionModeOverlayHTML(capturedScreenshots.length, selectionWarning) : (hasRectanglesToDisplay ? getDisplayCanvasHTML() : '');
    const formContent = getFeedbackFormHTML(feedbackType, feedbackMessage, submissionState, errorMessage, isNetworkError, capturedScreenshots, isScreenshotListExpanded, !isValidationError, isValidationError, feedbackInitials);

    let morphContainer = morphContainerRef.current;
    if (morphContainer && shadowRoot.contains(morphContainer)) {
      morphContainer.className = `feedback-widget-morph ${expandedClass} ${draggingClass} ${initializingClass} ${animatingClass}`.trim();
      morphContainer.style.cssText = positionStyle;
      morphContainer.setAttribute('aria-expanded', String(isExpanded));


      const formLayer = morphContainer.querySelector('.form-layer');
      if (formLayer) {
        const existingTextarea = formLayer.querySelector('#feedback-message') as HTMLTextAreaElement | null;
        const existingInitials = formLayer.querySelector('#feedback-initials') as HTMLInputElement | null;
        const textareaHadFocus = shadowRoot.activeElement === existingTextarea;
        const initialsHadFocus = shadowRoot.activeElement === existingInitials;
        const selectionStart = existingTextarea?.selectionStart;
        const selectionEnd = existingTextarea?.selectionEnd;
        const scrollTop = existingTextarea?.scrollTop;
        const initialsSelectionStart = existingInitials?.selectionStart;
        const initialsSelectionEnd = existingInitials?.selectionEnd;
        formLayer.innerHTML = formContent;
        if (textareaHadFocus) {
          const newTextarea = formLayer.querySelector('#feedback-message') as HTMLTextAreaElement | null;
          if (newTextarea) {
            newTextarea.focus();
            if (selectionStart !== undefined && selectionEnd !== undefined) newTextarea.setSelectionRange(selectionStart, selectionEnd);
            if (scrollTop !== undefined) newTextarea.scrollTop = scrollTop;
            newTextarea.setSelectionRange(newTextarea.selectionStart, newTextarea.selectionStart);
          }
        } else if (initialsHadFocus) {
          const newInitials = formLayer.querySelector('#feedback-initials') as HTMLInputElement | null;
          if (newInitials) {
            newInitials.focus();
            if (initialsSelectionStart !== undefined && initialsSelectionEnd !== undefined) {
              newInitials.setSelectionRange(initialsSelectionStart, initialsSelectionEnd);
            }
          }
        }
      }

      // Update selection mode overlay and canvas
      const existingOverlay = shadowRoot.querySelector('.selection-mode-overlay');
      const existingCanvas = shadowRoot.querySelector('.selection-mode-canvas');
      const hasRectangles = drawnRectangles.length > 0;

      if (isSelectionMode && !existingOverlay) {
        if (existingCanvas) existingCanvas.remove();
        morphContainer.insertAdjacentHTML('beforebegin', selectionModeOverlay);
      } else if (!isSelectionMode && existingOverlay) {
        existingOverlay.remove();
        if (hasRectangles && existingCanvas) existingCanvas.classList.add('display-only');
        else if (existingCanvas) existingCanvas.remove();
      } else if (!isSelectionMode && !existingOverlay && hasRectangles) {
        if (!existingCanvas) morphContainer.insertAdjacentHTML('beforebegin', getDisplayCanvasHTML());
        else if (!existingCanvas.classList.contains('display-only')) existingCanvas.classList.add('display-only');
      } else if (!isSelectionMode && !existingOverlay && !hasRectangles && existingCanvas) {
        existingCanvas.remove();
      } else if (isSelectionMode && existingOverlay) {
        const counter = existingOverlay.querySelector('.selection-mode-counter');
        if (counter) counter.textContent = `${capturedScreenshots.length}/5 captured`;
        const existingWarning = existingOverlay.querySelector('.selection-mode-warning');
        if (selectionWarning && !existingWarning) {
          const hint = existingOverlay.querySelector('.selection-mode-hint');
          if (hint) hint.insertAdjacentHTML('beforebegin', `<div class="selection-mode-warning">${selectionWarning}</div>`);
        } else if (!selectionWarning && existingWarning) existingWarning.remove();
        else if (selectionWarning && existingWarning) existingWarning.textContent = selectionWarning;
      }
    } else {
      shadowRoot.innerHTML = `<style>${getWidgetStyles()}</style>${selectionModeOverlay}<div class="feedback-tooltip" id="widget-tooltip">Provide Feedback</div><div class="feedback-widget-morph ${expandedClass} ${draggingClass} ${initializingClass} ${animatingClass}" style="${positionStyle}" role="dialog" aria-label="Feedback widget" aria-expanded="${isExpanded}"><div class="button-layer" data-tooltip="Provide Feedback">${MessageSquareIcon}</div><div class="form-layer">${formContent}</div></div>`;
      morphContainer = shadowRoot.querySelector('.feedback-widget-morph') as HTMLDivElement;
      morphContainerRef.current = morphContainer;
    }

    if (morphContainerRef.current && !containerListenersAddedRef.current) {
      containerListenersAddedRef.current = true;
      setupContainerListeners(morphContainerRef.current, shadowRoot, isExpandedRef, isSelectionModeRef, handleMouseDownRef, hasDraggedRef, handleExitSelectionMode, setIsExpanded);
    }

    if (isSelectionMode) {
      const doneButton = shadowRoot.querySelector('.selection-mode-done-button');
      if (doneButton) doneButton.addEventListener('click', handleExitSelectionMode);
    }

    return setupFormEventListeners(shadowRoot, {
      handleClose, handleSubmit, handleRetry, handleEnterSelectionMode, handleExitSelectionMode,
      handleToggleScreenshotList, handleClearAllScreenshots, handleRemoveScreenshot, handleShowScreenshotPreview,
      handleFileUpload, setFeedbackType, setFeedbackMessage, setFeedbackInitials,
    }, capturedScreenshots);
  }, [
    isExpanded, isClosing, widgetPosition, widgetState.corner, isDragging, isSnapping, isAnimatingToCorner, isClient, isInitialized,
    handleClose, handleSubmit, handleRetry, handleEnterSelectionMode, handleExitSelectionMode,
    handleToggleScreenshotList, handleClearAllScreenshots, handleRemoveScreenshot, handleShowScreenshotPreview, handleFileUpload,
    feedbackType, feedbackMessage, feedbackInitials, submissionState, errorMessage, isNetworkError, isValidationError,
    isSelectionMode, capturedScreenshots, drawnRectangles, isScreenshotListExpanded, selectionWarning,
    setFeedbackType, setFeedbackMessage, setFeedbackInitials, isSelectionModeRef, handleMouseDownRef, hasDraggedRef,
  ]);

  return <div ref={hostRef} data-feedback-widget />;
}

export type { FeedbackWidgetConfig, WidgetPosition } from './utils/config';
export type { JwtConfig } from './utils/jwt';
export default FeedbackWidget;

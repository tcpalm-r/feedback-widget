import { MutableRefObject } from 'react';
import { FeedbackType } from '../FeedbackForm';
import { CapturedScreenshot } from '../utils/screenshot';

interface ShadowDomEventHandlers {
  handleClose: () => void;
  handleSubmit: (e?: Event) => void;
  handleRetry: () => void;
  handleEnterSelectionMode: () => void;
  handleExitSelectionMode: () => void;
  handleToggleScreenshotList: () => void;
  handleClearAllScreenshots: () => void;
  handleRemoveScreenshot: (index: number) => void;
  handleShowScreenshotPreview: (screenshot: CapturedScreenshot) => void;
  handleFileUpload: (files: FileList | null | undefined) => void;
  setFeedbackType: (type: FeedbackType) => void;
  setFeedbackMessage: (msg: string) => void;
}

export function setupFormEventListeners(
  shadowRoot: ShadowRoot,
  handlers: ShadowDomEventHandlers,
  capturedScreenshots: CapturedScreenshot[]
): () => void {
  const { handleClose, handleSubmit, handleRetry, handleEnterSelectionMode, handleToggleScreenshotList,
    handleClearAllScreenshots, handleRemoveScreenshot, handleShowScreenshotPreview, handleFileUpload,
    setFeedbackType, setFeedbackMessage } = handlers;

  const closeButton = shadowRoot.querySelector('.feedback-close-button');
  const form = shadowRoot.querySelector('.feedback-form-body');
  const typeSelect = shadowRoot.querySelector('#feedback-type') as HTMLSelectElement;
  const messageTextarea = shadowRoot.querySelector('#feedback-message') as HTMLTextAreaElement;
  const retryButton = shadowRoot.querySelector('.feedback-retry-button');
  const selectOnScreenButton = shadowRoot.querySelector('.feedback-select-button');
  const screenshotMenu = shadowRoot.querySelector('.feedback-screenshot-menu');
  const fileInput = shadowRoot.querySelector('#screenshot-file-input') as HTMLInputElement | null;
  const screenshotTooltip = shadowRoot.querySelector('#widget-tooltip') as HTMLElement;

  if (closeButton) closeButton.addEventListener('click', handleClose);
  if (form) form.addEventListener('submit', handleSubmit);
  if (typeSelect) {
    typeSelect.addEventListener('change', (e) => setFeedbackType((e.target as HTMLSelectElement).value as FeedbackType));
    typeSelect.addEventListener('keydown', (e) => e.stopPropagation());
  }
  if (messageTextarea) {
    messageTextarea.addEventListener('input', (e) => setFeedbackMessage((e.target as HTMLTextAreaElement).value));
    messageTextarea.addEventListener('keydown', (e) => e.stopPropagation());
    messageTextarea.addEventListener('keyup', (e) => e.stopPropagation());
    messageTextarea.addEventListener('keypress', (e) => e.stopPropagation());
  }
  if (retryButton) retryButton.addEventListener('click', handleRetry);

  // Screenshot menu handlers
  if (selectOnScreenButton && screenshotMenu) {
    selectOnScreenButton.addEventListener('click', (e) => {
      e.stopPropagation();
      if (screenshotTooltip) screenshotTooltip.classList.remove('visible');
      screenshotMenu.classList.toggle('open');
    });
  }
  if (selectOnScreenButton && screenshotTooltip) {
    selectOnScreenButton.addEventListener('mouseenter', () => {
      const tooltipText = selectOnScreenButton.getAttribute('data-tooltip');
      if (tooltipText) {
        const rect = selectOnScreenButton.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const centerY = rect.top + rect.height / 2;
        screenshotTooltip.textContent = tooltipText;
        screenshotTooltip.style.left = `${rect.left + rect.width / 2}px`;
        screenshotTooltip.style.transform = 'translateX(-50%)';
        if (centerY > viewportHeight / 2) {
          screenshotTooltip.style.top = `${rect.top - 8}px`;
          screenshotTooltip.style.transform += ' translateY(-100%)';
        } else {
          screenshotTooltip.style.top = `${rect.bottom + 8}px`;
          screenshotTooltip.style.transform += ' translateY(0)';
        }
        screenshotTooltip.classList.add('visible');
      }
    });
    selectOnScreenButton.addEventListener('mouseleave', () => screenshotTooltip.classList.remove('visible'));
  }

  const captureMenuItem = shadowRoot.querySelector('[data-action="capture"]');
  const uploadMenuItem = shadowRoot.querySelector('[data-action="upload"]');
  if (captureMenuItem && screenshotMenu) captureMenuItem.addEventListener('click', () => { screenshotMenu.classList.remove('open'); handleEnterSelectionMode(); });
  if (uploadMenuItem && fileInput && screenshotMenu) uploadMenuItem.addEventListener('click', () => { screenshotMenu.classList.remove('open'); fileInput.click(); });
  if (fileInput) fileInput.addEventListener('change', (e) => { handleFileUpload((e.target as HTMLInputElement).files); fileInput.value = ''; });

  const dropzone = shadowRoot.querySelector('#screenshot-dropzone');
  if (dropzone) {
    dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('drag-over'); });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('drag-over'));
    dropzone.addEventListener('drop', (e) => { e.preventDefault(); dropzone.classList.remove('drag-over'); handleFileUpload((e as DragEvent).dataTransfer?.files); });
  }

  const handleDocumentClick = (e: MouseEvent) => {
    const container = shadowRoot.querySelector('.feedback-screenshot-container');
    if (container && !container.contains(e.target as Node)) screenshotMenu?.classList.remove('open');
  };
  document.addEventListener('click', handleDocumentClick);

  // Screenshot list handlers
  const screenshotListBadge = shadowRoot.querySelector('.screenshot-list-badge');
  const clearAllScreenshotsButton = shadowRoot.querySelector('.screenshot-list-clear-all');
  if (screenshotListBadge) screenshotListBadge.addEventListener('click', handleToggleScreenshotList);
  if (clearAllScreenshotsButton) clearAllScreenshotsButton.addEventListener('click', handleClearAllScreenshots);
  shadowRoot.querySelectorAll('.screenshot-thumbnail-remove').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      handleRemoveScreenshot(parseInt((e.currentTarget as HTMLElement).getAttribute('data-remove-index') || '0', 10));
    });
  });
  shadowRoot.querySelectorAll('.screenshot-thumbnail-wrapper').forEach((thumbnail) => {
    thumbnail.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).closest('.screenshot-thumbnail-remove')) return;
      const item = (e.currentTarget as HTMLElement).closest('.screenshot-thumbnail-item');
      const index = parseInt(item?.getAttribute('data-screenshot-index') || '0', 10);
      if (capturedScreenshots[index]) handleShowScreenshotPreview(capturedScreenshots[index]);
    });
  });

  return () => document.removeEventListener('click', handleDocumentClick);
}

export function setupContainerListeners(
  container: HTMLDivElement,
  shadowRoot: ShadowRoot,
  isExpandedRef: MutableRefObject<boolean>,
  isSelectionModeRef: MutableRefObject<boolean>,
  handleMouseDownRef: MutableRefObject<(e: MouseEvent) => void>,
  hasDraggedRef: MutableRefObject<boolean>,
  handleExitSelectionMode: () => void,
  setIsExpanded: (expanded: boolean) => void
) {
  container.addEventListener('mousedown', (e: Event) => {
    if (!isSelectionModeRef.current && !isExpandedRef.current) {
      handleMouseDownRef.current(e as MouseEvent);
    }
  });

  const tooltip = shadowRoot.querySelector('#widget-tooltip') as HTMLElement;

  container.addEventListener('click', () => {
    if (tooltip) tooltip.classList.remove('visible');
    if (isExpandedRef.current) return;
    const wasDragged = hasDraggedRef.current;
    hasDraggedRef.current = false;
    if (!wasDragged) {
      if (isSelectionModeRef.current) handleExitSelectionMode();
      else setIsExpanded(true);
    }
  });

  if (tooltip) {
    const positionTooltip = (targetRect: DOMRect, text: string) => {
      tooltip.textContent = text;
      const viewportWidth = window.innerWidth;
      const centerX = targetRect.left + targetRect.width / 2;
      const centerY = targetRect.top + targetRect.height / 2;
      if (centerX > viewportWidth / 2) {
        tooltip.style.left = `${targetRect.left - 8}px`;
        tooltip.style.transform = 'translateX(-100%)';
      } else {
        tooltip.style.left = `${targetRect.right + 8}px`;
        tooltip.style.transform = 'translateX(0)';
      }
      tooltip.style.top = `${centerY}px`;
      tooltip.style.transform += ' translateY(-50%)';
      tooltip.classList.add('visible');
    };

    container.addEventListener('mouseenter', () => {
      if (!isExpandedRef.current && !isSelectionModeRef.current) {
        positionTooltip(container.getBoundingClientRect(), 'Provide Feedback');
      }
    });
    container.addEventListener('mouseleave', () => tooltip.classList.remove('visible'));
  }
}

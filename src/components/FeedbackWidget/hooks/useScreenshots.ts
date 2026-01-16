import { useState, useRef, useCallback, useEffect, MutableRefObject } from 'react';
import { CapturedScreenshot, releaseScreenshot } from '../utils/screenshot';
import type { DrawnRectangle } from '../SelectionMode';

const MAX_SCREENSHOTS = 5;

interface UseScreenshotsProps {
  shadowRootRef: MutableRefObject<ShadowRoot | null>;
}

export function useScreenshots({ shadowRootRef }: UseScreenshotsProps) {
  const [capturedScreenshots, setCapturedScreenshots] = useState<CapturedScreenshot[]>([]);
  const [drawnRectangles, setDrawnRectangles] = useState<DrawnRectangle[]>([]);
  const [selectionWarning, setSelectionWarning] = useState<string | null>(null);
  const [isScreenshotListExpanded, setIsScreenshotListExpanded] = useState(false);
  const warningTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
      }
      // Release all captured screenshot blob URLs
      capturedScreenshots.forEach(screenshot => releaseScreenshot(screenshot));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showWarning = useCallback((message: string) => {
    setSelectionWarning(message);
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
    }
    warningTimeoutRef.current = setTimeout(() => {
      setSelectionWarning(null);
    }, 2000);
  }, []);

  const handleRemoveScreenshot = useCallback((index: number) => {
    setCapturedScreenshots(prev => {
      const removed = prev[index];
      if (removed) {
        releaseScreenshot(removed);
      }
      return prev.filter((_, i) => i !== index);
    });
    setDrawnRectangles(prev => {
      const newRects = prev.filter((_, i) => i !== index);
      return newRects.map((rect, idx) => ({ ...rect, number: idx + 1 }));
    });
  }, []);

  const handleClearAllScreenshots = useCallback(() => {
    capturedScreenshots.forEach(screenshot => releaseScreenshot(screenshot));
    setCapturedScreenshots([]);
    setDrawnRectangles([]);
    setIsScreenshotListExpanded(false);
  }, [capturedScreenshots]);

  const handleToggleScreenshotList = useCallback(() => {
    setIsScreenshotListExpanded(prev => !prev);
  }, []);

  const handleShowScreenshotPreview = useCallback((screenshot: CapturedScreenshot) => {
    if (!shadowRootRef.current) return;

    const shadowRoot = shadowRootRef.current;

    const existingOverlay = shadowRoot.querySelector('[data-preview-overlay]');
    if (existingOverlay) {
      existingOverlay.remove();
    }

    const overlay = document.createElement('div');
    overlay.className = 'screenshot-preview-overlay';
    overlay.setAttribute('data-preview-overlay', '');
    overlay.innerHTML = `
      <div class="screenshot-preview-container">
        <img src="${screenshot.blobUrl}" alt="Screenshot preview" class="screenshot-preview-image" />
        <button type="button" class="screenshot-preview-close" aria-label="Close preview">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </div>
    `;

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || (e.target as HTMLElement).closest('.screenshot-preview-close')) {
        overlay.remove();
      }
    });

    shadowRoot.appendChild(overlay);
  }, [shadowRootRef]);

  const handleFileUpload = useCallback((files: FileList | null | undefined) => {
    if (!files) return;

    let addedCount = 0;
    for (const file of Array.from(files)) {
      if (capturedScreenshots.length + addedCount >= MAX_SCREENSHOTS) {
        showWarning(`Maximum ${MAX_SCREENSHOTS} screenshots allowed`);
        break;
      }
      if (!file.type.startsWith('image/')) continue;

      const blobUrl = URL.createObjectURL(file);
      const screenshot: CapturedScreenshot = {
        id: `upload-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        blobUrl,
        region: { x: 0, y: 0, width: 0, height: 0 },
        capturedAt: Date.now(),
        sizeBytes: file.size,
      };
      setCapturedScreenshots(prev => [...prev, screenshot]);
      addedCount++;
    }
  }, [capturedScreenshots.length, showWarning]);

  return {
    capturedScreenshots,
    setCapturedScreenshots,
    drawnRectangles,
    setDrawnRectangles,
    selectionWarning,
    setSelectionWarning,
    isScreenshotListExpanded,
    setIsScreenshotListExpanded,
    showWarning,
    handleRemoveScreenshot,
    handleClearAllScreenshots,
    handleToggleScreenshotList,
    handleShowScreenshotPreview,
    handleFileUpload,
    MAX_SCREENSHOTS,
  };
}

// Screenshot utilities for capturing screen regions using modern-screenshot
import { domToCanvas } from 'modern-screenshot';

/**
 * Represents a captured screenshot region
 */
export interface CapturedScreenshot {
  id: string;
  blobUrl: string;
  region: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  capturedAt: number;
  sizeBytes: number;
}

const MAX_DIMENSION = 2000;

/**
 * Generate a unique ID for screenshots
 */
function generateId(): string {
  return `screenshot-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Create a placeholder canvas for when capture fails
 */
function createPlaceholderCanvas(width: number, height: number, x: number, y: number, scale: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(width * scale));
  canvas.height = Math.max(1, Math.round(height * scale));
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#00A3E1';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);
    ctx.fillStyle = '#333';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`Region: ${width}x${height}`, canvas.width / 2, canvas.height / 2 - 10);
    ctx.fillText(`at (${x}, ${y})`, canvas.width / 2, canvas.height / 2 + 10);
  }

  return canvas;
}

/**
 * Capture a region of the screen as a PNG blob
 * @param x - X coordinate of the region's top-left corner
 * @param y - Y coordinate of the region's top-left corner
 * @param width - Width of the region in pixels
 * @param height - Height of the region in pixels
 * @returns Promise resolving to the captured image as a Blob
 */
export async function captureRegion(
  x: number,
  y: number,
  width: number,
  height: number
): Promise<Blob> {
  // Calculate scale factor if region exceeds max dimension
  let scale = 1;
  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    scale = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
  }

  let croppedCanvas: HTMLCanvasElement;

  try {
    // Capture the full document body using modern-screenshot
    const fullCanvas = await domToCanvas(document.body, {
      scale,
      filter: (element) => {
        // Ignore the feedback widget itself
        if (element instanceof Element) {
          return !element.hasAttribute?.('data-feedback-widget');
        }
        return true;
      },
    });

    // Crop the canvas to the selected region
    croppedCanvas = document.createElement('canvas');
    croppedCanvas.width = Math.round(width * scale);
    croppedCanvas.height = Math.round(height * scale);
    const ctx = croppedCanvas.getContext('2d');

    if (ctx) {
      ctx.drawImage(
        fullCanvas,
        x * scale,
        y * scale,
        width * scale,
        height * scale,
        0,
        0,
        croppedCanvas.width,
        croppedCanvas.height
      );
    }
  } catch (captureError) {
    console.warn('[FeedbackWidget] modern-screenshot failed, using placeholder:', captureError);
    croppedCanvas = createPlaceholderCanvas(width, height, x, y, scale);
  }

  // Convert canvas to blob
  return new Promise((resolve) => {
    croppedCanvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          console.warn('[FeedbackWidget] Canvas toBlob failed, creating placeholder');
          const fallbackCanvas = createPlaceholderCanvas(width, height, x, y, scale);
          fallbackCanvas.toBlob((fallbackBlob) => {
            resolve(fallbackBlob || new Blob(['placeholder'], { type: 'image/png' }));
          }, 'image/png');
        }
      },
      'image/png',
      1.0
    );
  });
}

/**
 * Capture a region and return a CapturedScreenshot object with blob URL
 * @param x - X coordinate of the region's top-left corner
 * @param y - Y coordinate of the region's top-left corner
 * @param width - Width of the region in pixels
 * @param height - Height of the region in pixels
 * @returns Promise resolving to a CapturedScreenshot object
 */
export async function captureScreenshot(
  x: number,
  y: number,
  width: number,
  height: number
): Promise<CapturedScreenshot> {
  const blob = await captureRegion(x, y, width, height);
  const blobUrl = URL.createObjectURL(blob);

  return {
    id: generateId(),
    blobUrl,
    region: { x, y, width, height },
    capturedAt: Date.now(),
    sizeBytes: blob.size,
  };
}

/**
 * Revoke a blob URL to free memory
 * @param screenshot - The screenshot to release
 */
export function releaseScreenshot(screenshot: CapturedScreenshot): void {
  URL.revokeObjectURL(screenshot.blobUrl);
}

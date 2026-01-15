// Screenshot utilities for capturing screen regions using html2canvas
import html2canvas from 'html2canvas';

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

  // Capture the document body using html2canvas
  // If html2canvas fails (e.g., due to unsupported CSS like lab() colors),
  // fall back to creating a placeholder image
  let canvas: HTMLCanvasElement;

  try {
    canvas = await html2canvas(document.body, {
      useCORS: true,
      logging: false,
      x,
      y,
      width,
      height,
      scale,
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: document.documentElement.scrollHeight,
      // Ignore elements that might cause parsing issues
      ignoreElements: (element) => {
        // Ignore the feedback widget itself
        return element.hasAttribute?.('data-feedback-widget') || false;
      },
    });
  } catch (html2canvasError) {
    console.warn('[FeedbackWidget] html2canvas failed, using native capture:', html2canvasError);

    // Fallback: Create a canvas and draw from the screen
    // This won't capture the actual content but provides a placeholder
    canvas = document.createElement('canvas');
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Draw a placeholder with the region info
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
  }

  // Convert canvas to blob
  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          // Fallback: create a placeholder blob if canvas conversion fails
          console.warn('[FeedbackWidget] Canvas toBlob failed, creating placeholder');
          const fallbackCanvas = document.createElement('canvas');
          fallbackCanvas.width = Math.max(1, Math.round(width * scale));
          fallbackCanvas.height = Math.max(1, Math.round(height * scale));
          const ctx = fallbackCanvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = '#f0f0f0';
            ctx.fillRect(0, 0, fallbackCanvas.width, fallbackCanvas.height);
            ctx.strokeStyle = '#00A3E1';
            ctx.lineWidth = 2;
            ctx.strokeRect(1, 1, fallbackCanvas.width - 2, fallbackCanvas.height - 2);
            ctx.fillStyle = '#333';
            ctx.font = '14px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`Region: ${width}x${height}`, fallbackCanvas.width / 2, fallbackCanvas.height / 2);
          }
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

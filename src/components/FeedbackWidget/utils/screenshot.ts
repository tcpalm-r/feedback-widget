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

const MIN_DIMENSION = 10;
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
 * @throws Error if the selection is too small (< 10x10 pixels)
 */
export async function captureRegion(
  x: number,
  y: number,
  width: number,
  height: number
): Promise<Blob> {
  // Validate minimum size
  if (width < MIN_DIMENSION || height < MIN_DIMENSION) {
    throw new Error('Selection too small');
  }

  // Calculate scale factor if region exceeds max dimension
  let scale = 1;
  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    scale = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
  }

  // Capture the document body
  const canvas = await html2canvas(document.body, {
    useCORS: true,
    logging: false,
    x,
    y,
    width,
    height,
    scale,
    windowWidth: document.documentElement.scrollWidth,
    windowHeight: document.documentElement.scrollHeight,
  });

  // Convert canvas to blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to convert canvas to blob'));
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

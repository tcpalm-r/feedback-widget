import { useRef, useEffect, MutableRefObject } from 'react';
import { canvasUtils, DrawnRectangle } from '../SelectionMode';
import { CapturedScreenshot, captureScreenshot } from '../utils/screenshot';

interface UseCanvasDrawingProps {
  isSelectionMode: boolean;
  drawnRectangles: DrawnRectangle[];
  setDrawnRectangles: React.Dispatch<React.SetStateAction<DrawnRectangle[]>>;
  setCapturedScreenshots: React.Dispatch<React.SetStateAction<CapturedScreenshot[]>>;
  showWarning: (message: string) => void;
  shadowRootRef: MutableRefObject<ShadowRoot | null>;
  maxScreenshots: number;
}

export function useCanvasDrawing({
  isSelectionMode,
  drawnRectangles,
  setDrawnRectangles,
  setCapturedScreenshots,
  showWarning,
  shadowRootRef,
  maxScreenshots,
}: UseCanvasDrawingProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const isDrawingRef = useRef(false);
  const drawStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const hasRectangles = drawnRectangles.length > 0;

    // If not in selection mode and no rectangles, clean up
    if (!isSelectionMode && !hasRectangles) {
      canvasRef.current = null;
      canvasCtxRef.current = null;
      isDrawingRef.current = false;
      drawStartRef.current = null;
      return;
    }

    if (!shadowRootRef.current) {
      return;
    }

    let cleanupFns: (() => void)[] = [];

    const frameId = requestAnimationFrame(() => {
      if (!shadowRootRef.current) return;

      const canvas = shadowRootRef.current.querySelector('.selection-mode-canvas') as HTMLCanvasElement | null;
      if (!canvas) return;

      canvasRef.current = canvas;
      const ctx = canvasUtils.initCanvas(canvas);
      if (!ctx) return;
      canvasCtxRef.current = ctx;

      canvasUtils.redrawRectangles(ctx, canvas, drawnRectangles);

      if (isSelectionMode) {
        const handleCanvasMouseDown = (e: MouseEvent) => {
          isDrawingRef.current = true;
          drawStartRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleCanvasMouseMove = (e: MouseEvent) => {
          if (!isDrawingRef.current || !drawStartRef.current || !canvasCtxRef.current || !canvasRef.current) {
            return;
          }

          const ctx = canvasCtxRef.current;
          const cvs = canvasRef.current;

          canvasUtils.redrawRectangles(ctx, cvs, drawnRectangles);

          const { x, y, width, height } = canvasUtils.normalizeRect(
            drawStartRef.current.x,
            drawStartRef.current.y,
            e.clientX,
            e.clientY
          );
          canvasUtils.drawRectangle(ctx, x, y, width, height, true);
        };

        const handleCanvasMouseUp = async (e: MouseEvent) => {
          if (!isDrawingRef.current || !drawStartRef.current) {
            return;
          }

          isDrawingRef.current = false;

          const { x, y, width, height } = canvasUtils.normalizeRect(
            drawStartRef.current.x,
            drawStartRef.current.y,
            e.clientX,
            e.clientY
          );

          drawStartRef.current = null;

          if (drawnRectangles.length >= maxScreenshots) {
            showWarning(`Maximum ${maxScreenshots} screenshots allowed`);
            if (canvasCtxRef.current && canvasRef.current) {
              canvasUtils.redrawRectangles(canvasCtxRef.current, canvasRef.current, drawnRectangles);
            }
            return;
          }

          const newNumber = drawnRectangles.length + 1;
          const newRect: DrawnRectangle = {
            id: `rect-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
            x,
            y,
            width,
            height,
            number: newNumber,
          };

          setDrawnRectangles(prev => [...prev, newRect]);

          try {
            if (canvasRef.current) {
              canvasRef.current.style.visibility = 'hidden';
            }

            const screenshot = await captureScreenshot(x, y, width, height);

            if (canvasRef.current) {
              canvasRef.current.style.visibility = 'visible';
            }

            setCapturedScreenshots(prev => [...prev, screenshot]);
          } catch (error) {
            if (canvasRef.current) {
              canvasRef.current.style.visibility = 'visible';
            }

            console.error('Failed to capture screenshot:', error);
            showWarning('Failed to capture screenshot');
            setDrawnRectangles(prev => prev.filter(r => r.id !== newRect.id));
          }
        };

        canvas.addEventListener('mousedown', handleCanvasMouseDown);
        document.addEventListener('mousemove', handleCanvasMouseMove);
        document.addEventListener('mouseup', handleCanvasMouseUp);

        cleanupFns.push(() => {
          canvas.removeEventListener('mousedown', handleCanvasMouseDown);
          document.removeEventListener('mousemove', handleCanvasMouseMove);
          document.removeEventListener('mouseup', handleCanvasMouseUp);
        });
      }

      const handleResize = () => {
        if (canvasRef.current && canvasCtxRef.current) {
          canvasUtils.initCanvas(canvasRef.current);
          canvasCtxRef.current = canvasRef.current.getContext('2d');
          if (canvasCtxRef.current) {
            canvasUtils.redrawRectangles(canvasCtxRef.current, canvasRef.current, drawnRectangles);
          }
        }
      };

      window.addEventListener('resize', handleResize);
      cleanupFns.push(() => {
        window.removeEventListener('resize', handleResize);
      });
    });

    return () => {
      cancelAnimationFrame(frameId);
      cleanupFns.forEach(fn => fn());
    };
  }, [isSelectionMode, drawnRectangles, setDrawnRectangles, setCapturedScreenshots, showWarning, shadowRootRef, maxScreenshots]);

  return { canvasRef };
}

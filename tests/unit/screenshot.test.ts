import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { CapturedScreenshot } from '../../src/components/FeedbackWidget/utils/screenshot'

// Mock html2canvas before importing the module
vi.mock('html2canvas', () => ({
  default: vi.fn(),
}))

describe('Screenshot Utility', () => {
  let mockCanvas: HTMLCanvasElement
  let mockBlob: Blob
  let captureRegion: (x: number, y: number, width: number, height: number) => Promise<Blob>
  let captureScreenshot: (x: number, y: number, width: number, height: number) => Promise<CapturedScreenshot>
  let releaseScreenshot: (screenshot: CapturedScreenshot) => void

  beforeEach(async () => {
    // Create mock blob
    mockBlob = new Blob(['test'], { type: 'image/png' })

    // Create mock canvas with toBlob
    mockCanvas = document.createElement('canvas')
    mockCanvas.toBlob = vi.fn((callback) => {
      callback(mockBlob)
    })

    // Mock html2canvas to return our mock canvas
    const html2canvas = await import('html2canvas')
    vi.mocked(html2canvas.default).mockResolvedValue(mockCanvas)

    // Mock URL.createObjectURL
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-url-123')
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {})

    // Import the module after mocks are set up
    const screenshot = await import('../../src/components/FeedbackWidget/utils/screenshot')
    captureRegion = screenshot.captureRegion
    captureScreenshot = screenshot.captureScreenshot
    releaseScreenshot = screenshot.releaseScreenshot
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.resetModules()
  })

  describe('CapturedScreenshot interface', () => {
    it('should have correct structure', async () => {
      const screenshot = await captureScreenshot(100, 100, 200, 200)

      expect(screenshot).toHaveProperty('id')
      expect(screenshot).toHaveProperty('blobUrl')
      expect(screenshot).toHaveProperty('region')
      expect(screenshot).toHaveProperty('capturedAt')
      expect(screenshot).toHaveProperty('sizeBytes')

      expect(screenshot.region).toHaveProperty('x')
      expect(screenshot.region).toHaveProperty('y')
      expect(screenshot.region).toHaveProperty('width')
      expect(screenshot.region).toHaveProperty('height')
    })

    it('should have string id', async () => {
      const screenshot = await captureScreenshot(100, 100, 200, 200)
      expect(typeof screenshot.id).toBe('string')
      expect(screenshot.id.startsWith('screenshot-')).toBe(true)
    })

    it('should have string blobUrl', async () => {
      const screenshot = await captureScreenshot(100, 100, 200, 200)
      expect(typeof screenshot.blobUrl).toBe('string')
    })

    it('should have number capturedAt timestamp', async () => {
      const beforeTime = Date.now()
      const screenshot = await captureScreenshot(100, 100, 200, 200)
      const afterTime = Date.now()

      expect(typeof screenshot.capturedAt).toBe('number')
      expect(screenshot.capturedAt).toBeGreaterThanOrEqual(beforeTime)
      expect(screenshot.capturedAt).toBeLessThanOrEqual(afterTime)
    })

    it('should have number sizeBytes', async () => {
      const screenshot = await captureScreenshot(100, 100, 200, 200)
      expect(typeof screenshot.sizeBytes).toBe('number')
      expect(screenshot.sizeBytes).toBeGreaterThan(0)
    })

    it('should store correct region coordinates', async () => {
      const screenshot = await captureScreenshot(50, 75, 300, 400)

      expect(screenshot.region.x).toBe(50)
      expect(screenshot.region.y).toBe(75)
      expect(screenshot.region.width).toBe(300)
      expect(screenshot.region.height).toBe(400)
    })
  })

  describe('captureRegion', () => {
    it('should throw error for selection smaller than 10x10 pixels', async () => {
      await expect(captureRegion(0, 0, 5, 5)).rejects.toThrow('Selection too small')
      await expect(captureRegion(0, 0, 9, 100)).rejects.toThrow('Selection too small')
      await expect(captureRegion(0, 0, 100, 9)).rejects.toThrow('Selection too small')
    })

    it('should accept 10x10 pixel selection', async () => {
      const result = await captureRegion(0, 0, 10, 10)
      expect(result).toBeInstanceOf(Blob)
    })

    it('should return a Blob', async () => {
      const result = await captureRegion(0, 0, 100, 100)
      expect(result).toBeInstanceOf(Blob)
    })

    it('should call html2canvas with useCORS true and logging false', async () => {
      await captureRegion(50, 50, 100, 100)

      const html2canvas = await import('html2canvas')
      expect(html2canvas.default).toHaveBeenCalledWith(
        document.body,
        expect.objectContaining({
          useCORS: true,
          logging: false,
        })
      )
    })

    it('should call html2canvas with correct region parameters', async () => {
      await captureRegion(100, 200, 300, 400)

      const html2canvas = await import('html2canvas')
      expect(html2canvas.default).toHaveBeenCalledWith(
        document.body,
        expect.objectContaining({
          x: 100,
          y: 200,
          width: 300,
          height: 400,
        })
      )
    })

    it('should scale down regions larger than 2000px', async () => {
      await captureRegion(0, 0, 4000, 1000)

      const html2canvas = await import('html2canvas')
      expect(html2canvas.default).toHaveBeenCalledWith(
        document.body,
        expect.objectContaining({
          scale: 0.5, // 2000/4000
        })
      )
    })

    it('should scale down height if it exceeds 2000px', async () => {
      await captureRegion(0, 0, 1000, 4000)

      const html2canvas = await import('html2canvas')
      expect(html2canvas.default).toHaveBeenCalledWith(
        document.body,
        expect.objectContaining({
          scale: 0.5, // 2000/4000
        })
      )
    })

    it('should use scale 1 for regions under 2000px', async () => {
      await captureRegion(0, 0, 500, 500)

      const html2canvas = await import('html2canvas')
      expect(html2canvas.default).toHaveBeenCalledWith(
        document.body,
        expect.objectContaining({
          scale: 1,
        })
      )
    })
  })

  describe('releaseScreenshot', () => {
    it('should call URL.revokeObjectURL with the blobUrl', async () => {
      const screenshot = await captureScreenshot(100, 100, 200, 200)
      releaseScreenshot(screenshot)

      expect(URL.revokeObjectURL).toHaveBeenCalledWith(screenshot.blobUrl)
    })
  })
})

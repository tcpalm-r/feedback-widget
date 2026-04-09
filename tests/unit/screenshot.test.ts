import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { CapturedScreenshot } from '../../src/components/FeedbackWidget/utils/screenshot'

// Mock modern-screenshot before importing the module
vi.mock('modern-screenshot', () => ({
  domToCanvas: vi.fn(),
}))

describe('Screenshot Utility', () => {
  let mockCanvas: HTMLCanvasElement
  let mockCroppedCanvas: HTMLCanvasElement
  let mockBlob: Blob
  let captureRegion: (x: number, y: number, width: number, height: number) => Promise<Blob>
  let captureScreenshot: (x: number, y: number, width: number, height: number) => Promise<CapturedScreenshot>
  let releaseScreenshot: (screenshot: CapturedScreenshot) => void

  beforeEach(async () => {
    // Create mock blob
    mockBlob = new Blob(['test'], { type: 'image/png' })

    // Create mock canvas returned by domToCanvas
    mockCanvas = document.createElement('canvas')

    // Create mock cropped canvas with toBlob
    mockCroppedCanvas = document.createElement('canvas')
    mockCroppedCanvas.toBlob = vi.fn((callback) => {
      callback(mockBlob)
    })

    // Mock document.createElement to return our mock cropped canvas
    const originalCreateElement = document.createElement.bind(document)
    vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      if (tag === 'canvas') return mockCroppedCanvas
      return originalCreateElement(tag)
    })

    // Mock the 2d context
    mockCroppedCanvas.getContext = vi.fn().mockReturnValue({
      drawImage: vi.fn(),
    })

    // Mock modern-screenshot to return our mock canvas
    const modernScreenshot = await import('modern-screenshot')
    vi.mocked(modernScreenshot.domToCanvas).mockResolvedValue(mockCanvas)

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
    it('should return a Blob', async () => {
      const result = await captureRegion(0, 0, 100, 100)
      expect(result).toBeInstanceOf(Blob)
    })

    it('should call domToCanvas with scale 1 for regions under 2000px', async () => {
      await captureRegion(0, 0, 500, 500)

      const modernScreenshot = await import('modern-screenshot')
      expect(modernScreenshot.domToCanvas).toHaveBeenCalledWith(
        document.body,
        expect.objectContaining({
          scale: 1,
        })
      )
    })

    it('should scale down regions larger than 2000px', async () => {
      await captureRegion(0, 0, 4000, 1000)

      const modernScreenshot = await import('modern-screenshot')
      expect(modernScreenshot.domToCanvas).toHaveBeenCalledWith(
        document.body,
        expect.objectContaining({
          scale: 0.5, // 2000/4000
        })
      )
    })

    it('should scale down height if it exceeds 2000px', async () => {
      await captureRegion(0, 0, 1000, 4000)

      const modernScreenshot = await import('modern-screenshot')
      expect(modernScreenshot.domToCanvas).toHaveBeenCalledWith(
        document.body,
        expect.objectContaining({
          scale: 0.5, // 2000/4000
        })
      )
    })

    it('should include a filter function that excludes feedback widget elements', async () => {
      await captureRegion(0, 0, 100, 100)

      const modernScreenshot = await import('modern-screenshot')
      const callArgs = vi.mocked(modernScreenshot.domToCanvas).mock.calls[0][1]
      expect(callArgs).toHaveProperty('filter')
      expect(typeof callArgs!.filter).toBe('function')
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

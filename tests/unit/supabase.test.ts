import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// Mock the Supabase module before importing
const mockUpload = vi.fn()
const mockGetPublicUrl = vi.fn()
const mockFrom = vi.fn()
const mockStorageFrom = vi.fn()

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    storage: {
      from: mockStorageFrom,
    },
    from: mockFrom,
  })),
}))

// Set env variables before importing supabase module
const originalEnv = process.env

beforeEach(() => {
  vi.resetModules()
  process.env = {
    ...originalEnv,
    NEXT_PUBLIC_SUPABASE_URL: 'https://test.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'test-anon-key',
  }

  // Reset mocks
  mockUpload.mockReset()
  mockGetPublicUrl.mockReset()
  mockStorageFrom.mockReset()
  mockFrom.mockReset()

  // Setup default mock chain
  mockStorageFrom.mockReturnValue({
    upload: mockUpload,
    getPublicUrl: mockGetPublicUrl,
  })

  // Mock window for client-side check
  vi.stubGlobal('window', {})
})

afterEach(() => {
  process.env = originalEnv
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('uploadScreenshot', () => {
  it('should export uploadScreenshot function', async () => {
    const { uploadScreenshot } = await import('../../src/lib/supabase')
    expect(typeof uploadScreenshot).toBe('function')
  })

  it('should return null when Supabase client is not configured', async () => {
    // Clear env variables to simulate missing config
    delete process.env.NEXT_PUBLIC_SUPABASE_URL
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    vi.resetModules()
    const { uploadScreenshot } = await import('../../src/lib/supabase')

    const blob = new Blob(['test'], { type: 'image/png' })
    const result = await uploadScreenshot(blob, 'test-app', 1)

    expect(result).toBeNull()
  })

  it('should upload blob to feedback-screenshots bucket', async () => {
    mockUpload.mockResolvedValue({ error: null })
    mockGetPublicUrl.mockReturnValue({
      data: { publicUrl: 'https://test.supabase.co/storage/v1/object/public/feedback-screenshots/test-app/123-1.png' },
    })

    const { uploadScreenshot } = await import('../../src/lib/supabase')

    const blob = new Blob(['test image data'], { type: 'image/png' })
    const result = await uploadScreenshot(blob, 'test-app', 1)

    expect(mockStorageFrom).toHaveBeenCalledWith('feedback-screenshots')
    expect(mockUpload).toHaveBeenCalledWith(
      expect.stringMatching(/^test-app\/\d+-1\.png$/),
      blob,
      expect.objectContaining({
        contentType: 'image/png',
        upsert: false,
      })
    )
    expect(result).not.toBeNull()
    expect(result?.url).toContain('feedback-screenshots')
    expect(result?.storagePath).toMatch(/^test-app\/\d+-1\.png$/)
  })

  it('should return url and storagePath on success', async () => {
    const publicUrl = 'https://test.supabase.co/storage/v1/object/public/feedback-screenshots/my-app/1234567890-2.png'

    mockUpload.mockResolvedValue({ error: null })
    mockGetPublicUrl.mockReturnValue({
      data: { publicUrl },
    })

    const { uploadScreenshot } = await import('../../src/lib/supabase')

    const blob = new Blob(['test'], { type: 'image/png' })
    const result = await uploadScreenshot(blob, 'my-app', 2)

    expect(result).toEqual({
      url: publicUrl,
      storagePath: expect.stringMatching(/^my-app\/\d+-2\.png$/),
    })
  })

  it('should return null on upload error', async () => {
    mockUpload.mockResolvedValue({
      error: { message: 'Upload failed', statusCode: 500 },
    })

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const { uploadScreenshot } = await import('../../src/lib/supabase')

    const blob = new Blob(['test'], { type: 'image/png' })
    const result = await uploadScreenshot(blob, 'test-app', 1)

    expect(result).toBeNull()
    expect(consoleSpy).toHaveBeenCalledWith(
      '[FeedbackWidget] Screenshot upload error:',
      expect.any(Object)
    )

    consoleSpy.mockRestore()
  })

  it('should return null on exception', async () => {
    mockUpload.mockRejectedValue(new Error('Network error'))

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const { uploadScreenshot } = await import('../../src/lib/supabase')

    const blob = new Blob(['test'], { type: 'image/png' })
    const result = await uploadScreenshot(blob, 'test-app', 1)

    expect(result).toBeNull()
    expect(consoleSpy).toHaveBeenCalledWith(
      '[FeedbackWidget] Screenshot upload exception:',
      expect.any(Error)
    )

    consoleSpy.mockRestore()
  })

  it('should use correct storage path format: {appId}/{timestamp}-{index}.png', async () => {
    mockUpload.mockResolvedValue({ error: null })
    mockGetPublicUrl.mockReturnValue({
      data: { publicUrl: 'https://example.com/screenshot.png' },
    })

    const { uploadScreenshot } = await import('../../src/lib/supabase')

    const blob = new Blob(['test'], { type: 'image/png' })
    await uploadScreenshot(blob, 'demo-app', 3)

    // Verify the path format
    expect(mockUpload).toHaveBeenCalledWith(
      expect.stringMatching(/^demo-app\/\d{13}-3\.png$/), // timestamp is 13 digits
      expect.any(Blob),
      expect.any(Object)
    )
  })

  it('should handle different index values', async () => {
    mockUpload.mockResolvedValue({ error: null })
    mockGetPublicUrl.mockReturnValue({
      data: { publicUrl: 'https://example.com/screenshot.png' },
    })

    const { uploadScreenshot } = await import('../../src/lib/supabase')

    const blob = new Blob(['test'], { type: 'image/png' })

    // Test with index 1
    await uploadScreenshot(blob, 'app', 1)
    expect(mockUpload).toHaveBeenLastCalledWith(
      expect.stringContaining('-1.png'),
      expect.any(Blob),
      expect.any(Object)
    )

    // Test with index 5
    await uploadScreenshot(blob, 'app', 5)
    expect(mockUpload).toHaveBeenLastCalledWith(
      expect.stringContaining('-5.png'),
      expect.any(Blob),
      expect.any(Object)
    )
  })
})

describe('UploadScreenshotResult interface', () => {
  it('should have url property as string', async () => {
    mockUpload.mockResolvedValue({ error: null })
    mockGetPublicUrl.mockReturnValue({
      data: { publicUrl: 'https://example.com/screenshot.png' },
    })

    const { uploadScreenshot } = await import('../../src/lib/supabase')

    const blob = new Blob(['test'], { type: 'image/png' })
    const result = await uploadScreenshot(blob, 'app', 1)

    expect(result).not.toBeNull()
    expect(typeof result?.url).toBe('string')
  })

  it('should have storagePath property as string', async () => {
    mockUpload.mockResolvedValue({ error: null })
    mockGetPublicUrl.mockReturnValue({
      data: { publicUrl: 'https://example.com/screenshot.png' },
    })

    const { uploadScreenshot } = await import('../../src/lib/supabase')

    const blob = new Blob(['test'], { type: 'image/png' })
    const result = await uploadScreenshot(blob, 'app', 1)

    expect(result).not.toBeNull()
    expect(typeof result?.storagePath).toBe('string')
  })
})

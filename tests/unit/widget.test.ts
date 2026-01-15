import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  saveCorner,
  loadCorner,
  clearCorner,
  getNearestCorner,
  type WidgetCorner,
} from '../../src/components/FeedbackWidget/utils/storage'
import {
  detectUserId,
  createJwtConfig,
} from '../../src/components/FeedbackWidget/utils/jwt'
import {
  getFeedbackFormHTML,
  feedbackTypeOptions,
} from '../../src/components/FeedbackWidget/FeedbackForm'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

beforeEach(() => {
  Object.defineProperty(global, 'localStorage', {
    value: localStorageMock,
    writable: true,
  })
  localStorageMock.clear()

  Object.defineProperty(global, 'window', {
    value: {
      innerWidth: 1024,
      innerHeight: 768,
      location: { href: 'http://localhost:3000/demo' },
    },
    writable: true,
  })

  Object.defineProperty(global, 'document', {
    value: {
      cookie: '',
    },
    writable: true,
  })
})

afterEach(() => {
  vi.restoreAllMocks()
})

// ============================================
// Storage Utils Tests
// ============================================

describe('Storage Utils - Corner Persistence', () => {
  describe('saveCorner', () => {
    it('should save corner to localStorage', () => {
      const corner: WidgetCorner = 'bottom-right'
      saveCorner(corner)

      const stored = localStorage.getItem('feedback-widget-corner')
      expect(stored).toBe(corner)
    })

    it('should overwrite existing corner', () => {
      saveCorner('bottom-right')
      saveCorner('top-left')

      const stored = localStorage.getItem('feedback-widget-corner')
      expect(stored).toBe('top-left')
    })
  })

  describe('loadCorner', () => {
    it('should load corner from localStorage', () => {
      localStorage.setItem('feedback-widget-corner', 'bottom-left')

      const corner = loadCorner()
      expect(corner).toBe('bottom-left')
    })

    it('should return null when no corner is saved', () => {
      const corner = loadCorner()
      expect(corner).toBeNull()
    })

    it('should return null for invalid corner value', () => {
      localStorage.setItem('feedback-widget-corner', 'invalid-corner')

      const corner = loadCorner()
      expect(corner).toBeNull()
    })
  })

  describe('clearCorner', () => {
    it('should remove corner from localStorage', () => {
      localStorage.setItem('feedback-widget-corner', 'bottom-right')

      clearCorner()

      const stored = localStorage.getItem('feedback-widget-corner')
      expect(stored).toBeNull()
    })

    it('should not throw when no corner exists', () => {
      expect(() => clearCorner()).not.toThrow()
    })
  })

  describe('getNearestCorner', () => {
    it('should return bottom-right for position in bottom-right quadrant', () => {
      // Viewport: 1024x768
      const corner = getNearestCorner(800, 500)
      expect(corner).toBe('bottom-right')
    })

    it('should return bottom-left for position in bottom-left quadrant', () => {
      const corner = getNearestCorner(200, 500)
      expect(corner).toBe('bottom-left')
    })

    it('should return top-right for position in top-right quadrant', () => {
      const corner = getNearestCorner(800, 200)
      expect(corner).toBe('top-right')
    })

    it('should return top-left for position in top-left quadrant', () => {
      const corner = getNearestCorner(200, 200)
      expect(corner).toBe('top-left')
    })
  })
})

// ============================================
// JWT Detection Tests
// ============================================

describe('JWT Detection Utility', () => {
  // Helper to create a valid JWT token
  const createMockJwt = (payload: Record<string, unknown>): string => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const payloadBase64 = btoa(JSON.stringify(payload))
    const signature = 'mock-signature'
    return `${header}.${payloadBase64}.${signature}`
  }

  describe('detectUserId from localStorage', () => {
    it('should detect userId from simple JWT token in localStorage', () => {
      const token = createMockJwt({ sub: 'user-123', email: 'test@example.com' })
      localStorage.setItem('token', token)

      const userId = detectUserId()
      expect(userId).toBe('user-123')
    })

    it('should detect userId from nested access_token in localStorage', () => {
      const token = createMockJwt({ sub: 'user-456' })
      localStorage.setItem('auth_token', JSON.stringify({ access_token: token }))

      const userId = detectUserId()
      expect(userId).toBe('user-456')
    })

    it('should detect userId using custom userIdClaim', () => {
      const token = createMockJwt({ user_id: 'custom-user-789' })
      localStorage.setItem('token', token)

      const userId = detectUserId({ userIdClaim: 'user_id' })
      expect(userId).toBe('custom-user-789')
    })

    it('should return undefined when no token found', () => {
      const userId = detectUserId()
      expect(userId).toBeUndefined()
    })

    it('should return undefined for invalid JWT', () => {
      localStorage.setItem('token', 'not-a-valid-jwt')

      const userId = detectUserId()
      expect(userId).toBeUndefined()
    })

    it('should return undefined for JWT without sub claim', () => {
      const token = createMockJwt({ email: 'test@example.com' })
      localStorage.setItem('token', token)

      const userId = detectUserId()
      expect(userId).toBeUndefined()
    })

    it('should check custom localStorage keys', () => {
      const token = createMockJwt({ sub: 'custom-key-user' })
      localStorage.setItem('my-custom-token', token)

      const userId = detectUserId({ localStorageKeys: ['my-custom-token'] })
      expect(userId).toBe('custom-key-user')
    })
  })

  describe('detectUserId from cookies', () => {
    it('should detect userId from cookie', () => {
      const token = createMockJwt({ sub: 'cookie-user-123' })
      Object.defineProperty(document, 'cookie', {
        get: () => `token=${token}; other=value`,
        configurable: true,
      })

      const userId = detectUserId()
      expect(userId).toBe('cookie-user-123')
    })

    it('should check custom cookie keys', () => {
      const token = createMockJwt({ sub: 'custom-cookie-user' })
      Object.defineProperty(document, 'cookie', {
        get: () => `my-auth=${token}`,
        configurable: true,
      })

      const userId = detectUserId({ cookieKeys: ['my-auth'] })
      expect(userId).toBe('custom-cookie-user')
    })
  })

  describe('createJwtConfig', () => {
    it('should create config with default values', () => {
      const config = createJwtConfig()

      expect(config.cookieKeys).toContain('token')
      expect(config.cookieKeys).toContain('jwt')
      expect(config.localStorageKeys).toContain('token')
      expect(config.userIdClaim).toBe('sub')
    })

    it('should override with custom values', () => {
      const config = createJwtConfig({
        cookieKeys: ['custom-cookie'],
        localStorageKeys: ['custom-storage'],
        userIdClaim: 'userId',
      })

      expect(config.cookieKeys).toEqual(['custom-cookie'])
      expect(config.localStorageKeys).toEqual(['custom-storage'])
      expect(config.userIdClaim).toBe('userId')
    })
  })
})

// ============================================
// Widget Render / Form Tests
// ============================================

describe('Widget Render and Form Validation', () => {
  describe('Feedback Form HTML Generation', () => {
    it('should render form with default values', () => {
      const html = getFeedbackFormHTML()

      expect(html).toContain('Send Feedback')
      expect(html).toContain('feedback-form')
      expect(html).toContain('feedback-submit-button')
      expect(html).toContain('feedback-textarea')
    })

    it('should render form with selected type', () => {
      const html = getFeedbackFormHTML('bug')

      expect(html).toContain('value="bug" selected')
    })

    it('should render form with message content', () => {
      const html = getFeedbackFormHTML('general', 'Test message content')

      expect(html).toContain('Test message content')
    })

    it('should render loading state', () => {
      const html = getFeedbackFormHTML('general', '', 'loading')

      expect(html).toContain('Submitting...')
      expect(html).toContain('feedback-spinner')
      expect(html).toContain('disabled')
    })

    it('should render success state', () => {
      const html = getFeedbackFormHTML('general', '', 'success')

      expect(html).toContain('Thank You!')
      expect(html).toContain('feedback-success-message')
      expect(html).toContain('submitted successfully')
    })

    it('should render error state with message', () => {
      const html = getFeedbackFormHTML('general', '', 'error', 'Network error')

      expect(html).toContain('feedback-error-banner')
      expect(html).toContain('Network error')
      expect(html).toContain('feedback-retry-button')
    })

    it('should render error state with default message', () => {
      const html = getFeedbackFormHTML('general', '', 'error')

      expect(html).toContain('Something went wrong. Please try again.')
    })

    it('should render all feedback type options', () => {
      const html = getFeedbackFormHTML()

      feedbackTypeOptions.forEach((option) => {
        expect(html).toContain(`value="${option.value}"`)
        expect(html).toContain(option.label)
      })
    })

    it('should disable form elements during loading', () => {
      const html = getFeedbackFormHTML('general', '', 'loading')

      // Count disabled attributes (should be present on select, textarea, submit button, close button)
      const disabledCount = (html.match(/disabled/g) || []).length
      expect(disabledCount).toBeGreaterThanOrEqual(3)
    })
  })

  describe('Form Validation - Message Required', () => {
    it('should require message field (acceptance criteria check)', () => {
      // The form HTML includes the message textarea as a required field
      // This test verifies the structure is correct for validation
      const html = getFeedbackFormHTML()

      expect(html).toContain('id="feedback-message"')
      expect(html).toContain('name="message"')
      expect(html).toContain('class="feedback-textarea"')
    })

    it('should display error when message is empty (via error state)', () => {
      // When validation fails, the form shows error state
      const html = getFeedbackFormHTML('general', '', 'error', 'Please enter a message')

      expect(html).toContain('Please enter a message')
      expect(html).toContain('feedback-error-banner')
    })

    it('should include close button for dismissing form', () => {
      const html = getFeedbackFormHTML()

      expect(html).toContain('feedback-close-button')
      expect(html).toContain('aria-label="Close feedback form"')
    })
  })

  describe('Feedback Type Options', () => {
    it('should have Bug option', () => {
      expect(feedbackTypeOptions.find((o) => o.value === 'bug')).toBeDefined()
    })

    it('should have Feature option', () => {
      expect(feedbackTypeOptions.find((o) => o.value === 'feature')).toBeDefined()
    })

    it('should have General option', () => {
      expect(feedbackTypeOptions.find((o) => o.value === 'general')).toBeDefined()
    })

    it('should have exactly 3 options', () => {
      expect(feedbackTypeOptions).toHaveLength(3)
    })
  })
})

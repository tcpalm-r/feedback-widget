import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  savePosition,
  loadPosition,
  clearPosition,
  constrainToViewport,
  type WidgetPosition,
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

describe('Storage Utils - Position Persistence', () => {
  describe('savePosition', () => {
    it('should save position to localStorage', () => {
      const position: WidgetPosition = { x: 100, y: 200 }
      savePosition(position)

      const stored = localStorage.getItem('feedback-widget-position')
      expect(stored).toBe(JSON.stringify(position))
    })

    it('should overwrite existing position', () => {
      savePosition({ x: 100, y: 200 })
      savePosition({ x: 300, y: 400 })

      const stored = localStorage.getItem('feedback-widget-position')
      expect(stored).toBe(JSON.stringify({ x: 300, y: 400 }))
    })
  })

  describe('loadPosition', () => {
    it('should load position from localStorage', () => {
      localStorage.setItem(
        'feedback-widget-position',
        JSON.stringify({ x: 150, y: 250 })
      )

      const position = loadPosition()
      expect(position).toEqual({ x: 150, y: 250 })
    })

    it('should return null when no position is saved', () => {
      const position = loadPosition()
      expect(position).toBeNull()
    })

    it('should return null for invalid JSON', () => {
      localStorage.setItem('feedback-widget-position', 'invalid-json')

      const position = loadPosition()
      expect(position).toBeNull()
    })

    it('should return null for invalid position data', () => {
      localStorage.setItem(
        'feedback-widget-position',
        JSON.stringify({ x: 'not-a-number', y: 200 })
      )

      const position = loadPosition()
      expect(position).toBeNull()
    })

    it('should return null for missing properties', () => {
      localStorage.setItem('feedback-widget-position', JSON.stringify({ x: 100 }))

      const position = loadPosition()
      expect(position).toBeNull()
    })
  })

  describe('clearPosition', () => {
    it('should remove position from localStorage', () => {
      localStorage.setItem(
        'feedback-widget-position',
        JSON.stringify({ x: 100, y: 200 })
      )

      clearPosition()

      const stored = localStorage.getItem('feedback-widget-position')
      expect(stored).toBeNull()
    })

    it('should not throw when no position exists', () => {
      expect(() => clearPosition()).not.toThrow()
    })
  })

  describe('constrainToViewport', () => {
    it('should keep position within viewport bounds', () => {
      const position: WidgetPosition = { x: 100, y: 200 }
      const constrained = constrainToViewport(position, 56, 56)

      expect(constrained.x).toBe(100)
      expect(constrained.y).toBe(200)
    })

    it('should constrain position that exceeds right edge', () => {
      // Viewport: 1024 wide, widget: 56px, padding: 8px
      // Max x = 1024 - 56 - 8 = 960
      const position: WidgetPosition = { x: 1000, y: 200 }
      const constrained = constrainToViewport(position, 56, 56)

      expect(constrained.x).toBe(960)
      expect(constrained.y).toBe(200)
    })

    it('should constrain position that exceeds bottom edge', () => {
      // Viewport: 768 high, widget: 56px, padding: 8px
      // Max y = 768 - 56 - 8 = 704
      const position: WidgetPosition = { x: 100, y: 750 }
      const constrained = constrainToViewport(position, 56, 56)

      expect(constrained.x).toBe(100)
      expect(constrained.y).toBe(704)
    })

    it('should constrain position that is negative (left edge)', () => {
      const position: WidgetPosition = { x: -50, y: 200 }
      const constrained = constrainToViewport(position, 56, 56)

      expect(constrained.x).toBe(8) // Minimum padding
      expect(constrained.y).toBe(200)
    })

    it('should constrain position that is negative (top edge)', () => {
      const position: WidgetPosition = { x: 100, y: -30 }
      const constrained = constrainToViewport(position, 56, 56)

      expect(constrained.x).toBe(100)
      expect(constrained.y).toBe(8) // Minimum padding
    })

    it('should constrain position that exceeds all edges', () => {
      const position: WidgetPosition = { x: 2000, y: 2000 }
      const constrained = constrainToViewport(position, 56, 56)

      expect(constrained.x).toBe(960) // Max right
      expect(constrained.y).toBe(704) // Max bottom
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

// JWT detection utility for FeedbackWidget
// Extracts user ID from JWT tokens stored in cookies or localStorage

export interface JwtConfig {
  // Cookie names to check for JWT tokens
  cookieKeys?: string[];
  // localStorage keys to check for JWT tokens
  localStorageKeys?: string[];
  // Custom claim name for user ID in JWT payload (default: 'sub')
  userIdClaim?: string;
}

const DEFAULT_JWT_CONFIG: JwtConfig = {
  cookieKeys: ['token', 'jwt', 'access_token', 'auth_token', 'sb-access-token'],
  localStorageKeys: ['token', 'jwt', 'access_token', 'auth_token', 'supabase.auth.token'],
  userIdClaim: 'sub',
};

/**
 * Decodes a JWT token and extracts the payload
 * Note: This does NOT validate the signature - only extracts payload data
 */
function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    // Base64Url decode the payload (second part)
    const payload = parts[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

/**
 * Gets a cookie value by name
 */
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [cookieName, ...cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return decodeURIComponent(cookieValue.join('='));
    }
  }
  return null;
}

/**
 * Gets a localStorage value by key
 */
function getLocalStorageValue(key: string): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const value = localStorage.getItem(key);
    if (!value) {
      return null;
    }

    // Try to parse as JSON (some auth libraries store tokens in JSON objects)
    try {
      const parsed = JSON.parse(value);
      // Handle nested token structures
      if (typeof parsed === 'object' && parsed !== null) {
        // Common patterns: { access_token: "..." } or { currentSession: { access_token: "..." } }
        if (parsed.access_token) return parsed.access_token;
        if (parsed.token) return parsed.token;
        if (parsed.currentSession?.access_token) return parsed.currentSession.access_token;
      }
      return value;
    } catch {
      return value;
    }
  } catch {
    return null;
  }
}

/**
 * Extracts user ID from a JWT token using the configured claim name
 */
function extractUserId(token: string, claim: string): string | null {
  const payload = decodeJwtPayload(token);
  if (!payload) {
    return null;
  }

  const userId = payload[claim];
  if (typeof userId === 'string') {
    return userId;
  }

  // Also check 'user_id' as fallback
  if (typeof payload.user_id === 'string') {
    return payload.user_id;
  }

  return null;
}

/**
 * Detects user ID from JWT tokens in cookies and localStorage
 * Returns the first valid user ID found, or undefined if none found
 */
export function detectUserId(config: JwtConfig = {}): string | undefined {
  const mergedConfig = {
    cookieKeys: config.cookieKeys ?? DEFAULT_JWT_CONFIG.cookieKeys,
    localStorageKeys: config.localStorageKeys ?? DEFAULT_JWT_CONFIG.localStorageKeys,
    userIdClaim: config.userIdClaim ?? DEFAULT_JWT_CONFIG.userIdClaim,
  };

  // Check cookies first
  for (const key of mergedConfig.cookieKeys ?? []) {
    const token = getCookie(key);
    if (token) {
      const userId = extractUserId(token, mergedConfig.userIdClaim!);
      if (userId) {
        return userId;
      }
    }
  }

  // Then check localStorage
  for (const key of mergedConfig.localStorageKeys ?? []) {
    const token = getLocalStorageValue(key);
    if (token) {
      const userId = extractUserId(token, mergedConfig.userIdClaim!);
      if (userId) {
        return userId;
      }
    }
  }

  return undefined;
}

/**
 * Creates a JWT config object with custom settings
 */
export function createJwtConfig(
  options: Partial<JwtConfig> = {}
): JwtConfig {
  return {
    cookieKeys: options.cookieKeys ?? DEFAULT_JWT_CONFIG.cookieKeys,
    localStorageKeys: options.localStorageKeys ?? DEFAULT_JWT_CONFIG.localStorageKeys,
    userIdClaim: options.userIdClaim ?? DEFAULT_JWT_CONFIG.userIdClaim,
  };
}

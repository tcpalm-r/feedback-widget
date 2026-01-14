// Configuration store for FeedbackWidget
// Allows host applications to configure the widget via FeedbackWidget.init()

import { JwtConfig } from './jwt';

export type WidgetPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

export interface FeedbackWidgetConfig {
  // Required: Unique identifier for the application
  appId: string;
  // Optional: Initial position of the widget (default: 'bottom-right')
  position?: WidgetPosition;
  // Optional: JWT detection configuration
  jwtConfig?: JwtConfig;
}

// Internal state
let widgetConfig: FeedbackWidgetConfig | null = null;
let isInitialized = false;

/**
 * Validates the configuration object
 * Throws an error if required fields are missing or invalid
 */
function validateConfig(config: unknown): asserts config is FeedbackWidgetConfig {
  if (!config || typeof config !== 'object') {
    throw new Error('FeedbackWidget.init() requires a configuration object');
  }

  const configObj = config as Record<string, unknown>;

  // appId is required
  if (!configObj.appId) {
    throw new Error('FeedbackWidget.init() requires appId to be specified');
  }

  if (typeof configObj.appId !== 'string') {
    throw new Error('FeedbackWidget.init() appId must be a string');
  }

  if (configObj.appId.trim() === '') {
    throw new Error('FeedbackWidget.init() appId cannot be empty');
  }

  // Validate position if provided
  if (configObj.position !== undefined) {
    const validPositions: WidgetPosition[] = ['bottom-right', 'bottom-left', 'top-right', 'top-left'];
    if (!validPositions.includes(configObj.position as WidgetPosition)) {
      throw new Error(
        `FeedbackWidget.init() position must be one of: ${validPositions.join(', ')}`
      );
    }
  }

  // Validate jwtConfig if provided
  if (configObj.jwtConfig !== undefined && typeof configObj.jwtConfig !== 'object') {
    throw new Error('FeedbackWidget.init() jwtConfig must be an object');
  }
}

/**
 * Initialize the FeedbackWidget with configuration
 * Must be called before rendering the widget
 *
 * @param config - Configuration object with appId (required), position (optional), jwtConfig (optional)
 * @throws Error if appId is missing or config is invalid
 *
 * @example
 * ```ts
 * FeedbackWidget.init({
 *   appId: 'my-app',
 *   position: 'bottom-right',
 *   jwtConfig: {
 *     cookieKeys: ['my_token'],
 *     userIdClaim: 'user_id'
 *   }
 * });
 * ```
 */
export function initConfig(config: FeedbackWidgetConfig): void {
  validateConfig(config);

  widgetConfig = {
    appId: config.appId,
    position: config.position ?? 'bottom-right',
    jwtConfig: config.jwtConfig,
  };

  isInitialized = true;
}

/**
 * Get the current widget configuration
 * Returns null if init() hasn't been called
 */
export function getConfig(): FeedbackWidgetConfig | null {
  return widgetConfig;
}

/**
 * Check if the widget has been initialized
 */
export function isWidgetInitialized(): boolean {
  return isInitialized;
}

/**
 * Reset the configuration (mainly for testing)
 */
export function resetConfig(): void {
  widgetConfig = null;
  isInitialized = false;
}

// Main component export
export { FeedbackWidget, default } from './components/FeedbackWidget';
export type { FeedbackWidgetProps } from './components/FeedbackWidget';

// Config types
export type {
  FeedbackWidgetConfig,
  WidgetPosition,
  WidgetEnv,
} from './components/FeedbackWidget/utils/config';

export type { JwtConfig } from './components/FeedbackWidget/utils/jwt';

// API utilities (for custom integrations)
export {
  submitFeedback,
  uploadScreenshot,
} from './lib/feedbackApi';

export type {
  FeedbackSubmission,
  FeedbackMetadata,
  SubmitFeedbackResult,
  UploadScreenshotResult,
} from './lib/feedbackApi';

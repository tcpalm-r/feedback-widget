// FeedbackForm - Generates form HTML for Shadow DOM
// This exports functions that return HTML strings since the widget uses Shadow DOM

import { getSelectOnScreenButtonHTML } from './SelectionMode';
import { getElementListBadgeHTML } from './ElementList';
import { getScreenshotListBadgeHTML } from './ScreenshotList';
import { SelectedElementData } from './utils/elements';
import { CapturedScreenshot } from './utils/screenshot';

// X icon SVG for close button (from Lucide)
const XIcon = `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  </svg>
`;

// Check icon SVG for success state (from Lucide)
const CheckIcon = `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6 9 17l-5-5"></path>
  </svg>
`;

// Alert circle icon SVG for error state (from Lucide)
const AlertCircleIcon = `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
`;

// Loader icon SVG for loading state (from Lucide)
const LoaderIcon = `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="feedback-spinner">
    <line x1="12" y1="2" x2="12" y2="6"></line>
    <line x1="12" y1="18" x2="12" y2="22"></line>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
    <line x1="2" y1="12" x2="6" y2="12"></line>
    <line x1="18" y1="12" x2="22" y2="12"></line>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
  </svg>
`;

export type FeedbackType = 'bug' | 'feature' | 'general';

export type SubmissionState = 'idle' | 'loading' | 'success' | 'error';

export interface FeedbackFormData {
  type: FeedbackType;
  message: string;
}

export const feedbackTypeOptions: { value: FeedbackType; label: string }[] = [
  { value: 'bug', label: 'Bug' },
  { value: 'feature', label: 'Feature' },
  { value: 'general', label: 'General' },
];

export function getFeedbackFormHTML(
  selectedType: FeedbackType = 'general',
  message: string = '',
  submissionState: SubmissionState = 'idle',
  errorMessage: string = '',
  selectedElements: SelectedElementData[] = [],
  isElementListExpanded: boolean = false,
  isNetworkError: boolean = false,
  capturedScreenshots: CapturedScreenshot[] = [],
  isScreenshotListExpanded: boolean = false
): string {
  const typeOptions = feedbackTypeOptions
    .map(
      (opt) =>
        `<option value="${opt.value}" ${opt.value === selectedType ? 'selected' : ''}>${opt.label}</option>`
    )
    .join('');

  const isLoading = submissionState === 'loading';
  const isDisabled = isLoading;

  // Success state - show success message
  if (submissionState === 'success') {
    return `
      <div class="feedback-form">
        <div class="feedback-form-header">
          <h3 class="feedback-form-title">Thank You!</h3>
          <button
            class="feedback-close-button"
            aria-label="Close feedback form"
            type="button"
          >
            ${XIcon}
          </button>
        </div>
        <div class="feedback-success-body">
          <div class="feedback-success-icon">${CheckIcon}</div>
          <p class="feedback-success-message">Your feedback has been submitted successfully.</p>
        </div>
      </div>
    `;
  }

  return `
    <div class="feedback-form">
      <div class="feedback-form-header">
        <h3 class="feedback-form-title">Send Feedback</h3>
        <button
          class="feedback-close-button"
          aria-label="Close feedback form"
          type="button"
          ${isDisabled ? 'disabled' : ''}
        >
          ${XIcon}
        </button>
      </div>

      <form class="feedback-form-body">
        ${submissionState === 'error' ? `
          <div class="feedback-error-banner">
            <span class="feedback-error-icon">${AlertCircleIcon}</span>
            <span class="feedback-error-text">${errorMessage || 'Something went wrong. Please try again.'}</span>
            <button type="button" class="feedback-retry-button">${isNetworkError ? 'Retry' : 'Try Again'}</button>
          </div>
        ` : ''}

        <div class="feedback-form-field">
          <label for="feedback-type" class="feedback-label">Type</label>
          <select id="feedback-type" name="type" class="feedback-select" ${isDisabled ? 'disabled' : ''}>
            ${typeOptions}
          </select>
        </div>

        <div class="feedback-form-field">
          <label for="feedback-message" class="feedback-label">Message</label>
          <textarea
            id="feedback-message"
            name="message"
            class="feedback-textarea"
            placeholder="Tell us what's on your mind..."
            rows="1"
            ${isDisabled ? 'disabled' : ''}
          >${message}</textarea>
        </div>

        ${getSelectOnScreenButtonHTML(isDisabled)}

        ${getElementListBadgeHTML(selectedElements, isElementListExpanded)}

        ${getScreenshotListBadgeHTML(capturedScreenshots, isScreenshotListExpanded)}

        <button type="submit" class="feedback-submit-button" ${isDisabled ? 'disabled' : ''}>
          ${isLoading ? `${LoaderIcon} Submitting...` : 'Submit'}
        </button>
      </form>
    </div>
  `;
}

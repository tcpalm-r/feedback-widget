// FeedbackForm - Generates form HTML for Shadow DOM
// This exports functions that return HTML strings since the widget uses Shadow DOM

// X icon SVG for close button (from Lucide)
const XIcon = `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  </svg>
`;

export type FeedbackType = 'bug' | 'feature' | 'general';

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
  message: string = ''
): string {
  const typeOptions = feedbackTypeOptions
    .map(
      (opt) =>
        `<option value="${opt.value}" ${opt.value === selectedType ? 'selected' : ''}>${opt.label}</option>`
    )
    .join('');

  return `
    <div class="feedback-form">
      <div class="feedback-form-header">
        <h3 class="feedback-form-title">Send Feedback</h3>
        <button
          class="feedback-close-button"
          aria-label="Close feedback form"
          type="button"
        >
          ${XIcon}
        </button>
      </div>

      <form class="feedback-form-body">
        <div class="feedback-form-field">
          <label for="feedback-type" class="feedback-label">Type</label>
          <select id="feedback-type" name="type" class="feedback-select">
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
            rows="4"
          >${message}</textarea>
        </div>

        <button type="submit" class="feedback-submit-button">
          Submit
        </button>
      </form>
    </div>
  `;
}

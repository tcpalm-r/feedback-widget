// FeedbackWidget Styles
// Colors sourced from brand guidelines (sonance-brand)
export const colors = {
  primary: '#6366f1', // Indigo - main brand color
  primaryHover: '#4f46e5', // Darker indigo on hover
  primaryLight: '#818cf8', // Lighter indigo for accents
  background: '#ffffff',
  backgroundDark: '#1f2937',
  text: '#ffffff',
  textDark: '#111827',
  border: '#e5e7eb',
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.25)',
};

export const getWidgetStyles = (): string => `
  :host {
    all: initial;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  .feedback-widget-container {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 999999;
    font-family: inherit;
  }

  .feedback-widget-container.draggable {
    bottom: auto;
    right: auto;
  }

  .feedback-widget-container.top-right {
    top: 24px;
    bottom: auto;
    right: 24px;
  }

  .feedback-widget-container.top-left {
    top: 24px;
    bottom: auto;
    left: 24px;
    right: auto;
  }

  .feedback-widget-container.bottom-left {
    bottom: 24px;
    left: 24px;
    right: auto;
  }

  .feedback-button {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: ${colors.primary};
    border: none;
    cursor: grab;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px ${colors.shadowDark};
    transition: all 0.2s ease-in-out;
    position: relative;
    user-select: none;
    -webkit-user-select: none;
  }

  .feedback-button.dragging {
    cursor: grabbing;
  }

  .feedback-button:hover {
    background-color: ${colors.primaryHover};
    transform: scale(1.05);
    box-shadow: 0 6px 16px ${colors.shadowDark};
  }

  .feedback-button:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${colors.primaryLight}, 0 4px 12px ${colors.shadowDark};
  }

  .feedback-button:active {
    transform: scale(0.98);
  }

  .feedback-button svg {
    width: 24px;
    height: 24px;
    color: ${colors.text};
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .feedback-tooltip {
    position: absolute;
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-right: 12px;
    background-color: ${colors.backgroundDark};
    color: ${colors.text};
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
    pointer-events: none;
  }

  .feedback-tooltip::after {
    content: '';
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    border: 6px solid transparent;
    border-left-color: ${colors.backgroundDark};
  }

  .feedback-button:hover + .feedback-tooltip,
  .feedback-button:focus + .feedback-tooltip {
    opacity: 1;
    visibility: visible;
  }

  .feedback-button-wrapper {
    position: relative;
    display: inline-block;
  }

  /* Form Panel Styles */
  .feedback-form {
    background-color: ${colors.background};
    border-radius: 12px;
    box-shadow: 0 10px 40px ${colors.shadowDark}, 0 0 0 1px ${colors.border};
    width: 320px;
    overflow: hidden;
    animation: feedbackFormSlideIn 0.2s ease-out;
  }

  @keyframes feedbackFormSlideIn {
    from {
      opacity: 0;
      transform: translateY(10px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .feedback-form-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 16px 12px;
    border-bottom: 1px solid ${colors.border};
  }

  .feedback-form-title {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: ${colors.textDark};
  }

  .feedback-close-button {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b7280;
    transition: all 0.15s ease;
  }

  .feedback-close-button:hover {
    background-color: #f3f4f6;
    color: ${colors.textDark};
  }

  .feedback-close-button:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${colors.primaryLight};
  }

  .feedback-close-button svg {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .feedback-form-body {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .feedback-form-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .feedback-label {
    font-size: 14px;
    font-weight: 500;
    color: ${colors.textDark};
  }

  .feedback-select {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid ${colors.border};
    border-radius: 8px;
    font-size: 14px;
    color: ${colors.textDark};
    background-color: ${colors.background};
    cursor: pointer;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 36px;
  }

  .feedback-select:hover {
    border-color: #9ca3af;
  }

  .feedback-select:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  .feedback-textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid ${colors.border};
    border-radius: 8px;
    font-size: 14px;
    color: ${colors.textDark};
    background-color: ${colors.background};
    resize: vertical;
    min-height: 100px;
    font-family: inherit;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }

  .feedback-textarea::placeholder {
    color: #9ca3af;
  }

  .feedback-textarea:hover {
    border-color: #9ca3af;
  }

  .feedback-textarea:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  .feedback-submit-button {
    width: 100%;
    padding: 12px 16px;
    background-color: ${colors.primary};
    color: ${colors.text};
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.15s ease, transform 0.1s ease;
  }

  .feedback-submit-button:hover {
    background-color: ${colors.primaryHover};
  }

  .feedback-submit-button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
  }

  .feedback-submit-button:active {
    transform: scale(0.98);
  }

  /* Form panel positioning */
  .feedback-form-panel {
    position: absolute;
    bottom: calc(100% + 12px);
    right: 0;
  }

  /* Hide button wrapper when expanded */
  .feedback-widget-container.expanded .feedback-button-wrapper {
    display: none;
  }
`;

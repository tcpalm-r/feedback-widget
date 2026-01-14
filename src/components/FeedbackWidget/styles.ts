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
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px ${colors.shadowDark};
    transition: all 0.2s ease-in-out;
    position: relative;
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
`;

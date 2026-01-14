// FeedbackWidget Styles
// Colors sourced from brand guidelines (sonance-brand)
import { getSelectionModeStyles } from './SelectionMode';
import { getElementListStyles } from './ElementList';

export const colors = {
  primary: '#00A3E1', // Sonance Blue "The Beam" - accent color
  primaryHover: '#0090c7', // Darker Sonance blue on hover
  primaryLight: '#4dc3eb', // Lighter Sonance blue for accents
  background: '#ffffff',
  backgroundDark: '#333F48', // Sonance Charcoal
  text: '#ffffff',
  textDark: '#333F48', // Sonance Charcoal
  border: '#D9D9D6', // Sonance Light Gray
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

  /* ===== MORPHING WIDGET CONTAINER ===== */
  .feedback-widget-morph {
    position: fixed;
    z-index: 999999;
    font-family: inherit;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: ${colors.primary};
    box-shadow: 0 4px 12px ${colors.shadowDark};
    transition:
      left 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
      top 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
      width 0.15s cubic-bezier(0.4, 0, 0.2, 1),
      height 0.15s cubic-bezier(0.4, 0, 0.2, 1),
      border-radius 0.15s cubic-bezier(0.4, 0, 0.2, 1),
      background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
  }

  .feedback-widget-morph.dragging {
    cursor: grabbing;
    transition: none;
  }

  .feedback-widget-morph.expanded {
    width: 320px;
    height: 450px;
    border-radius: 12px;
    background-color: ${colors.background};
    box-shadow: 0 10px 40px ${colors.shadowDark}, 0 0 0 1px ${colors.border};
    cursor: default;
  }

  /* Position is always set via inline style (left/top) */

  /* ===== BUTTON LAYER (visible when collapsed) ===== */
  .button-layer {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
    transition: opacity 0.15s ease;
    pointer-events: auto;
  }

  .expanded .button-layer {
    opacity: 0;
    pointer-events: none;
  }

  .button-layer svg {
    width: 24px;
    height: 24px;
    color: ${colors.text};
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .feedback-widget-morph:not(.expanded):hover {
    background-color: ${colors.primaryHover};
    transform: scale(1.05);
    box-shadow: 0 6px 16px ${colors.shadowDark};
  }

  .feedback-widget-morph:not(.expanded):active {
    transform: scale(0.98);
  }

  /* ===== FORM LAYER (visible when expanded) ===== */
  .form-layer {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.15s ease 0.15s;
    pointer-events: none;
    display: flex;
    flex-direction: column;
  }

  .expanded .form-layer {
    opacity: 1;
    pointer-events: auto;
  }

  /* Collapse transition - no delay */
  .feedback-widget-morph:not(.expanded) .form-layer {
    transition: opacity 0.1s ease;
  }

  /* ===== TOOLTIP ===== */
  .feedback-tooltip {
    position: fixed;
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
    z-index: 999998;
  }

  .feedback-tooltip.visible {
    opacity: 1;
    visibility: visible;
  }

  /* Form Panel Styles (inside form-layer) */
  .feedback-form {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: transparent;
  }

  .feedback-form-header {
    flex-shrink: 0;
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
    flex: 1;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow-y: auto;
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
    box-shadow: 0 0 0 3px rgba(0, 163, 225, 0.15);
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
    box-shadow: 0 0 0 3px rgba(0, 163, 225, 0.15);
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
    box-shadow: 0 0 0 3px rgba(0, 163, 225, 0.3);
  }

  .feedback-submit-button:active {
    transform: scale(0.98);
  }

  /* Loading spinner animation */
  @keyframes feedbackSpinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .feedback-spinner {
    animation: feedbackSpinner 1s linear infinite;
  }

  .feedback-submit-button svg {
    width: 16px;
    height: 16px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    display: inline-block;
    vertical-align: middle;
    margin-right: 6px;
  }

  .feedback-submit-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .feedback-submit-button:disabled:hover {
    background-color: ${colors.primary};
    transform: none;
  }

  /* Success state */
  .feedback-success-body {
    flex: 1;
    padding: 32px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    text-align: center;
  }

  .feedback-success-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #10b981;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .feedback-success-icon svg {
    width: 28px;
    height: 28px;
    fill: none;
    stroke: white;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .feedback-success-message {
    margin: 0;
    font-size: 14px;
    color: #374151;
    line-height: 1.5;
  }

  /* Error state */
  .feedback-error-banner {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    background-color: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 8px;
    margin-bottom: 4px;
  }

  .feedback-error-icon {
    flex-shrink: 0;
    display: flex;
  }

  .feedback-error-icon svg {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: #dc2626;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .feedback-error-text {
    flex: 1;
    font-size: 13px;
    color: #991b1b;
    line-height: 1.4;
  }

  .feedback-retry-button {
    flex-shrink: 0;
    padding: 4px 10px;
    background-color: transparent;
    color: #dc2626;
    border: 1px solid #dc2626;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .feedback-retry-button:hover {
    background-color: #dc2626;
    color: white;
  }

  .feedback-retry-button:focus {
    outline: none;
    box-shadow: 0 0 0 2px #fecaca;
  }

  /* Disabled states for form elements */
  .feedback-select:disabled,
  .feedback-textarea:disabled {
    background-color: #f9fafb;
    cursor: not-allowed;
    opacity: 0.7;
  }

  .feedback-close-button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${getElementListStyles()}

  ${getSelectionModeStyles()}
`;

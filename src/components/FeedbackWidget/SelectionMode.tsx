// SelectionMode - Generates selection mode overlay HTML for Shadow DOM
// This exports functions that return HTML strings since the widget uses Shadow DOM

// Crosshair icon SVG (from Lucide)
const CrosshairIcon = `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="22" y1="12" x2="18" y2="12"></line>
    <line x1="6" y1="12" x2="2" y2="12"></line>
    <line x1="12" y1="6" x2="12" y2="2"></line>
    <line x1="12" y1="22" x2="12" y2="18"></line>
  </svg>
`;

// X icon SVG for Done button (from Lucide)
const CheckIcon = `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
`;

export interface SelectionModeState {
  isActive: boolean;
  selectedCount: number;
}

/**
 * Generate the "Select on Screen" button HTML for the form
 */
export function getSelectOnScreenButtonHTML(disabled: boolean = false): string {
  return `
    <button
      type="button"
      class="feedback-select-button"
      ${disabled ? 'disabled' : ''}
    >
      ${CrosshairIcon}
      <span>Select on Screen</span>
    </button>
  `;
}

/**
 * Generate the selection mode overlay HTML
 * This overlay covers the entire page with a darkened effect
 */
export function getSelectionModeOverlayHTML(selectedCount: number = 0, warning: string | null = null): string {
  const warningHTML = warning ? `
    <div class="selection-mode-warning">
      ${warning}
    </div>
  ` : '';

  return `
    <div class="selection-mode-overlay">
      <div class="selection-mode-toolbar">
        <div class="selection-mode-info">
          <span class="selection-mode-icon">${CrosshairIcon}</span>
          <span class="selection-mode-text">Click elements to select</span>
          <span class="selection-mode-counter">${selectedCount}/5 selected</span>
        </div>
        <div class="selection-mode-actions">
          <button type="button" class="selection-mode-done-button">
            ${CheckIcon}
            <span>Done</span>
          </button>
        </div>
      </div>
      ${warningHTML}
      <div class="selection-mode-hint">
        Press <kbd>ESC</kbd> to exit selection mode
      </div>
    </div>
  `;
}

/**
 * Get selection mode styles
 * Using Sonance brand colors and typography
 */
export function getSelectionModeStyles(): string {
  // Sonance brand colors
  const colors = {
    blue: '#00A3E1', // The Beam
    blueHover: '#0090c7',
    blueLight: '#4dc3eb',
    charcoal: '#333F48',
    lightGray: '#D9D9D6',
    gray50: '#f8f9fa',
    gray100: '#f0f2f3',
    gray400: '#8f999f',
    gray500: '#6b7780',
    gray800: '#3a444c',
  };

  return `
    /* Select on Screen button in form */
    .feedback-select-button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      padding: 10px 16px;
      background-color: ${colors.gray50};
      color: ${colors.charcoal};
      border: 1px dashed ${colors.lightGray};
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .feedback-select-button:hover {
      background-color: ${colors.gray100};
      border-color: ${colors.gray400};
      color: ${colors.charcoal};
    }

    .feedback-select-button:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(0, 163, 225, 0.2);
      border-color: ${colors.blue};
    }

    .feedback-select-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .feedback-select-button:disabled:hover {
      background-color: ${colors.gray50};
      border-color: ${colors.lightGray};
      color: ${colors.charcoal};
    }

    .feedback-select-button svg {
      width: 18px;
      height: 18px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* Selection mode overlay */
    .selection-mode-overlay {
      position: fixed;
      inset: 0;
      background-color: rgba(51, 63, 72, 0.3);
      z-index: 999998;
      cursor: crosshair;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      padding-top: 20px;
      pointer-events: none;
    }

    /* Toolbar at top */
    .selection-mode-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      background-color: ${colors.charcoal};
      color: #ffffff;
      padding: 12px 20px;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      max-width: 90%;
      animation: selectionToolbarSlideIn 0.2s ease-out;
      pointer-events: auto;
    }

    @keyframes selectionToolbarSlideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .selection-mode-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .selection-mode-icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .selection-mode-icon svg {
      width: 20px;
      height: 20px;
      fill: none;
      stroke: ${colors.blue};
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .selection-mode-text {
      font-size: 14px;
      font-weight: 500;
    }

    .selection-mode-counter {
      font-size: 13px;
      color: ${colors.lightGray};
      padding: 4px 10px;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 20px;
    }

    .selection-mode-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .selection-mode-done-button {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      background-color: ${colors.blue};
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .selection-mode-done-button:hover {
      background-color: ${colors.blueHover};
    }

    .selection-mode-done-button:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(0, 163, 225, 0.4);
    }

    .selection-mode-done-button svg {
      width: 16px;
      height: 16px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2.5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* ESC hint at bottom */
    .selection-mode-hint {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: ${colors.charcoal};
      color: #ffffff;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 13px;
      animation: selectionHintFadeIn 0.3s ease-out 0.2s both;
      pointer-events: auto;
    }

    @keyframes selectionHintFadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .selection-mode-hint kbd {
      display: inline-block;
      padding: 2px 6px;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 12px;
      margin: 0 2px;
    }

    /* Widget button in selection mode - special state */
    .feedback-widget-container.selection-mode .feedback-button {
      background-color: #ef4444;
      cursor: pointer;
    }

    .feedback-widget-container.selection-mode .feedback-button:hover {
      background-color: #dc2626;
    }

    /* Warning message */
    .selection-mode-warning {
      position: fixed;
      top: 80px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #fef3c7;
      color: #92400e;
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      animation: warningSlideIn 0.2s ease-out;
      z-index: 999999;
      pointer-events: auto;
    }

    @keyframes warningSlideIn {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }
  `;
}

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
export function getSelectionModeOverlayHTML(selectedCount: number = 0): string {
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
      <div class="selection-mode-hint">
        Press <kbd>ESC</kbd> to exit selection mode
      </div>
    </div>
  `;
}

/**
 * Get selection mode styles
 */
export function getSelectionModeStyles(): string {
  return `
    /* Select on Screen button in form */
    .feedback-select-button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      padding: 10px 16px;
      background-color: #f3f4f6;
      color: #374151;
      border: 1px dashed #9ca3af;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .feedback-select-button:hover {
      background-color: #e5e7eb;
      border-color: #6b7280;
      color: #1f2937;
    }

    .feedback-select-button:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
      border-color: #6366f1;
    }

    .feedback-select-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .feedback-select-button:disabled:hover {
      background-color: #f3f4f6;
      border-color: #9ca3af;
      color: #374151;
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
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 999998;
      cursor: crosshair;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      padding-top: 20px;
    }

    /* Toolbar at top */
    .selection-mode-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      background-color: #1f2937;
      color: #ffffff;
      padding: 12px 20px;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      max-width: 90%;
      animation: selectionToolbarSlideIn 0.2s ease-out;
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
      stroke: #818cf8;
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
      color: #9ca3af;
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
      background-color: #6366f1;
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .selection-mode-done-button:hover {
      background-color: #4f46e5;
    }

    .selection-mode-done-button:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.4);
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
      background-color: rgba(0, 0, 0, 0.8);
      color: #ffffff;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 13px;
      animation: selectionHintFadeIn 0.3s ease-out 0.2s both;
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
      font-family: monospace;
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
  `;
}

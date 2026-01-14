// ElementList - Displays selected elements as an expandable list in the feedback form
// This exports functions that return HTML strings since the widget uses Shadow DOM

import { SelectedElementData } from './utils/elements';

// Chevron down icon SVG (from Lucide)
const ChevronDownIcon = `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="m6 9 6 6 6-6"></path>
  </svg>
`;

// Chevron up icon SVG (from Lucide)
const ChevronUpIcon = `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="m18 15-6-6-6 6"></path>
  </svg>
`;

// X icon SVG for remove button (from Lucide)
const XIcon = `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  </svg>
`;

// Trash icon SVG for clear all (from Lucide)
const TrashIcon = `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6h18"></path>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
  </svg>
`;

/**
 * Format element preview for display (tagName + truncated text)
 */
function formatElementPreview(element: SelectedElementData): string {
  const tagDisplay = `&lt;${element.tagName}&gt;`;
  const textDisplay = element.innerText
    ? `<span class="element-text">"${escapeHtml(element.innerText)}"</span>`
    : '';
  return `<span class="element-tag">${tagDisplay}</span>${textDisplay}`;
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generate HTML for the element list component (collapsed state - badge only)
 */
export function getElementListBadgeHTML(
  elements: SelectedElementData[],
  isExpanded: boolean = false
): string {
  if (elements.length === 0) {
    return '';
  }

  const chevron = isExpanded ? ChevronUpIcon : ChevronDownIcon;
  const expandedClass = isExpanded ? 'expanded' : '';

  return `
    <div class="element-list-container ${expandedClass}">
      <button type="button" class="element-list-badge" aria-expanded="${isExpanded}">
        <span class="element-list-count">${elements.length} element${elements.length > 1 ? 's' : ''} selected</span>
        <span class="element-list-chevron">${chevron}</span>
      </button>
      ${isExpanded ? getElementListExpandedHTML(elements) : ''}
    </div>
  `;
}

/**
 * Generate HTML for the expanded element list
 */
function getElementListExpandedHTML(elements: SelectedElementData[]): string {
  const elementItems = elements.map((element, index) => `
    <div class="element-list-item" data-element-index="${index}" data-element-selector="${escapeHtml(element.selector)}">
      <span class="element-item-number">${element.id}</span>
      <div class="element-item-preview">
        ${formatElementPreview(element)}
      </div>
      <button type="button" class="element-item-remove" aria-label="Remove element" data-remove-index="${index}">
        ${XIcon}
      </button>
    </div>
  `).join('');

  return `
    <div class="element-list-expanded">
      <div class="element-list-items">
        ${elementItems}
      </div>
      <button type="button" class="element-list-clear-all">
        ${TrashIcon}
        <span>Clear all</span>
      </button>
    </div>
  `;
}

/**
 * Get styles for the element list component
 * Using Sonance brand colors and typography
 */
export function getElementListStyles(): string {
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
  };

  return `
    /* Element List Container */
    .element-list-container {
      margin-top: -8px;
    }

    /* Collapsed Badge */
    .element-list-badge {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 10px 12px;
      background-color: rgba(0, 163, 225, 0.08);
      color: ${colors.blueHover};
      border: 1px solid rgba(0, 163, 225, 0.3);
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .element-list-badge:hover {
      background-color: rgba(0, 163, 225, 0.12);
      border-color: ${colors.blueLight};
    }

    .element-list-badge:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(0, 163, 225, 0.3);
    }

    .element-list-container.expanded .element-list-badge {
      border-radius: 8px 8px 0 0;
      border-bottom-color: transparent;
    }

    .element-list-count {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .element-list-chevron {
      display: flex;
      align-items: center;
    }

    .element-list-chevron svg {
      width: 16px;
      height: 16px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* Expanded List */
    .element-list-expanded {
      background-color: ${colors.gray50};
      border: 1px solid rgba(0, 163, 225, 0.3);
      border-top: none;
      border-radius: 0 0 8px 8px;
      overflow: hidden;
    }

    .element-list-items {
      max-height: 200px;
      overflow-y: auto;
    }

    /* Individual Element Item */
    .element-list-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-bottom: 1px solid ${colors.lightGray};
      transition: background-color 0.15s ease;
    }

    .element-list-item:last-child {
      border-bottom: none;
    }

    .element-list-item:hover {
      background-color: ${colors.gray100};
    }

    .element-item-number {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: ${colors.blue};
      color: white;
      font-size: 11px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .element-item-preview {
      flex: 1;
      min-width: 0;
      font-size: 12px;
      color: ${colors.charcoal};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .element-tag {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      background-color: rgba(0, 163, 225, 0.1);
      color: ${colors.blueHover};
      padding: 2px 4px;
      border-radius: 3px;
      font-size: 11px;
    }

    .element-text {
      color: ${colors.gray500};
      margin-left: 6px;
      font-style: italic;
    }

    .element-item-remove {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      border: none;
      background: transparent;
      color: ${colors.gray400};
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: all 0.15s ease;
    }

    .element-item-remove:hover {
      background-color: #fee2e2;
      color: #dc2626;
    }

    .element-item-remove:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.3);
    }

    .element-item-remove svg {
      width: 14px;
      height: 14px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* Clear All Button */
    .element-list-clear-all {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      width: 100%;
      padding: 8px 12px;
      background-color: transparent;
      color: #dc2626;
      border: none;
      border-top: 1px solid ${colors.lightGray};
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      cursor: pointer;
      transition: background-color 0.15s ease;
    }

    .element-list-clear-all:hover {
      background-color: #fef2f2;
    }

    .element-list-clear-all:focus {
      outline: none;
      background-color: #fee2e2;
    }

    .element-list-clear-all svg {
      width: 14px;
      height: 14px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  `;
}

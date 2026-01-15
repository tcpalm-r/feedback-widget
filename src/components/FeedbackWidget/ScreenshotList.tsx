// ScreenshotList - Displays captured screenshots as thumbnails in the feedback form
// This exports functions that return HTML strings since the widget uses Shadow DOM

import { CapturedScreenshot } from './utils/screenshot';

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
 * Generate HTML for the screenshot list component (collapsed state - badge only)
 */
export function getScreenshotListBadgeHTML(
  screenshots: CapturedScreenshot[],
  isExpanded: boolean = false
): string {
  if (screenshots.length === 0) {
    return '';
  }

  const chevron = isExpanded ? ChevronUpIcon : ChevronDownIcon;
  const expandedClass = isExpanded ? 'expanded' : '';

  return `
    <div class="screenshot-list-container ${expandedClass}">
      <button type="button" class="screenshot-list-badge" aria-expanded="${isExpanded}">
        <span class="screenshot-list-count">${screenshots.length} screenshot${screenshots.length > 1 ? 's' : ''}</span>
        <span class="screenshot-list-chevron">${chevron}</span>
      </button>
      ${isExpanded ? getScreenshotListExpandedHTML(screenshots) : ''}
    </div>
  `;
}

/**
 * Generate HTML for the expanded screenshot list with thumbnails
 */
function getScreenshotListExpandedHTML(screenshots: CapturedScreenshot[]): string {
  const thumbnailItems = screenshots.map((screenshot, index) => `
    <div class="screenshot-thumbnail-item" data-screenshot-index="${index}" data-screenshot-id="${screenshot.id}">
      <div class="screenshot-thumbnail-wrapper">
        <img
          src="${screenshot.blobUrl}"
          alt="Screenshot ${index + 1}"
          class="screenshot-thumbnail-image"
          loading="lazy"
        />
        <span class="screenshot-thumbnail-badge">${index + 1}</span>
        <button
          type="button"
          class="screenshot-thumbnail-remove"
          aria-label="Remove screenshot ${index + 1}"
          data-remove-index="${index}"
        >
          ${XIcon}
        </button>
      </div>
    </div>
  `).join('');

  return `
    <div class="screenshot-list-expanded">
      <div class="screenshot-thumbnail-grid">
        ${thumbnailItems}
      </div>
      <button type="button" class="screenshot-list-clear-all">
        ${TrashIcon}
        <span>Clear all</span>
      </button>
    </div>
  `;
}

/**
 * Get styles for the screenshot list component
 * Using Sonance brand colors and typography
 */
export function getScreenshotListStyles(): string {
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
    /* Screenshot List Container */
    .screenshot-list-container {
      margin-top: -8px;
    }

    /* Collapsed Badge */
    .screenshot-list-badge {
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

    .screenshot-list-badge:hover {
      background-color: rgba(0, 163, 225, 0.12);
      border-color: ${colors.blueLight};
    }

    .screenshot-list-badge:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(0, 163, 225, 0.3);
    }

    .screenshot-list-container.expanded .screenshot-list-badge {
      border-radius: 8px 8px 0 0;
      border-bottom-color: transparent;
    }

    .screenshot-list-count {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .screenshot-list-chevron {
      display: flex;
      align-items: center;
    }

    .screenshot-list-chevron svg {
      width: 16px;
      height: 16px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* Expanded List */
    .screenshot-list-expanded {
      background-color: ${colors.gray50};
      border: 1px solid rgba(0, 163, 225, 0.3);
      border-top: none;
      border-radius: 0 0 8px 8px;
      overflow: hidden;
    }

    /* Thumbnail Grid */
    .screenshot-thumbnail-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 12px;
      max-height: 180px;
      overflow-y: auto;
    }

    /* Individual Thumbnail Item */
    .screenshot-thumbnail-item {
      position: relative;
      flex-shrink: 0;
    }

    .screenshot-thumbnail-wrapper {
      position: relative;
      width: 48px;
      height: 48px;
      border-radius: 6px;
      overflow: hidden;
      border: 2px solid ${colors.lightGray};
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
      cursor: pointer;
    }

    .screenshot-thumbnail-wrapper:hover {
      border-color: ${colors.blue};
      box-shadow: 0 2px 8px rgba(0, 163, 225, 0.2);
    }

    .screenshot-thumbnail-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* Numbered Badge */
    .screenshot-thumbnail-badge {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: ${colors.blue};
      color: white;
      font-size: 10px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    /* Remove Button */
    .screenshot-thumbnail-remove {
      position: absolute;
      top: 2px;
      right: 2px;
      width: 16px;
      height: 16px;
      border: none;
      background-color: rgba(220, 38, 38, 0.9);
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      opacity: 0;
      transition: opacity 0.15s ease;
      padding: 0;
    }

    .screenshot-thumbnail-wrapper:hover .screenshot-thumbnail-remove {
      opacity: 1;
    }

    .screenshot-thumbnail-remove:hover {
      background-color: #dc2626;
    }

    .screenshot-thumbnail-remove:focus {
      outline: none;
      opacity: 1;
      box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.3);
    }

    .screenshot-thumbnail-remove svg {
      width: 10px;
      height: 10px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2.5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* Clear All Button */
    .screenshot-list-clear-all {
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

    .screenshot-list-clear-all:hover {
      background-color: #fef2f2;
    }

    .screenshot-list-clear-all:focus {
      outline: none;
      background-color: #fee2e2;
    }

    .screenshot-list-clear-all svg {
      width: 14px;
      height: 14px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* Screenshot Preview Modal (for clicking thumbnails) */
    .screenshot-preview-overlay {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.75);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000000;
      cursor: pointer;
    }

    .screenshot-preview-container {
      position: relative;
      max-width: 200px;
      max-height: 200px;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
    }

    .screenshot-preview-image {
      display: block;
      max-width: 200px;
      max-height: 200px;
      object-fit: contain;
      background-color: white;
    }

    .screenshot-preview-close {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 28px;
      height: 28px;
      border: none;
      background-color: rgba(0, 0, 0, 0.6);
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: background-color 0.15s ease;
    }

    .screenshot-preview-close:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }

    .screenshot-preview-close svg {
      width: 16px;
      height: 16px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  `;
}

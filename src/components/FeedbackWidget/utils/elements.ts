// Element detection utilities for interactive element highlighting
// Detects interactive elements: buttons, links, inputs, [role], [onclick], elements with tabindex

export interface ElementInfo {
  element: HTMLElement;
  selector: string;
  tagName: string;
  className: string;
  innerText: string;
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

/**
 * Interactive element selectors
 */
const INTERACTIVE_SELECTORS = [
  'button',
  'a[href]',
  'input',
  'select',
  'textarea',
  '[role="button"]',
  '[role="link"]',
  '[role="checkbox"]',
  '[role="radio"]',
  '[role="tab"]',
  '[role="menuitem"]',
  '[role="option"]',
  '[role="switch"]',
  '[tabindex]',
  '[onclick]',
];

/**
 * Check if an element is interactive
 */
export function isInteractiveElement(element: HTMLElement): boolean {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }

  // Exclude elements that are part of the feedback widget
  if (element.closest('[data-feedback-widget]')) {
    return false;
  }

  // Check if element matches any interactive selector
  for (const selector of INTERACTIVE_SELECTORS) {
    if (element.matches(selector)) {
      return true;
    }
  }

  // Check for click event handlers (data attribute pattern)
  if (element.hasAttribute('data-onclick') || element.hasAttribute('data-action')) {
    return true;
  }

  return false;
}

/**
 * Generate a unique CSS selector for an element
 */
export function generateSelector(element: HTMLElement): string {
  // Try ID first
  if (element.id) {
    return `#${CSS.escape(element.id)}`;
  }

  // Build selector from tag name and attributes
  const parts: string[] = [];

  // Tag name
  parts.push(element.tagName.toLowerCase());

  // Add relevant attributes
  if (element.className && typeof element.className === 'string') {
    const classes = element.className.split(/\s+/).filter(c => c.length > 0);
    if (classes.length > 0) {
      // Use first 2 classes max for brevity
      const relevantClasses = classes.slice(0, 2);
      parts.push(relevantClasses.map(c => `.${CSS.escape(c)}`).join(''));
    }
  }

  // Add type for inputs
  if (element.tagName.toLowerCase() === 'input') {
    const type = element.getAttribute('type');
    if (type) {
      parts.push(`[type="${CSS.escape(type)}"]`);
    }
  }

  // Add name attribute if present
  const name = element.getAttribute('name');
  if (name) {
    parts.push(`[name="${CSS.escape(name)}"]`);
  }

  // Add role if present
  const role = element.getAttribute('role');
  if (role) {
    parts.push(`[role="${CSS.escape(role)}"]`);
  }

  return parts.join('');
}

/**
 * Truncate text to a maximum length
 */
export function truncateText(text: string, maxLength: number = 50): string {
  const cleaned = text.replace(/\s+/g, ' ').trim();
  if (cleaned.length <= maxLength) {
    return cleaned;
  }
  return cleaned.substring(0, maxLength - 3) + '...';
}

/**
 * Get rich information about an element
 */
export function getElementInfo(element: HTMLElement): ElementInfo {
  const rect = element.getBoundingClientRect();

  return {
    element,
    selector: generateSelector(element),
    tagName: element.tagName.toLowerCase(),
    className: typeof element.className === 'string' ? element.className : '',
    innerText: truncateText(element.innerText || element.textContent || ''),
    boundingBox: {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
    },
  };
}

/**
 * Find the closest interactive parent element
 * This helps when the user clicks on a child of an interactive element
 */
export function findInteractiveParent(element: HTMLElement): HTMLElement | null {
  let current: HTMLElement | null = element;

  while (current) {
    if (isInteractiveElement(current)) {
      return current;
    }
    current = current.parentElement;
  }

  return null;
}

/**
 * Get all interactive elements on the page
 */
export function getAllInteractiveElements(): HTMLElement[] {
  const selector = INTERACTIVE_SELECTORS.join(', ');
  const elements = document.querySelectorAll<HTMLElement>(selector);

  // Filter out elements inside the feedback widget
  return Array.from(elements).filter(el => !el.closest('[data-feedback-widget]'));
}

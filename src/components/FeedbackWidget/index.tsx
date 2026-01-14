'use client';

import { useEffect, useRef, useState } from 'react';
import { getWidgetStyles } from './styles';

// MessageSquare icon SVG path (from Lucide)
const MessageSquareIcon = `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
`;

export interface FeedbackWidgetProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export function FeedbackWidget({ position = 'bottom-right' }: FeedbackWidgetProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const shadowRootRef = useRef<ShadowRoot | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!hostRef.current) return;

    // Create Shadow DOM if it doesn't exist
    if (!shadowRootRef.current) {
      shadowRootRef.current = hostRef.current.attachShadow({ mode: 'open' });
    }

    const shadowRoot = shadowRootRef.current;

    // Render content into Shadow DOM
    const positionClass = position !== 'bottom-right' ? position : '';

    shadowRoot.innerHTML = `
      <style>${getWidgetStyles()}</style>
      <div class="feedback-widget-container ${positionClass}">
        <div class="feedback-button-wrapper">
          <button
            class="feedback-button"
            aria-label="Open feedback form"
            aria-expanded="${isExpanded}"
          >
            ${MessageSquareIcon}
          </button>
          <div class="feedback-tooltip" role="tooltip">Feedback</div>
        </div>
      </div>
    `;

    // Add click handler to button
    const button = shadowRoot.querySelector('.feedback-button');
    if (button) {
      button.addEventListener('click', () => {
        setIsExpanded((prev) => !prev);
      });
    }

    // Cleanup function
    return () => {
      if (button) {
        button.removeEventListener('click', () => {
          setIsExpanded((prev) => !prev);
        });
      }
    };
  }, [position, isExpanded]);

  return <div ref={hostRef} data-feedback-widget />;
}

export default FeedbackWidget;

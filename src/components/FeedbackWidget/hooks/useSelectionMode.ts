import { useState, useRef, useCallback, useEffect } from 'react';

interface UseSelectionModeProps {
  setIsExpanded: (expanded: boolean) => void;
  setSelectionWarning: (warning: string | null) => void;
}

export function useSelectionMode({ setIsExpanded, setSelectionWarning }: UseSelectionModeProps) {
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const isSelectionModeRef = useRef(false);

  // Keep ref in sync
  isSelectionModeRef.current = isSelectionMode;

  // ESC key handler to exit selection mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSelectionMode) {
        setIsSelectionMode(false);
      }
    };

    if (isSelectionMode) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isSelectionMode]);

  const handleEnterSelectionMode = useCallback(() => {
    setIsSelectionMode(true);
    setIsExpanded(false); // Collapse form when entering selection mode
  }, [setIsExpanded]);

  const handleExitSelectionMode = useCallback(() => {
    setIsSelectionMode(false);
    setIsExpanded(true); // Re-expand form when exiting selection mode
    setSelectionWarning(null);
  }, [setIsExpanded, setSelectionWarning]);

  return {
    isSelectionMode,
    setIsSelectionMode,
    isSelectionModeRef,
    handleEnterSelectionMode,
    handleExitSelectionMode,
  };
}

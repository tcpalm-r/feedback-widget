import { useState, useRef, useCallback, useEffect } from 'react';
import { FeedbackType, SubmissionState } from '../FeedbackForm';
import { submitFeedback, FeedbackMetadata, SubmitFeedbackResult, uploadScreenshot } from '../../../lib/feedbackApi';
import { detectUserId, JwtConfig } from '../utils/jwt';
import { CapturedScreenshot, releaseScreenshot } from '../utils/screenshot';

interface UseFeedbackSubmissionProps {
  effectiveAppId: string;
  effectiveApiBaseUrl?: string;
  effectiveJwtConfig?: JwtConfig;
  capturedScreenshots: CapturedScreenshot[];
  setCapturedScreenshots: React.Dispatch<React.SetStateAction<CapturedScreenshot[]>>;
  setDrawnRectangles: React.Dispatch<React.SetStateAction<{ id: string; x: number; y: number; width: number; height: number; number: number }[]>>;
  setIsScreenshotListExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useFeedbackSubmission({
  effectiveAppId,
  effectiveApiBaseUrl,
  effectiveJwtConfig,
  capturedScreenshots,
  setCapturedScreenshots,
  setDrawnRectangles,
  setIsScreenshotListExpanded,
  setIsExpanded,
}: UseFeedbackSubmissionProps) {
  const INITIALS_STORAGE_KEY = 'feedback-widget-initials';

  const [feedbackType, setFeedbackType] = useState<FeedbackType>('bug');
  const [feedbackMessage, setFeedbackMessageRaw] = useState('');
  const [feedbackInitials, setFeedbackInitialsRaw] = useState('');
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isNetworkError, setIsNetworkError] = useState(false);
  const [isValidationError, setIsValidationError] = useState(false);
  const [isInitialsValidationError, setIsInitialsValidationError] = useState(false);
  const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load cached initials on mount
  useEffect(() => {
    try {
      const cached = localStorage.getItem(INITIALS_STORAGE_KEY);
      if (cached) {
        setFeedbackInitials(cached);
      }
    } catch {
      // localStorage not available
    }
  }, []);

  // Wrapper that clears validation error when user types
  const setFeedbackMessage = useCallback((msg: string) => {
    setFeedbackMessageRaw(msg);
    if (isValidationError) {
      setIsValidationError(false);
      setSubmissionState('idle');
      setErrorMessage('');
    }
  }, [isValidationError]);

  // Wrapper that clears initials validation error when user types
  const setFeedbackInitials = useCallback((initials: string) => {
    setFeedbackInitialsRaw(initials);
    if (isInitialsValidationError) {
      setIsInitialsValidationError(false);
      setSubmissionState('idle');
      setErrorMessage('');
    }
  }, [isInitialsValidationError]);

  // Collect metadata
  const collectMetadata = useCallback((): FeedbackMetadata => {
    const userId = detectUserId(effectiveJwtConfig);
    return {
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      timestamp: new Date().toISOString(),
      ...(userId && { userId }),
    };
  }, [effectiveJwtConfig]);

  // Close form handler
  const handleClose = useCallback(() => {
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
      autoCloseTimerRef.current = null;
    }
    setIsExpanded(false);
    setSubmissionState('idle');
    setErrorMessage('');
  }, [setIsExpanded]);

  // Form submit handler
  const handleSubmit = useCallback(async (e?: Event) => {
    if (e) {
      e.preventDefault();
    }

    // Validate both fields - just show red on empty fields
    const initialsEmpty = !feedbackInitials.trim();
    const messageEmpty = !feedbackMessage.trim();

    if (initialsEmpty || messageEmpty) {
      setIsInitialsValidationError(initialsEmpty);
      setIsValidationError(messageEmpty);
      setSubmissionState('idle');
      setErrorMessage('');
      return;
    }

    setSubmissionState('loading');
    setErrorMessage('');
    setIsNetworkError(false);
    setIsValidationError(false);
    setIsInitialsValidationError(false);

    const metadata = collectMetadata();

    // Upload screenshots to Supabase Storage
    const uploadedScreenshots: Array<{
      url: string;
      storagePath: string;
      region: { x: number; y: number; width: number; height: number };
      capturedAt: number;
      sizeBytes: number;
    }> = [];

    for (let i = 0; i < capturedScreenshots.length; i++) {
      const screenshot = capturedScreenshots[i];
      try {
        // Fetch the blob from the blob URL
        const response = await fetch(screenshot.blobUrl);
        const blob = await response.blob();

        // Upload to Supabase Storage
        const uploadResult = await uploadScreenshot(blob, effectiveAppId, i + 1, effectiveApiBaseUrl);

        if (uploadResult) {
          uploadedScreenshots.push({
            url: uploadResult.url,
            storagePath: uploadResult.storagePath,
            region: screenshot.region,
            capturedAt: screenshot.capturedAt,
            sizeBytes: screenshot.sizeBytes,
          });
        } else {
          console.warn(`[FeedbackWidget] Failed to upload screenshot ${i + 1}`);
        }
      } catch (err) {
        console.error(`[FeedbackWidget] Error uploading screenshot ${i + 1}:`, err);
      }
    }

    const result: SubmitFeedbackResult = await submitFeedback(
      {
        app_id: effectiveAppId,
        type: feedbackType,
        message: feedbackMessage.trim(),
        initials: feedbackInitials.trim() || undefined,
        elements: uploadedScreenshots.length > 0 ? uploadedScreenshots : undefined,
        metadata,
      },
      effectiveApiBaseUrl
    );

    if (result.success) {
      setSubmissionState('success');
      // Cache initials for future submissions
      if (feedbackInitials.trim()) {
        try {
          localStorage.setItem(INITIALS_STORAGE_KEY, feedbackInitials.trim());
        } catch {
          // localStorage not available
        }
      }
      // Reset form fields (keep initials for next submission)
      setFeedbackMessage('');
      setFeedbackType('general');
      // Release screenshot blob URLs
      capturedScreenshots.forEach(screenshot => releaseScreenshot(screenshot));
      setCapturedScreenshots([]);
      setDrawnRectangles([]);
      setIsScreenshotListExpanded(false);
      // Auto-collapse after success
      autoCloseTimerRef.current = setTimeout(() => {
        setIsExpanded(false);
        setSubmissionState('idle');
      }, 600);
    } else {
      setSubmissionState('error');
      setErrorMessage(result.error || 'Something went wrong. Please try again.');
      setIsNetworkError(result.isNetworkError || false);
    }
  }, [feedbackType, feedbackMessage, feedbackInitials, effectiveAppId, effectiveApiBaseUrl, collectMetadata, capturedScreenshots, setCapturedScreenshots, setDrawnRectangles, setIsScreenshotListExpanded, setIsExpanded]);

  // Retry handler for error state
  const handleRetry = useCallback(() => {
    handleSubmit();
  }, [handleSubmit]);

  return {
    feedbackType,
    setFeedbackType,
    feedbackMessage,
    setFeedbackMessage,
    feedbackInitials,
    setFeedbackInitials,
    submissionState,
    setSubmissionState,
    errorMessage,
    isNetworkError,
    isValidationError,
    isInitialsValidationError,
    autoCloseTimerRef,
    handleClose,
    handleSubmit,
    handleRetry,
  };
}

export interface FeedbackMetadata {
  url: string;
  userAgent: string;
  timestamp: string;
  userId?: string;
}

export interface FeedbackSubmission {
  app_id: string;
  type: string;
  message: string;
  elements?: unknown[];
  metadata: FeedbackMetadata;
}

export interface SubmitFeedbackResult {
  success: boolean;
  error?: string;
  isNetworkError?: boolean;
}

export interface UploadScreenshotResult {
  url: string;
  storagePath: string;
}

function normalizeApiBaseUrl(apiBaseUrl?: string): string {
  if (apiBaseUrl) {
    return apiBaseUrl.replace(/\/$/, '');
  }

  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }

  return '';
}

function buildApiUrl(apiBaseUrl: string, path: string): string {
  const cleanBase = normalizeApiBaseUrl(apiBaseUrl);
  if (!cleanBase) {
    return path;
  }

  return `${cleanBase}${path.startsWith('/') ? '' : '/'}${path}`;
}

function getUserFriendlyErrorMessage(error: unknown): { message: string; isNetworkError: boolean } {
  if (error instanceof Error) {
    const errorMessage = error.message.toLowerCase();
    if (
      errorMessage.includes('network') ||
      errorMessage.includes('fetch') ||
      errorMessage.includes('connection') ||
      errorMessage.includes('timeout') ||
      errorMessage.includes('failed to fetch') ||
      error.name === 'TypeError'
    ) {
      return {
        message: 'Unable to connect. Please check your internet connection and try again.',
        isNetworkError: true,
      };
    }
  }

  return {
    message: 'Something went wrong. Please try again.',
    isNetworkError: false,
  };
}

export async function uploadScreenshot(
  blob: Blob,
  appId: string,
  index: number,
  apiBaseUrl?: string
): Promise<UploadScreenshotResult | null> {
  const endpoint = buildApiUrl(apiBaseUrl || '', '/api/screenshot');
  const formData = new FormData();
  formData.append('appId', appId);
  formData.append('index', String(index));
  formData.append('file', blob, `screenshot-${index}.png`);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
      mode: 'cors',
      credentials: 'omit',
    });

    if (!response.ok) {
      console.error('[FeedbackWidget] Screenshot upload failed:', response.status);
      return null;
    }

    const data = (await response.json()) as UploadScreenshotResult;
    if (!data?.url || !data?.storagePath) {
      console.error('[FeedbackWidget] Screenshot upload response missing fields.');
      return null;
    }

    return data;
  } catch (error) {
    console.error('[FeedbackWidget] Screenshot upload exception:', error);
    return null;
  }
}

export async function submitFeedback(
  feedback: FeedbackSubmission,
  apiBaseUrl?: string
): Promise<SubmitFeedbackResult> {
  const endpoint = buildApiUrl(apiBaseUrl || '', '/api/feedback');

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedback),
      mode: 'cors',
      credentials: 'omit',
    });

    if (!response.ok) {
      let errorMessage = 'Something went wrong. Please try again.';
      try {
        const data = (await response.json()) as { error?: string };
        if (data?.error) {
          errorMessage = data.error;
        }
      } catch {
        // ignore parse errors
      }

      return {
        success: false,
        error: errorMessage,
        isNetworkError: response.status >= 500,
      };
    }

    return { success: true };
  } catch (error) {
    const { message, isNetworkError } = getUserFriendlyErrorMessage(error);
    return {
      success: false,
      error: message,
      isNetworkError,
    };
  }
}

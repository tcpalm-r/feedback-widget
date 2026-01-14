import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variable validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Log warnings for missing env variables in development
if (typeof window !== 'undefined') {
  if (!supabaseUrl) {
    console.error(
      '[FeedbackWidget] NEXT_PUBLIC_SUPABASE_URL is not set. ' +
      'Please add it to your .env.local file. ' +
      'See .env.example for the required format.'
    );
  }
  if (!supabaseAnonKey) {
    console.error(
      '[FeedbackWidget] NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. ' +
      'Please add it to your .env.local file. ' +
      'See .env.example for the required format.'
    );
  }
}

// Create a singleton Supabase client
let supabaseClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  }

  return supabaseClient;
}

// Feedback submission types
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

/**
 * Get a user-friendly error message for Supabase errors
 */
function getUserFriendlyErrorMessage(error: unknown): { message: string; isNetworkError: boolean } {
  // Check for network/connection errors
  if (error instanceof Error) {
    const errorMessage = error.message.toLowerCase();

    // Network errors
    if (
      errorMessage.includes('network') ||
      errorMessage.includes('fetch') ||
      errorMessage.includes('connection') ||
      errorMessage.includes('timeout') ||
      errorMessage.includes('failed to fetch') ||
      errorMessage.includes('networkerror') ||
      error.name === 'TypeError' // fetch failures often throw TypeError
    ) {
      return {
        message: 'Unable to connect. Please check your internet connection and try again.',
        isNetworkError: true,
      };
    }

    // CORS errors (usually configuration issue)
    if (errorMessage.includes('cors')) {
      return {
        message: 'Connection blocked. Please contact support if this persists.',
        isNetworkError: false,
      };
    }
  }

  // Supabase-specific errors
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const supabaseError = error as { code: string; message?: string };

    // Rate limiting
    if (supabaseError.code === '429' || supabaseError.code === 'PGRST301') {
      return {
        message: 'Too many requests. Please wait a moment and try again.',
        isNetworkError: false,
      };
    }

    // Auth/permission errors
    if (supabaseError.code === '401' || supabaseError.code === '403') {
      return {
        message: 'Unable to submit feedback. Please try again later.',
        isNetworkError: false,
      };
    }

    // Server errors
    if (supabaseError.code?.startsWith('5')) {
      return {
        message: 'Server error. Please try again in a few moments.',
        isNetworkError: true,
      };
    }
  }

  // Default error
  return {
    message: 'Something went wrong. Please try again.',
    isNetworkError: false,
  };
}

export async function submitFeedback(
  feedback: FeedbackSubmission
): Promise<SubmitFeedbackResult> {
  const client = getSupabaseClient();

  if (!client) {
    return {
      success: false,
      error: 'Feedback is not configured. Please contact the site administrator.',
      isNetworkError: false,
    };
  }

  try {
    const { error } = await client.from('feedback').insert([feedback]);

    if (error) {
      console.error('[FeedbackWidget] Supabase error:', error);
      const { message, isNetworkError } = getUserFriendlyErrorMessage(error);
      return {
        success: false,
        error: message,
        isNetworkError,
      };
    }

    return { success: true };
  } catch (err) {
    console.error('[FeedbackWidget] Submission error:', err);
    const { message, isNetworkError } = getUserFriendlyErrorMessage(err);
    return {
      success: false,
      error: message,
      isNetworkError,
    };
  }
}

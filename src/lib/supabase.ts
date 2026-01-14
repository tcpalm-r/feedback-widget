import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variable validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Log warnings for missing env variables in development
if (typeof window !== 'undefined') {
  if (!supabaseUrl) {
    console.warn(
      '[FeedbackWidget] Missing NEXT_PUBLIC_SUPABASE_URL environment variable. Feedback submissions will fail.'
    );
  }
  if (!supabaseAnonKey) {
    console.warn(
      '[FeedbackWidget] Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable. Feedback submissions will fail.'
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
}

export async function submitFeedback(
  feedback: FeedbackSubmission
): Promise<SubmitFeedbackResult> {
  const client = getSupabaseClient();

  if (!client) {
    return {
      success: false,
      error: 'Supabase is not configured. Please check your environment variables.',
    };
  }

  try {
    const { error } = await client.from('feedback').insert([feedback]);

    if (error) {
      console.error('[FeedbackWidget] Supabase error:', error);
      return {
        success: false,
        error: error.message || 'Failed to submit feedback',
      };
    }

    return { success: true };
  } catch (err) {
    console.error('[FeedbackWidget] Submission error:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'An unexpected error occurred',
    };
  }
}

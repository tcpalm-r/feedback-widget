import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

const MAX_MESSAGE_LENGTH = 2000;
const MAX_INITIALS_LENGTH = 10;
const CORTEX_TIMEOUT_MS = 5000;
const CORTEX_API_URL = process.env.CORTEX_API_URL || '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export const runtime = 'nodejs';

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

/**
 * Forward feedback to Cortex for auto-triage and Asana task creation.
 * Returns true if Cortex accepted the feedback, false on any failure.
 */
async function forwardToCortex(payload: Record<string, unknown>): Promise<boolean> {
  if (!CORTEX_API_URL) return false;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CORTEX_TIMEOUT_MS);

  try {
    const res = await fetch(`${CORTEX_API_URL}/api/v1/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.warn(`[FeedbackWidget] Cortex returned ${res.status}: ${body}`);
      return false;
    }

    const data = await res.json();
    return data?.success === true;
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    console.warn(`[FeedbackWidget] Cortex forwarding failed: ${reason}`);
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: Request) {
  // Capture request forensics
  const clientIp =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';
  const origin = request.headers.get('origin') || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const referer = request.headers.get('referer') || null;

  let payload: {
    app_id?: string;
    type?: string;
    message?: string;
    initials?: string;
    elements?: unknown[];
    metadata?: Record<string, unknown>;
  };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON payload.' },
      { status: 400, headers: corsHeaders }
    );
  }

  const appId = typeof payload.app_id === 'string' ? payload.app_id.trim() : '';
  const message = typeof payload.message === 'string' ? payload.message.trim() : '';
  const type = typeof payload.type === 'string' ? payload.type : 'bug';
  const initials = typeof payload.initials === 'string' ? payload.initials.trim().slice(0, MAX_INITIALS_LENGTH) : null;
  const metadata =
    payload.metadata && typeof payload.metadata === 'object' ? payload.metadata : {};

  if (!appId) {
    return NextResponse.json(
      { error: 'app_id is required.' },
      { status: 400, headers: corsHeaders }
    );
  }

  if (!message) {
    return NextResponse.json(
      { error: 'message is required.' },
      { status: 400, headers: corsHeaders }
    );
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: `Message exceeds maximum length of ${MAX_MESSAGE_LENGTH} characters.` },
      { status: 400, headers: corsHeaders }
    );
  }

  // Build the normalized feedback record with forensics metadata
  const feedbackRecord = {
    app_id: appId,
    type,
    message,
    initials: initials || null,
    elements: payload.elements ?? null,
    metadata: {
      ...metadata,
      receivedAt: new Date().toISOString(),
      ip: clientIp,
      origin,
      userAgent,
      ...(referer && { referer }),
    },
  };

  try {
    const supabase = getSupabaseAdmin();

    // Validate app_id against registered projects
    const { data: project } = await supabase
      .from('projects')
      .select('app_id')
      .eq('app_id', appId)
      .single();

    if (!project) {
      console.warn(`[FeedbackWidget] Rejected unregistered app_id="${appId}" from ip=${clientIp} origin=${origin}`);
      return NextResponse.json(
        { error: 'Unknown app_id. Project is not registered.' },
        { status: 403, headers: corsHeaders }
      );
    }

    // Try Cortex first — it handles insert + triage + Asana task creation
    const cortexHandled = await forwardToCortex(feedbackRecord);

    if (cortexHandled) {
      console.log(`[FeedbackWidget] Cortex accepted feedback for app_id="${appId}"`);
      return NextResponse.json({ success: true }, { headers: corsHeaders });
    }

    // Fallback: direct Supabase insert (no triage, but feedback is saved).
    // The cron sync job will retry triage via Cortex on the next run.
    if (CORTEX_API_URL) {
      console.warn(`[FeedbackWidget] Cortex unavailable, falling back to direct insert for app_id="${appId}"`);
    }

    const { error } = await supabase.from('feedback').insert([{
      ...feedbackRecord,
      status: 'new',
    }]);

    if (error) {
      console.error('[FeedbackWidget] Supabase insert error:', error);
      return NextResponse.json(
        { error: 'Failed to submit feedback.' },
        { status: 500, headers: corsHeaders }
      );
    }

    return NextResponse.json({ success: true }, { headers: corsHeaders });
  } catch (error) {
    console.error('[FeedbackWidget] Feedback API error:', error);
    return NextResponse.json(
      { error: 'Server error. Please try again.' },
      { status: 500, headers: corsHeaders }
    );
  }
}

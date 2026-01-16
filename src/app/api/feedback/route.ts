import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export const runtime = 'nodejs';

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(request: Request) {
  let payload: {
    app_id?: string;
    type?: string;
    message?: string;
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
  const type = typeof payload.type === 'string' ? payload.type : 'general';
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

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from('feedback').insert([
      {
        app_id: appId,
        type,
        message,
        elements: payload.elements ?? null,
        metadata: {
          ...metadata,
          receivedAt: new Date().toISOString(),
        },
      },
    ]);

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

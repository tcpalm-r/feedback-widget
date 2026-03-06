import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
};

export const runtime = 'nodejs';

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(request: Request) {
  const registrationKey = process.env.REGISTRATION_API_KEY;
  if (!registrationKey) {
    return NextResponse.json(
      { error: 'Registration is not configured on this server.' },
      { status: 500, headers: corsHeaders }
    );
  }

  const apiKey = request.headers.get('x-api-key');
  if (apiKey !== registrationKey) {
    return NextResponse.json(
      { error: 'Invalid API key.' },
      { status: 401, headers: corsHeaders }
    );
  }

  let payload: { app_id?: string; name?: string };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON payload.' },
      { status: 400, headers: corsHeaders }
    );
  }

  const appId = typeof payload.app_id === 'string' ? payload.app_id.trim() : '';
  const name = typeof payload.name === 'string' ? payload.name.trim() : appId;

  if (!appId || appId.length > 100) {
    return NextResponse.json(
      { error: 'app_id is required and must be under 100 characters.' },
      { status: 400, headers: corsHeaders }
    );
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from('projects')
      .upsert({ app_id: appId, name }, { onConflict: 'app_id' });

    if (error) {
      console.error('[FeedbackWidget] Project registration error:', error);
      return NextResponse.json(
        { error: 'Failed to register project.' },
        { status: 500, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { success: true, app_id: appId },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('[FeedbackWidget] Project registration error:', error);
    return NextResponse.json(
      { error: 'Server error.' },
      { status: 500, headers: corsHeaders }
    );
  }
}

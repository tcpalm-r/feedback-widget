import { NextResponse } from 'next/server';
import { Buffer } from 'node:buffer';
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

function sanitizePathSegment(value: string): string {
  return value.replace(/[^a-zA-Z0-9_-]/g, '_');
}

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: 'Invalid form payload.' },
      { status: 400, headers: corsHeaders }
    );
  }

  const appIdValue = formData.get('appId');
  const indexValue = formData.get('index');
  const fileValue = formData.get('file');

  const appId = typeof appIdValue === 'string' ? appIdValue.trim() : '';
  const index = typeof indexValue === 'string' ? indexValue : '0';

  if (!appId) {
    return NextResponse.json(
      { error: 'appId is required.' },
      { status: 400, headers: corsHeaders }
    );
  }

  if (!fileValue || !(fileValue instanceof File)) {
    return NextResponse.json(
      { error: 'file is required.' },
      { status: 400, headers: corsHeaders }
    );
  }

  try {
    const supabase = getSupabaseAdmin();
    const buffer = Buffer.from(await fileValue.arrayBuffer());
    const safeAppId = sanitizePathSegment(appId);
    const timestamp = Date.now();
    const storagePath = `${safeAppId}/${timestamp}-${index}.png`;

    const { error } = await supabase.storage
      .from('feedback-screenshots')
      .upload(storagePath, buffer, {
        contentType: fileValue.type || 'image/png',
        upsert: false,
      });

    if (error) {
      console.error('[FeedbackWidget] Screenshot upload error:', error);
      return NextResponse.json(
        { error: 'Failed to upload screenshot.' },
        { status: 500, headers: corsHeaders }
      );
    }

    const { data: urlData } = supabase.storage
      .from('feedback-screenshots')
      .getPublicUrl(storagePath);

    return NextResponse.json(
      {
        url: urlData.publicUrl,
        storagePath,
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('[FeedbackWidget] Screenshot API error:', error);
    return NextResponse.json(
      { error: 'Server error. Please try again.' },
      { status: 500, headers: corsHeaders }
    );
  }
}

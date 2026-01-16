import { NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const VALID_ENVS = new Set(['alpha', 'beta', 'dev', 'stable']);

export const runtime = 'nodejs';

function normalizeEnv(value: string | null): string | null {
  if (!value) return null;
  const normalized = value.toLowerCase();
  return VALID_ENVS.has(normalized) ? normalized : null;
}

function readEnvValue(key: string, env: string | null): string | undefined {
  if (env) {
    const scopedKey = `${key}_${env.toUpperCase()}`;
    if (typeof process.env[scopedKey] !== 'undefined') {
      return process.env[scopedKey];
    }
  }
  if (typeof process.env[key] !== 'undefined') {
    return process.env[key];
  }
  return undefined;
}

function parseFlags(raw: string | undefined): Record<string, boolean> {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return Object.fromEntries(
        Object.entries(parsed).map(([key, value]) => [key, Boolean(value)])
      );
    }
  } catch {
    // ignore malformed JSON
  }
  return {};
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const env = normalizeEnv(url.searchParams.get('env'));
  const appId = url.searchParams.get('app') || '';

  const killSwitch = readEnvValue('WIDGET_KILL_SWITCH', env);
  const enabledOverride = readEnvValue('WIDGET_ENABLED', env);
  const apiBaseUrl = readEnvValue('WIDGET_API_BASE_URL', env);
  const version = readEnvValue('WIDGET_VERSION', env) ?? 'unknown';
  const flags = parseFlags(readEnvValue('WIDGET_FLAGS', env));

  let enabled = true;
  if (enabledOverride !== undefined) {
    enabled = !['false', '0'].includes(enabledOverride.toLowerCase());
  }
  if (killSwitch !== undefined) {
    if (['true', '1'].includes(killSwitch.toLowerCase())) {
      enabled = false;
    }
  }

  const fallbackBaseUrl = `${url.protocol}//${url.host}`;

  return NextResponse.json(
    {
      enabled,
      env,
      appId,
      apiBaseUrl: apiBaseUrl || fallbackBaseUrl,
      version,
      flags,
    },
    { headers: corsHeaders }
  );
}

import { createRoot, Root } from 'react-dom/client';
import { FeedbackWidget } from '../components/FeedbackWidget';
import {
  FeedbackWidgetConfig,
  WidgetEnv,
  WidgetPosition,
  initConfig,
} from '../components/FeedbackWidget/utils/config';

type WidgetGlobalApi = {
  init: (config: FeedbackWidgetConfig) => void;
  mount: (config?: FeedbackWidgetConfig) => void;
  unmount: () => void;
};

declare global {
  interface Window {
    FeedbackWidget?: WidgetGlobalApi;
  }
}

const WIDGET_CONTAINER_ID = 'feedback-widget-root';
const VALID_POSITIONS: WidgetPosition[] = [
  'bottom-right',
  'bottom-left',
  'top-right',
  'top-left',
];
const VALID_ENVS: WidgetEnv[] = ['alpha', 'beta', 'dev', 'stable'];

let root: Root | null = null;
let container: HTMLElement | null = null;
let pendingConfig: FeedbackWidgetConfig | null = null;

function findScriptTag(): HTMLScriptElement | null {
  if (typeof document === 'undefined') return null;
  const current = document.currentScript;
  if (current && current.tagName === 'SCRIPT') {
    return current as HTMLScriptElement;
  }

  const scripts = Array.from(document.getElementsByTagName('script'));
  return (
    scripts.find((script) => script.dataset.appId) ??
    scripts.find((script) => script.dataset.feedbackWidget !== undefined) ??
    null
  );
}

function parsePosition(value?: string): WidgetPosition | undefined {
  if (!value) return undefined;
  return VALID_POSITIONS.includes(value as WidgetPosition)
    ? (value as WidgetPosition)
    : undefined;
}

function parseEnv(value?: string): WidgetEnv | undefined {
  if (!value) return undefined;
  const normalized = value.toLowerCase();
  return VALID_ENVS.includes(normalized as WidgetEnv)
    ? (normalized as WidgetEnv)
    : undefined;
}

function getApiBaseUrlFromScript(script: HTMLScriptElement | null): string | undefined {
  if (!script) return undefined;

  let apiBaseUrl = script.dataset.apiBase?.trim();
  if (!apiBaseUrl && script.src) {
    try {
      apiBaseUrl = new URL(script.src, window.location.href).origin;
    } catch {
      apiBaseUrl = undefined;
    }
  }

  return apiBaseUrl;
}

function getEnvFromScript(script: HTMLScriptElement | null): WidgetEnv | undefined {
  if (!script) return undefined;
  return parseEnv(script.dataset.env);
}

function parseConfigFromScript(script: HTMLScriptElement | null): FeedbackWidgetConfig | null {
  if (!script) return null;

  const appId = script.dataset.appId?.trim();
  if (!appId) return null;

  const position = parsePosition(script.dataset.position);
  const env = getEnvFromScript(script);
  const apiBaseUrl = getApiBaseUrlFromScript(script);

  return {
    appId,
    position,
    env,
    apiBaseUrl,
  };
}

function applyScriptDefaults(config: FeedbackWidgetConfig): FeedbackWidgetConfig {
  const script = findScriptTag();
  return {
    ...config,
    env: config.env ?? getEnvFromScript(script),
    apiBaseUrl: config.apiBaseUrl ?? getApiBaseUrlFromScript(script),
  };
}

type RemoteWidgetConfig = {
  enabled?: boolean;
  apiBaseUrl?: string;
  version?: string;
  flags?: Record<string, boolean>;
};

async function loadRemoteConfig(
  config: FeedbackWidgetConfig
): Promise<RemoteWidgetConfig | null> {
  const apiBaseUrl = config.apiBaseUrl || window.location.origin;
  const url = new URL('/api/config', apiBaseUrl);
  url.searchParams.set('app', config.appId);
  if (config.env) {
    url.searchParams.set('env', config.env);
  }

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit',
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as RemoteWidgetConfig;
  } catch {
    return null;
  }
}

function ensureContainer(): HTMLElement {
  if (container && document.body.contains(container)) {
    return container;
  }

  const existing = document.getElementById(WIDGET_CONTAINER_ID);
  if (existing) {
    container = existing;
    return existing;
  }

  const nextContainer = document.createElement('div');
  nextContainer.id = WIDGET_CONTAINER_ID;
  document.body.appendChild(nextContainer);
  container = nextContainer;
  return nextContainer;
}

function init(config: FeedbackWidgetConfig): void {
  const mergedConfig = applyScriptDefaults(config);

  initConfig(mergedConfig);
  pendingConfig = mergedConfig;
}

function mount(config?: FeedbackWidgetConfig): void {
  if (typeof document === 'undefined') {
    return;
  }
  const initialConfig = config ?? pendingConfig ?? parseConfigFromScript(findScriptTag());
  if (!initialConfig) {
    console.error('[FeedbackWidget] Missing config. Provide appId to mount the widget.');
    return;
  }

  const resolvedConfig = applyScriptDefaults(initialConfig);

  if (!document.body) {
    window.addEventListener('DOMContentLoaded', () => mount(resolvedConfig), {
      once: true,
    });
    return;
  }

  void (async () => {
    const remoteConfig = await loadRemoteConfig(resolvedConfig);
    if (remoteConfig?.enabled === false) {
      console.info('[FeedbackWidget] Widget disabled by remote config.');
      return;
    }

    const mergedConfig = {
      ...resolvedConfig,
      apiBaseUrl: remoteConfig?.apiBaseUrl ?? resolvedConfig.apiBaseUrl,
    };

    try {
      initConfig(mergedConfig);
    } catch (error) {
      console.error('[FeedbackWidget] Invalid config.', error);
      return;
    }

    pendingConfig = mergedConfig;

    if (!root) {
      root = createRoot(ensureContainer());
    }

    root.render(<FeedbackWidget />);
  })();
}

function unmount(): void {
  if (root) {
    root.unmount();
    root = null;
  }

  if (container) {
    container.remove();
    container = null;
  }
}

function registerGlobalApi(): void {
  const api: WidgetGlobalApi = { init, mount, unmount };
  if (window.FeedbackWidget) {
    window.FeedbackWidget = { ...window.FeedbackWidget, ...api };
  } else {
    window.FeedbackWidget = api;
  }
}

if (typeof window !== 'undefined') {
  registerGlobalApi();
  const autoConfig = parseConfigFromScript(findScriptTag());
  if (autoConfig) {
    mount(autoConfig);
  }
}

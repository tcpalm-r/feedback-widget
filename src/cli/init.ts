import * as fs from 'node:fs';
import * as path from 'node:path';
import * as readline from 'node:readline';

const PACKAGE_NAME = '@danainnovations/feedback-widget';
const COMPONENT_NAME = 'FeedbackWidget';
const DEFAULT_API_BASE = 'https://feedback-widget-alpha-ten.vercel.app';

type Framework = 'nextjs-app' | 'nextjs-pages' | 'vite-cra' | 'unknown';

interface DetectionResult {
  framework: Framework;
  targetFile: string | null;
  isTypeScript: boolean;
}

// --- File helpers ---

function fileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

function findFirst(cwd: string, candidates: string[]): string | null {
  for (const rel of candidates) {
    const abs = path.join(cwd, rel);
    if (fileExists(abs)) return rel;
  }
  return null;
}

function hasConfigFile(cwd: string, basenames: string[]): boolean {
  return basenames.some((name) => fileExists(path.join(cwd, name)));
}

// --- Framework detection ---

const NEXTJS_APP_ROUTER_FILES = [
  'src/app/layout.tsx', 'src/app/layout.jsx', 'src/app/layout.js',
  'app/layout.tsx', 'app/layout.jsx', 'app/layout.js',
];

const NEXTJS_PAGES_ROUTER_FILES = [
  'src/pages/_app.tsx', 'src/pages/_app.jsx', 'src/pages/_app.js',
  'pages/_app.tsx', 'pages/_app.jsx', 'pages/_app.js',
];

const VITE_CRA_FILES = [
  'src/App.tsx', 'src/App.jsx', 'src/App.js',
  'src/main.tsx', 'src/main.jsx', 'src/main.js',
];

function detectFramework(cwd: string): DetectionResult {
  const isNextjs = hasConfigFile(cwd, [
    'next.config.js', 'next.config.mjs', 'next.config.ts',
  ]);

  if (isNextjs) {
    const appRouterFile = findFirst(cwd, NEXTJS_APP_ROUTER_FILES);
    if (appRouterFile) {
      return {
        framework: 'nextjs-app',
        targetFile: appRouterFile,
        isTypeScript: appRouterFile.endsWith('.tsx') || appRouterFile.endsWith('.ts'),
      };
    }

    const pagesRouterFile = findFirst(cwd, NEXTJS_PAGES_ROUTER_FILES);
    if (pagesRouterFile) {
      return {
        framework: 'nextjs-pages',
        targetFile: pagesRouterFile,
        isTypeScript: pagesRouterFile.endsWith('.tsx') || pagesRouterFile.endsWith('.ts'),
      };
    }
  }

  const isVite = hasConfigFile(cwd, [
    'vite.config.js', 'vite.config.ts', 'vite.config.mjs',
  ]);

  if (isVite) {
    const viteFile = findFirst(cwd, VITE_CRA_FILES);
    if (viteFile) {
      return {
        framework: 'vite-cra',
        targetFile: viteFile,
        isTypeScript: viteFile.endsWith('.tsx') || viteFile.endsWith('.ts'),
      };
    }
  }

  // Check for CRA (react-scripts in package.json)
  const pkgPath = path.join(cwd, 'package.json');
  if (fileExists(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      if (deps['react-scripts']) {
        const craFile = findFirst(cwd, VITE_CRA_FILES);
        if (craFile) {
          return {
            framework: 'vite-cra',
            targetFile: craFile,
            isTypeScript: craFile.endsWith('.tsx') || craFile.endsWith('.ts'),
          };
        }
      }
    } catch {
      // ignore parse errors
    }
  }

  return { framework: 'unknown', targetFile: null, isTypeScript: false };
}

// --- Idempotency ---

function isAlreadyInstalled(content: string): boolean {
  return content.includes(PACKAGE_NAME) || content.includes(`<${COMPONENT_NAME}`);
}

// --- Import injection ---

function findLastImportEnd(content: string): number {
  const lines = content.split('\n');
  let lastImportEndLine = -1;
  let inMultiLineImport = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (inMultiLineImport) {
      if (line.includes('from ') || line.match(/}\s*from\s/)) {
        lastImportEndLine = i;
        inMultiLineImport = false;
      }
      continue;
    }

    if (/^\s*import\s/.test(line)) {
      if (line.includes('from ') || line.includes("'") || line.includes('"')) {
        lastImportEndLine = i;
        // Check if it's a multi-line import (has { but no })
        if (line.includes('{') && !line.includes('}')) {
          inMultiLineImport = true;
        }
      } else {
        inMultiLineImport = true;
      }
    }
  }

  return lastImportEndLine;
}

function injectImport(content: string): string {
  const importLine = `import { ${COMPONENT_NAME} } from '${PACKAGE_NAME}';`;
  const lastImportLine = findLastImportEnd(content);

  if (lastImportLine >= 0) {
    const lines = content.split('\n');
    lines.splice(lastImportLine + 1, 0, importLine);
    return lines.join('\n');
  }

  // No imports found — add at top, after 'use client' if present
  const useClientMatch = content.match(/^(['"])use client\1;?\s*\n/);
  if (useClientMatch) {
    const pos = useClientMatch[0].length;
    return content.slice(0, pos) + importLine + '\n' + content.slice(pos);
  }

  return importLine + '\n' + content;
}

// --- Component injection ---

function injectComponent(content: string, appId: string, framework: Framework): { content: string; success: boolean } {
  const widgetJsx = `<${COMPONENT_NAME} appId="${appId}" apiBaseUrl="${DEFAULT_API_BASE}" />`;

  switch (framework) {
    case 'nextjs-app': {
      // Insert after {children} inside <body>
      const childrenRegex = /({\s*children\s*})/;
      if (childrenRegex.test(content)) {
        const match = content.match(childrenRegex)!;
        const matchIndex = content.indexOf(match[0]);
        const lineStart = content.lastIndexOf('\n', matchIndex);
        const indent = content.slice(lineStart + 1, matchIndex).match(/^(\s*)/)?.[1] ?? '        ';
        return {
          content: content.replace(childrenRegex, `$1\n${indent}${widgetJsx}`),
          success: true,
        };
      }
      // Fallback: before </body>
      if (content.includes('</body>')) {
        return {
          content: content.replace('</body>', `  ${widgetJsx}\n        </body>`),
          success: true,
        };
      }
      return { content, success: false };
    }

    case 'nextjs-pages': {
      // Find <Component and add widget as sibling
      const componentRegex = /(<Component\s[^>]*\/>)/;
      if (componentRegex.test(content)) {
        const match = content.match(componentRegex)!;
        const matchIndex = content.indexOf(match[0]);
        const lineStart = content.lastIndexOf('\n', matchIndex);
        const indent = content.slice(lineStart + 1, matchIndex).match(/^(\s*)/)?.[1] ?? '      ';

        // Check if already wrapped in fragment
        const beforeComponent = content.slice(0, matchIndex).trimEnd();
        if (beforeComponent.endsWith('<>') || beforeComponent.match(/<\w+[^>]*>\s*$/)) {
          // Already has a wrapper — just add widget after Component
          return {
            content: content.replace(componentRegex, `$1\n${indent}${widgetJsx}`),
            success: true,
          };
        }

        // Wrap in fragment
        return {
          content: content.replace(
            componentRegex,
            `<>\n${indent}  $1\n${indent}  ${widgetJsx}\n${indent}</>`
          ),
          success: true,
        };
      }
      return { content, success: false };
    }

    case 'vite-cra': {
      // Find the return statement's closing tag and add before it
      // Look for the last closing tag before the final )
      const returnMatch = content.match(/return\s*\(\s*\n/);
      if (returnMatch) {
        const returnIndex = content.indexOf(returnMatch[0]);
        const afterReturn = content.slice(returnIndex + returnMatch[0].length);
        // Find the opening tag
        const tagMatch = afterReturn.match(/^(\s*)(<\w+[^>]*>)/);
        if (tagMatch) {
          const indent = tagMatch[1] + '  ';
          const insertAfter = returnIndex + returnMatch[0].length + tagMatch[0].length;
          return {
            content: content.slice(0, insertAfter) + `\n${indent}${widgetJsx}` + content.slice(insertAfter),
            success: true,
          };
        }
      }
      return { content, success: false };
    }

    default:
      return { content, success: false };
  }
}

// --- User prompts ---

function ask(question: string, defaultValue?: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const suffix = defaultValue ? ` (${defaultValue})` : '';

  return new Promise((resolve) => {
    rl.question(`  ${question}${suffix}: `, (answer) => {
      rl.close();
      resolve(answer.trim() || defaultValue || '');
    });
  });
}

// --- CLI arg parsing ---

function parseArgs(argv: string[]): { command: string; appId?: string } {
  const args = argv.slice(2);
  const command = args[0] ?? 'init';
  let appId: string | undefined;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--appId' && args[i + 1]) {
      appId = args[i + 1];
    }
  }

  return { command, appId };
}

// --- Manual instructions fallback ---

function printManualInstructions(appId: string): void {
  console.log(`
  Could not automatically inject the widget. Please add manually:

  1. Add this import to your root layout/app file:

     import { ${COMPONENT_NAME} } from '${PACKAGE_NAME}';

  2. Add this component inside your JSX:

     <${COMPONENT_NAME} appId="${appId}" apiBaseUrl="${DEFAULT_API_BASE}" />
`);
}

function printScriptTagInstructions(appId: string): void {
  console.log(`
  No React framework detected.

  You can add the widget via a script tag in your HTML:

  <script
    src="https://unpkg.com/${PACKAGE_NAME}/dist/entry.iife.js"
    data-app-id="${appId}"
    data-position="top-right"
  ></script>
`);
}

// --- Version ---

function getVersion(): string {
  try {
    const pkgPath = path.resolve(__dirname, '..', 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    return pkg.version ?? '0.0.0';
  } catch {
    return '0.0.0';
  }
}

// --- Main ---

async function runInit(cliAppId?: string): Promise<void> {
  const cwd = process.cwd();
  const version = getVersion();

  console.log(`\n  ${PACKAGE_NAME} v${version}\n`);

  // Detect framework
  console.log('  Detecting framework...');
  const detection = detectFramework(cwd);

  const dirName = path.basename(cwd);
  const appId = cliAppId ?? dirName;

  if (detection.framework === 'unknown' || !detection.targetFile) {
    printScriptTagInstructions(appId);
    return;
  }

  const frameworkNames: Record<Framework, string> = {
    'nextjs-app': 'Next.js (App Router)',
    'nextjs-pages': 'Next.js (Pages Router)',
    'vite-cra': 'Vite / Create React App',
    'unknown': 'Unknown',
  };

  console.log(`  Found: ${frameworkNames[detection.framework]}`);
  console.log(`  Target: ${detection.targetFile}\n`);

  const absTarget = path.join(cwd, detection.targetFile);
  let content = fs.readFileSync(absTarget, 'utf-8');

  // Idempotency check
  if (isAlreadyInstalled(content)) {
    console.log(`  ${COMPONENT_NAME} is already installed in ${detection.targetFile}. Skipping.\n`);
    return;
  }

  // appId resolved above from --appId flag or directory name

  // Inject import
  content = injectImport(content);

  // Inject component
  const result = injectComponent(content, appId, detection.framework);

  if (!result.success) {
    // Write the import at least, then show manual component instructions
    fs.writeFileSync(absTarget, content, 'utf-8');
    console.log(`  Added import to ${detection.targetFile}.`);
    printManualInstructions(appId);
    return;
  }

  // Write the file
  fs.writeFileSync(absTarget, result.content, 'utf-8');

  console.log(`\n  Done! ${COMPONENT_NAME} added to ${detection.targetFile}.\n`);
  console.log('  Start your dev server to see the widget.\n');
}

async function main(): Promise<void> {
  const { command, appId } = parseArgs(process.argv);

  switch (command) {
    case 'init':
      await runInit(appId);
      break;
    case '--help':
    case '-h':
      console.log(`
  Usage: npx ${PACKAGE_NAME} init [--appId <name>]

  Commands:
    init          Add FeedbackWidget to your project

  Options:
    --appId       Project identifier (defaults to directory name)
    --help, -h    Show this help message
    --version, -v Show version
`);
      break;
    case '--version':
    case '-v':
      console.log(getVersion());
      break;
    default:
      console.error(`  Unknown command: ${command}\n`);
      console.log(`  Run: npx ${PACKAGE_NAME} --help\n`);
      process.exit(1);
  }
}

main().catch((err) => {
  console.error('  Error:', err.message);
  process.exit(1);
});

# Feedback Widget Integration (Quick Copy)

## Drop-in (Next.js App Router)

```tsx
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Script
          src="https://feedback-widget-alpha-ten.vercel.app/widget.js"
          strategy="afterInteractive"
          data-app-id="my-app"
          data-position="bottom-left"
        />
      </body>
    </html>
  );
}
```

## Drop-in (Any App)

```html
<script
  src="https://feedback-widget-alpha-ten.vercel.app/widget.js"
  data-app-id="my-app"
  data-position="bottom-left"
></script>
```

## Required

- `data-app-id`

## Optional

- `data-position` (`bottom-right`, `bottom-left`, `top-right`, `top-left`)
- `data-env` (`alpha`, `beta`, `dev`, `stable`)
- `data-api-base` (override API base URL)

## CSP (only if strict)

- `script-src` and `connect-src` → `https://feedback-widget-alpha-ten.vercel.app`
- `img-src` → `blob:`
- `style-src 'unsafe-inline'`

# Development guide

## Prerequisites and installation

Use Node.js 20.9 or newer and npm. Install from the committed lockfile:

```bash
npm ci
```

For day-to-day local work:

```bash
npm run dev
```

The default command is `next dev --webpack`. `npm run dev:turbo` is available for testing the default Next.js development bundler, but validate animation-heavy changes with the standard webpack command before handoff.

## Scripts

| Command | Behavior |
| --- | --- |
| `npm run dev` | Starts Next.js development with webpack |
| `npm run dev:turbo` | Starts the default Next.js development server |
| `npm run build` | Builds/exports to `out/`, then removes AppleDouble files |
| `npm run start` | Runs `next start`; not the normal deployment path for static export |
| `npm run lint` | Runs ESLint across the repository |
| `npm run optimize` | Uses Sharp to rewrite eligible local images as optimized WebP |
| `npm run clean:appledouble` | Recursively removes `._*` files outside `.git`, `node_modules`, and `.next` |
| `npm run export` | Legacy script using `next export`; modern Next.js exports through `next build` when `output: "export"` is set |

The optimizer scans `public/images`, `public/case-studies`, and `public/team`. Most current media is remote S3 content, so absent local directories are skipped. It avoids files already ending in `.webp`, writes near-lossless WebP at quality 95, and deletes each original only after successful output.

## Configuration

### TypeScript

`tsconfig.json` enables strict checking, supports `.js/.jsx` through `allowJs`, uses bundler resolution, and maps `@/*` to the repository root. No output is emitted by TypeScript; Next.js owns compilation.

Use the alias for deep imports when it improves clarity, but follow the local convention in the file being edited. New application logic should prefer TypeScript unless it extends an existing JS data module.

### ESLint

`eslint.config.mjs` uses the Next.js Core Web Vitals and TypeScript flat configurations and ignores generated Next.js artifacts. Run lint before every handoff.

### Tailwind and PostCSS

`postcss.config.mjs` enables `@tailwindcss/postcss`. Tailwind 4 is imported from `app/globals.css`; there is no traditional `tailwind.config.js` in this project.

### Next.js version rule

This repository explicitly requires reading the installed documentation in `node_modules/next/dist/docs/` before changing framework behavior. Relevant starting points are:

- `01-app/01-getting-started/02-project-structure.md`
- `01-app/01-getting-started/03-layouts-and-pages.md`
- `01-app/01-getting-started/05-server-and-client-components.md`
- `01-app/01-getting-started/14-metadata-and-og-images.md`
- `01-app/01-getting-started/17-deploying.md`
- `01-app/02-guides/static-exports.md`

Use the installed guide rather than assumptions from older Next.js releases.

## Environment setup

Create `.env.local` only if analytics integrations need testing:

```dotenv
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_CLARITY_ID=
NEXT_PUBLIC_META_PIXEL_ID=
```

Do not commit real environment-specific values. All current values are browser-visible IDs, not secrets. If a future integration introduces a secret, it cannot safely be used from these Client Components and generally needs an external backend or a non-static deployment.

## Recommended change workflow

1. Read `AGENTS.md` and the relevant installed Next.js documentation.
2. Search for all consumers of the component, data field, route, or data attribute being changed.
3. Preserve unrelated working-tree changes.
4. Implement the smallest cohesive change.
5. Run `npm run lint`.
6. Run `npm run build` for routing, metadata, configuration, or content changes.
7. Verify desktop and mobile layouts, keyboard use, reduced motion, refresh, internal navigation, and browser back behavior.

## Validation matrix

| Change | Minimum validation |
| --- | --- |
| Copy or simple style | Lint and relevant responsive page |
| Content record or S3 asset | Lint, build, generated route, network/media check |
| Client interaction | Lint plus mouse, touch, and keyboard behavior |
| Animation/scroll | Desktop Lenis, native mobile, reduced motion, resize, cleanup after navigation |
| Route or metadata | Build, inspect `out/`, direct URL load, internal link, back navigation |
| Consent/analytics | Fresh cookie state, accept/reject/custom preferences, script presence/absence |
| Configuration/dependencies | Clean install where practical, lint, full build |

There is no automated test command. Build and focused browser verification are currently the regression gates.

## Static export checks

After `npm run build`, confirm that:

- `out/index.html` exists;
- each expected static route has a directory and `index.html`;
- every portfolio and campaign slug was generated;
- direct navigation works through a static server rather than only the dev server;
- `/_next/` assets and local fonts resolve;
- remote S3 images and video load from the deployed origin.

Do not open exported HTML with a `file://` URL; use a local HTTP static server.

## Accessibility expectations

- Maintain visible focus states and logical heading order.
- Use semantic links for navigation and buttons for actions.
- Preserve the cookie modal's focus trap, Escape behavior, labels, and focus return.
- Provide useful image alt text; mark decorative layers with `aria-hidden`.
- Ensure custom selects retain an actual form value and keyboard support.
- Test `prefers-reduced-motion`; desktop smooth scrolling already falls back to native behavior.
- Check contrast when using low-opacity text on black backgrounds.

## Performance guidance

- Keep Server Components server-side when interactivity is unnecessary.
- Avoid adding large libraries to shared client boundaries such as `AppShell`.
- Use appropriate image dimensions, formats, loading priority, and responsive `sizes`.
- Optimize S3 media before upload; the local optimizer does not process remote objects.
- Avoid creating overlapping GSAP/ScrollTrigger instances during resize or navigation.
- Prefer CSS transitions for simple hover states and reserve JS animation for choreography.
- Recheck mobile memory use when adding video or large galleries.

## Troubleshooting

### A page exists in development but not in the export

For dynamic routes, verify its slug is returned by `generateStaticParams()`. Portfolio records are filtered out when no corresponding `s3PortfolioProjects` entry exists.

### An S3 image fails

Check the exact case, spaces, punctuation, and folder name. Use the S3 helpers rather than manually concatenating an unencoded path. If the hostname changed, update `next.config.ts`.

### A reveal never appears

Check whether the element waits for `adverto:page-transition-complete`, has an initial hidden style, or sits inside a pinned/overflowed ancestor. Also confirm the preloader and route loading cover reached completion.

### Scroll position returns incorrectly

Confirm restoration data attributes still exist, image dimensions are stable, and the navigation link uses the appropriate project/service helper. Test direct entry separately from returning with the browser back button.

### ScrollTrigger positions drift

Check late-loading fonts/media, pin container height, and timeline cleanup. Refresh ScrollTrigger only after layout settles, and ensure a resize did not leave an old instance alive.

### Analytics does not load

Confirm the environment ID exists at build time, the relevant consent is enabled, and the script was not blocked by privacy tooling or Content Security Policy. Analytics intentionally does not load before consent.

### Git reports dubious ownership

This can occur on filesystems that do not record ownership. Configure the repository as safe in the local Git installation only if you trust the workspace; this is an environment setting, not a project source change.

## Dependency and architecture notes

- The project imports `lenis`; `@studio-freight/lenis` appears to be a leftover dependency.
- `next export` is obsolete in the current static-export model; use `npm run build`.
- The application mixes native images and `next/image` deliberately, but new work should choose based on layout and animation needs.
- The contact form needs an external endpoint or changed deployment model before it can submit data.
- Avoid changing existing public slugs without redirects, especially the `campigns` spelling and uppercase `POTOGO` route.

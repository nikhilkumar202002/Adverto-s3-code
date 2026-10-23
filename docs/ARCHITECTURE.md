# Project architecture

## 1. System overview

This repository is a marketing website implemented with the Next.js App Router. Pages are rendered at build time and exported as static HTML, CSS, and JavaScript. Browser-side React is used for navigation state, smooth scrolling, scroll restoration, consent management, animation, and interactive controls.

```text
Build-time content modules
        |
        v
Next.js Server Components ----> static HTML and route payloads
        |                                  |
        | serializable props               v
        +------------------------> Client Components
                                             |
                 GSAP / Framer Motion / Lenis / browser storage

Public SVGs and fonts --------------------> static host
AWS S3 asset catalog ---------------------> visitor browser
Consent-approved analytics providers ----> third-party scripts
```

There is no database or internal API. Content changes are code changes, and most media is fetched directly from AWS S3 by the visitor's browser.

## 2. Framework and build model

`next.config.ts` defines the production contract:

- `output: "export"` writes a deployable static site to `out/`.
- `trailingSlash: true` emits directory-style paths such as `portfolio/index.html`.
- `images.unoptimized: true` avoids the Next.js image optimization server, which is unavailable in a static deployment.
- `remotePatterns` permits the project's S3 bucket for `next/image`.
- `transpilePackages: ["gsap"]` ensures GSAP compatibility.

Dynamic portfolio and campaign routes implement `generateStaticParams()`. Every slug must be known during the build. A newly added record becomes a new exported page on the next build.

Because this is a static export, do not assume request-time server rendering exists. Features requiring cookies on the server, server actions, dynamic route generation at request time, or route handlers with server state require an architectural change or an external service.

## 3. Root rendering tree

`app/layout.tsx` is the root Server Component. It:

1. Imports global CSS.
2. defines default metadata and icons.
3. preloads four core Creato Display font files.
4. wraps all routes in `CookieProvider` and `AppShell`.

`CookieProvider` and `AppShell` are client boundaries. The effective shared UI is:

```text
RootLayout
└── CookieProvider
    ├── AppShell
    │   ├── SmoothScroll
    │   │   ├── NavigationRestoration
    │   │   ├── NoiseOverlay
    │   │   ├── CustomCursor
    │   │   ├── Navbar
    │   │   ├── RouteLoadingCover
    │   │   ├── route content
    │   │   ├── ScrollTopWhatsapp
    │   │   └── Footer
    │   └── Preloader
    ├── CookieBanner (conditional)
    └── CookieModal (conditional)
```

`app/loading.tsx` is the route-level loading UI. The client-side `RouteLoadingCover` separately covers internal navigation transitions and communicates readiness to animation components.

## 4. Routes

### Public content routes

| Route | Source | Rendering and composition |
| --- | --- | --- |
| `/` | `app/page.tsx` | Homepage: hero, case studies, services, story, clients, banner, team animation, FAQ |
| `/portfolio/` | `app/portfolio/page.tsx` | Server wrapper passing project records into an interactive filtered work index |
| `/portfolio/[slug]/` | `app/portfolio/[slug]/page.tsx` | 33 build-time pages with metadata, hero, facts, and responsive gallery |
| `/campigns/` | `app/campigns/page.jsx` | Campaign index |
| `/campigns/[slug]/` | `app/campigns/[slug]/page.jsx` | Build-time campaign pages with gallery |
| `/service/` | `app/service/page.tsx` | Service overview and links to four details |
| `/services/branding/` | `app/services/branding/page.tsx` | Shared `ServiceDetailPage` with the branding record |
| `/services/advertising/` | `app/services/advertising/page.tsx` | Shared detail template with campaign/identity record |
| `/services/social/` | `app/services/social/page.tsx` | Shared detail template with social record |
| `/services/video/` | `app/services/video/page.tsx` | Shared detail template with media production record |
| `/about-us/` | `app/about-us/page.tsx` | Agency story, process, featured work, and clients |
| `/our-team/` | `app/our-team/page.tsx` | Team hero and nine-member grid |
| `/contact-us/` | `app/contact-us/page.tsx` | Contact methods, enquiry form UI, and response process |
| `/privacy-policy/` | `app/privacy-policy/page.tsx` | Static policy content |
| `/terms-and-conditions/` | `app/terms-and-conditions/page.tsx` | Static terms content |

### Compatibility redirects

`/about/`, `/contact/`, `/team/`, and `/services/` call `redirect()` to `/about-us/`, `/contact-us/`, `/our-team/`, and `/service/` respectively. Navigation intentionally uses the short compatibility paths, while active-state matching accepts both path variants.

Under a static export, verify the generated redirect behavior on the selected host. Hosts differ in how they interpret exported redirect pages and clean URLs.

### Naming caveat

`campigns` is misspelled at both the filesystem and URL level. It is internally consistent and therefore functional. A correction should include a new `/campaigns` route, updates to links, and host-level redirects for old indexed URLs.

## 5. Server and client boundaries

Pages and simple presentational components are Server Components unless marked with `"use client"`. Client Components are used where browser APIs, hooks, context, or animation libraries are required.

Major client boundaries include:

- the shared `AppShell` and consent provider;
- navbar and mobile menu state;
- homepage animation sections;
- portfolio filtering and gallery layout;
- service video presentation;
- page-transition and scroll-restoration helpers;
- cookie UI and analytics injection.

Keep new client boundaries as narrow as practical. Anything imported beneath a client boundary becomes part of the client module graph.

## 6. Animation and scrolling

The application has three complementary motion systems:

- **Framer Motion** drives viewport reveals, headings, accordion changes, hover/tap interactions, and section choreography.
- **GSAP** drives the preloader, cookie transitions, and the pinned 3D TeamSection sequence. `ScrollTrigger` connects GSAP timelines to scrolling.
- **Lenis** provides smooth scrolling for fine-pointer desktop devices.

`SmoothScroll` deliberately uses native scrolling for screens below 768px, coarse pointers, and `prefers-reduced-motion`. It listens for the `adverto:scroll-to` custom event so restoration logic can use one API regardless of scroll engine.

`TeamSection.jsx` creates and destroys its ScrollTrigger timeline inside `gsap.context`. Desktop cards advance in pairs; mobile cards advance sequentially. Width-only resize changes rebuild the timeline after a debounce. The section pins its sticky viewport and reveals “The Quiet Force” after cards fade.

When modifying scroll-bound sections:

- clean up every event listener, timer, GSAP context, and ScrollTrigger;
- call `ScrollTrigger.refresh()` only after layout-affecting changes settle;
- test native mobile scroll and desktop Lenis separately;
- test reduced-motion behavior;
- avoid relying on initial DOM opacity without a no-JavaScript fallback decision.

## 7. Navigation and restoration

Navigation behavior is intentionally more involved than standard App Router scrolling:

- `Navbar` hides on downward scroll, reappears upward, and can remain transparent over elements marked `data-navbar-transparent`.
- `RouteLoadingCover` captures internal anchor navigation and exposes page-transition state.
- `NavigationRestoration` saves and restores window and slider positions.
- `scrollRestoration.ts` stores snapshots in `sessionStorage`, keyed by URL and history state.
- Project and service back-link helpers coordinate returning to the prior list position.
- Restoration waits for document height, nearby images, fonts, and slider layout to stabilize, but cancels when the visitor expresses scroll/input intent.

Data attributes such as `data-scroll-section-id`, `data-scroll-card-id`, and `data-scroll-slider-id` are part of this internal restoration protocol. Do not rename or remove them without checking their consumers.

## 8. Consent and analytics

Consent is browser-only and stored in the `adverto_cookie_consent` cookie for 180 days with `SameSite=Lax`. Essential consent is always true; analytics, marketing, and preferences default to false.

On first visit, the provider waits until the preloader completes and then waits three seconds before showing the banner. Existing consent is loaded immediately on mount.

`app/lib/analytics.ts` injects providers only after the relevant consent:

| Consent | Provider | Environment variable |
| --- | --- | --- |
| Analytics | Google Analytics | `NEXT_PUBLIC_GA_MEASUREMENT_ID` |
| Analytics | Microsoft Clarity | `NEXT_PUBLIC_CLARITY_ID` |
| Marketing | Meta Pixel | `NEXT_PUBLIC_META_PIXEL_ID` |

The loader prevents duplicate insertion during a page session. Revoking consent prevents future first-time loading but does not currently remove a script already loaded in that session or delete provider-specific cookies. Account for this if regulatory requirements demand active withdrawal.

## 9. Styling

Tailwind CSS 4 is loaded through `@tailwindcss/postcss`. Most UI uses utility classes. `app/globals.css` contains:

- eight Creato Display `@font-face` declarations;
- resets and page-wide colors/type;
- reusable layout classes used by portfolio and other pages;
- responsive and motion-specific global rules.

CSS Modules are used for isolated, structurally complex features: cookie banner/modal, preloader, hero banner, case studies, services, and the GSAP team deck.

The visual system is predominantly black (`#050505`/`#030303`), off-white (`#EDEDED`), and electric blue (`#0000FF`), with 20px rounded cards and low-opacity white borders.

## 10. Media architecture

Local `public/` assets are limited to brand SVGs, `noise.svg`, and the Creato Display font family. Agency photography, portfolio images, campaign images, banners, videos, and client logos are mapped in `app/data/s3Assets.js` to a single eu-north-1 AWS S3 endpoint.

S3 paths are URL-encoded segment by segment, so spaces and unusual file names work. Object names remain case-sensitive. `next/image` is used in some routes, while native `<img>` and `<video>` elements are used where animation/layout needs direct behavior.

## 11. SEO and metadata

The root layout provides a title template, default description, language, and icons. About, contact, services, team, campaign, and legal routes define route-specific metadata. Dynamic portfolio and campaign pages generate metadata from content records.

There is currently no sitemap, robots file, canonical URL configuration, Open Graph image convention, or structured data implementation in the repository.

## 12. Deployment

Run `npm run build` and publish the complete `out/` directory to a static host. The host must:

- serve directory indexes for trailing-slash routes;
- serve UTF-8 HTML and JavaScript;
- allow outbound browser requests to the S3 asset host and enabled analytics providers;
- preserve generated asset paths under `/_next/`;
- provide redirects if canonical routes are changed.

`npm start` is not the normal production path for this configuration because `output: "export"` produces a static artifact. Preview `out/` with a local static server when validating host-like routing.

## 13. Known risks and technical debt

- Contact inputs are not connected to submission, validation, spam protection, or persistence.
- Duplicate route vocabulary (`service/services`, `about/about-us`, etc.) increases navigation complexity.
- Campaign URLs contain the `campigns` typo.
- Team content exists in both `our-team/page.tsx` and `TeamSection.jsx`, so edits can drift.
- Both `lenis` and the older `@studio-freight/lenis` package are installed, although the current code imports `lenis`.
- Mixed JS/JSX and strict TypeScript allow some content modules to avoid type checking.
- There is no automated test suite or CI configuration.
- Analytics withdrawal does not unload already injected scripts.
- SEO support lacks sitemap, robots, social cards, and structured data.

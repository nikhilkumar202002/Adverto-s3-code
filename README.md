# Adverto Frontend

Adverto Frontend is the public website for Adverto Ads, a creative advertising agency. It presents the agency's work, services, team, campaigns, contact information, and legal policies through an animation-led, responsive interface.

The application uses Next.js 16.2.6 and React 19.2.4 with the App Router. Production output is a fully static site generated in `out/`; there is no application server, database, authentication layer, or API route in this repository.

## Documentation

- [Project architecture](docs/ARCHITECTURE.md) — runtime model, routes, shared shell, animation and navigation systems, consent, analytics, and deployment.
- [Content and asset guide](docs/CONTENT_GUIDE.md) — how portfolio projects, campaigns, services, team members, FAQs, logos, and S3 media are managed.
- [Component catalog](docs/COMPONENTS.md) — responsibilities of shared, section, navigation, cookie, and page-specific components.
- [Development guide](docs/DEVELOPMENT.md) — setup, scripts, conventions, validation, troubleshooting, and safe change workflows.

## Quick start

Requirements:

- Node.js 20.9 or newer (the minimum documented by the installed Next.js version)
- npm (the lockfile is committed)

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The default development command uses webpack because GSAP and the existing animation code are tested with that path.

To validate a production build:

```bash
npm run lint
npm run build
```

The build command generates the static export in `out/` and removes macOS AppleDouble (`._*`) files.

## Environment variables

All integrations are optional. When an ID is absent, that analytics provider is simply not loaded.

```dotenv
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx
NEXT_PUBLIC_META_PIXEL_ID=xxxxxxxxxxxxxxxx
```

Google Analytics and Microsoft Clarity require analytics consent. Meta Pixel requires marketing consent. IDs are public browser configuration and must use the `NEXT_PUBLIC_` prefix.

## Main technology

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 App Router, static export |
| UI | React 19, TypeScript and JavaScript |
| Styling | Tailwind CSS 4, global CSS, CSS Modules |
| Motion | GSAP 3, ScrollTrigger, Framer Motion |
| Scrolling | Lenis with native mobile/reduced-motion fallback |
| Icons | Lucide React |
| Cookies | js-cookie and a custom consent provider |
| Media | Public local fonts/SVGs and an AWS S3 asset catalog |
| Image tooling | Sharp optimization script |

## Top-level structure

```text
app/                    Routes, components, data, hooks, and runtime utilities
  components/           Shared shell, reusable UI, and homepage sections
  data/                 Content records and S3 asset mapping
  lib/                  Analytics, preloader, and theme helpers
  services/             Service detail routes and shared detail UI
  portfolio/[slug]/     Statically generated portfolio detail pages
  campigns/[slug]/      Statically generated campaign detail pages
public/                 Local SVG branding, noise texture, and Creato Display fonts
scripts/                Image optimization utility
docs/                   Maintainer documentation
next.config.ts          Static-export, image, GSAP, and trailing-slash configuration
```

## Route summary

| URL | Purpose |
| --- | --- |
| `/` | Homepage |
| `/portfolio/` | Work index |
| `/portfolio/[slug]/` | Generated project detail pages |
| `/campigns/` | Campaign index (spelling retained by the codebase) |
| `/campigns/[slug]/` | Generated campaign detail pages |
| `/services/` | Redirects to `/service/` |
| `/service/` | Services overview |
| `/services/{branding,advertising,social,video}/` | Service detail pages |
| `/about/` | Redirects to `/about-us/` |
| `/about-us/` | Agency profile |
| `/team/` | Redirects to `/our-team/` |
| `/our-team/` | Team directory |
| `/contact/` | Redirects to `/contact-us/` |
| `/contact-us/` | Contact details and enquiry UI |
| `/privacy-policy/` | Privacy policy |
| `/terms-and-conditions/` | Terms and conditions |

See [Project architecture](docs/ARCHITECTURE.md) for route behavior and static-export implications.

## Important current limitations

- The contact form has no submit handler or backend endpoint; it is currently UI only.
- The public campaign path is spelled `/campigns`, not `/campaigns`. Renaming it requires redirects and updating internal links.
- Remote media availability and exact S3 object casing are runtime dependencies.
- Static export rules apply: server actions, request-time APIs, and other server-only features cannot be added without changing the deployment model.
- No automated unit, integration, or end-to-end test suite is currently configured.

## License

No license file is present. Treat the source code, branding, copy, and media as proprietary unless the project owner specifies otherwise.

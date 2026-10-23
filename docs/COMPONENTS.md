# Component catalog

The repository contains 42 TSX/JSX files under `app/components`. This catalog describes their intended responsibilities and highlights coupling that matters during maintenance.

## Shared application shell

| Component | Responsibility |
| --- | --- |
| `AppShell` | Composes all site-wide client UI and wraps route content in smooth scrolling |
| `Navbar` | Responsive primary navigation, active paths, transparency zones, scroll-direction visibility |
| `MobileMenu` | Mobile navigation overlay and open/close behavior |
| `NavLink` | Desktop navigation link presentation and navigation callback |
| `Footer` | Site CTA, social links, copyright, privacy, and terms links |
| `Preloader` / `usePreloader` | GSAP opening sequence, scroll lock, and global completion event |
| `RouteLoadingCover` | Visual cover and readiness state for internal route transitions |
| `NavigationRestoration` | Captures internal navigation and restores saved scroll/slider state |
| `SmoothScroll` | Lenis desktop scrolling, native accessibility/mobile fallback, ScrollTrigger updates |
| `CustomCursor` | Fine-pointer custom cursor treatment |
| `ScrollTopWhatsapp` | Conditional scroll-to-top control and persistent WhatsApp contact link |
| `NoiseOverlay` | Decorative global texture |

## Common UI primitives

| Component | Responsibility |
| --- | --- |
| `Container` | Consistent centered page width and horizontal padding |
| `Button` | Styled internal/external CTA variants |
| `Reveal` | Configurable Framer Motion viewport reveal with transition readiness |
| `InnerBannerHeading` | Animated line/word heading used on internal routes |
| `AnimatedText` | Reusable animated text entrance |
| `BlurFade` | Blur-and-fade entrance wrapper |
| `SectionTitle` | Standard section title/subtitle pair |
| `MagneticButton` | Pointer-following transform wrapper |
| `CustomSelect` | Accessible custom selection UI backed by a hidden/native form value |
| `GridLines` | Decorative line grid |
| `MarqueeText` | Repeated CSS marquee track |
| `InfiniteLogoSlider` | Continuous client-logo track |
| `InfiniteProjectSlider` | Project track with route links and restoration attributes |
| `Loader` | Small loading indicator |
| `usePageTransitionReady` | Delays entrances until route-cover state reports readiness |

`Reveal`, `InnerBannerHeading`, sliders, and route helpers participate in the transition/restoration system. Treat their data attributes and readiness props as behavior, not styling-only details.

## Homepage sections

| Component | Responsibility |
| --- | --- |
| `HeroSection` | Video-led homepage hero using portrait/landscape S3 media |
| `CaseStudiesSection` | Featured work collage/cards and campaign link |
| `ServicesSection` | Animated service overview cards |
| `StorySection` | Agency story and animated metrics/counters |
| `ClientLogo` | Client logo presentation |
| `HeroBanner` | Full-width visual agency/team banner using a CSS Module |
| `TeamSection/TeamSection` | Pinned GSAP 3D team card sequence; current homepage implementation |
| `FaqSection` | Animated FAQ accordion |
| `CtaSection` | Reusable project/portfolio call to action, not in the current home composition |
| `AboutScrolling` | About-page scrolling story |
| `FeaturedWorksSlider` | About-page featured project marquee/slider |
| `HowItsWork` | Process explanation |
| `TeamSection_1` | Alternate team grid implementation; not the homepage import |

## Cookie consent

| Module | Responsibility |
| --- | --- |
| `CookieProvider` | Context state, persisted consent, display timing, analytics trigger |
| `CookieBanner` | Initial accept/reject/customize prompt with GSAP transition |
| `CookieModal` | Keyboard-contained preference dialog with essential/analytics/marketing/preferences controls |
| `cookieStore.ts` | Cookie schema, defaults, parsing, and 180-day persistence |
| `useCookieConsent` | Typed access to the context |

The modal includes focus trapping and Escape handling. Preserve dialog semantics and focus restoration when changing it.

## Page-specific components

These are colocated outside `app/components` because they serve one route family:

| Component | Route family | Responsibility |
| --- | --- | --- |
| `AboutHeroTitle` | About | Animated hero copy |
| `PortfolioPageContent` | Portfolio | Client-side portfolio index and category filtering |
| `ProjectGallery` | Portfolio/campaigns | Responsive masonry-like gallery sizing |
| `PortfolioProjectBackLink` | Portfolio | Back behavior coordinated with restoration state |
| `PortfolioProjectScrollReset` | Portfolio | Direct-entry versus list-entry scroll behavior |
| `ServiceCardLink` | Service index | Navigation state and restoration marker |
| `ServiceHeroContent` | Service index | Animated hero text |
| `ServiceVideoShowcase` | Service index | Responsive media/video presentation |
| `ServiceDetailPage` | Service details | Common server-rendered service layout |
| `ServiceDetailBackLink` | Service details | Back navigation to the service grid |
| `ServiceDetailScrollReset` | Service details | Direct-entry/list-entry restoration behavior |

## CSS ownership

Most components use Tailwind utilities. CSS Modules are colocated with features that need complex selectors or bespoke animation geometry:

- `CookieBanner.module.css`
- `CookieModal.module.css`
- `Preloader.module.css`
- `HeroBanner.module.css`
- `CaseStudiesSection.module.css`
- `ServicesSection.module.css`
- `TeamSection.module.css`

Global reusable selectors belong in `app/globals.css`; feature-only selectors should remain in the relevant module.

## Adding a component

1. Default to a Server Component.
2. Add `"use client"` only when hooks, context, event handlers, browser APIs, or client-only libraries require it.
3. Put broadly reusable primitives in `components/common`, site chrome in its feature directory, and route-only UI next to its page.
4. Use `Container`, existing heading primitives, and established color/spacing tokens before introducing another pattern.
5. Respect reduced motion and keyboard interaction.
6. Clean up observers, event listeners, animation contexts, RAF callbacks, and timers.
7. Test the component within the real AppShell because smooth scroll and route transitions can change runtime behavior.

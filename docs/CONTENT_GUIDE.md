# Content and asset guide

This project uses code-backed content. There is no CMS. Edit the relevant module, validate locally, and rebuild the static export.

## Portfolio projects

Primary files:

- `app/data/portfolio.js` defines titles, descriptions, categories, years, services, and project order.
- `app/data/s3Assets.js` defines the matching S3 hero, tile, and gallery assets.

The exported `portfolioPageProjects` only includes records whose slug exists in `s3PortfolioProjects`. It merges descriptive records with S3 media and normalizes the displayed project details.

To add a project:

1. Upload optimized media to the S3 `adverto/Portfolio/` hierarchy.
2. Add a project mapping to `s3PortfolioProjects` in `s3Assets.js`.
3. Add a record with the exact same case-sensitive slug to `portfolioPageProjectsBase` in `portfolio.js`.
4. Use a URL-safe, stable lowercase slug. The existing `POTOGO` uppercase slug is a compatibility exception.
5. Run a build. `generateStaticParams()` creates `/portfolio/<slug>/`.
6. Check the index card, detail hero, facts, full gallery, metadata, and back-navigation restoration.

Project record shape:

```js
{
  slug: "project-slug",
  title: "Project Name",
  subtitle: "Branding · 2026",
  category: "Branding",
  year: "2026",
  heroImage: "/case-studies/PROJECT/Cover/cover.webp",
  description: "A concise search and detail-page description.",
  services: ["Brand identity", "Packaging", "Campaign design"],
  gallery: galleryImageList,
}
```

The local-looking `/case-studies/...` strings in source content are translated to S3 `adverto/Portfolio/...` URLs by `s3PortfolioImage`; they are not expected to exist under `public/`.

## Campaigns

`app/data/campaigns.js` exports `campaignProjects`. `app/data/s3Assets.js` currently exposes a shared five-image `s3CampaignImages` array. Each record needs a unique slug, title, subtitle, category, year, hero image, description, services, and gallery.

Adding a campaign automatically adds a card to `/campigns/` and a build-time route at `/campigns/<slug>/`.

The misspelled directory and URL are current public behavior. Do not silently change only the data links to `/campaigns`.

## Services

Service content is split intentionally:

- `app/data/services.js` supplies the four overview cards and Lucide icons.
- `app/services/serviceDetails.ts` supplies detail-page titles, offering lists, and related portfolio slugs.
- `app/services/{slug}/page.tsx` supplies per-route metadata and delegates to the common template.

The supported typed slugs are `branding`, `advertising`, `social`, and `video`. Adding a fifth service requires updating all three layers and creating its route file so it can be included in a static export.

Every `recentWorks` slug must match a project in `portfolioPageProjects`. Missing matches simply reduce the related work displayed.

## Team

Team members currently live in two places:

- `app/our-team/page.tsx` controls the full team directory.
- `app/components/TeamSection/TeamSection.jsx` controls the animated homepage deck.

Keep names, roles, image file names, and ordering synchronized. The homepage record also includes animation-specific accent and exit-direction fields, though the current depth animation primarily uses position arrays and deck order.

Team image URLs are created with `s3TeamImage(fileName)`. S3 names are case-sensitive and may contain spaces; for example, the current Nawaz asset is `navas ..jpg`.

## Homepage sections

Homepage composition is explicitly ordered in `app/page.tsx`:

1. `HeroSection`
2. `CaseStudiesSection`
3. `ServicesSection`
4. `StorySection`
5. `ClientLogo`
6. `HeroBanner`
7. animated `TeamSection`
8. `FaqSection`

Reordering sections can affect navbar transparency, scroll snapshots, image loading, ScrollTrigger measurements, and the perceived page-transition sequence. Test a full refresh and back navigation after changing the order.

## Other data modules

| File | Purpose |
| --- | --- |
| `app/data/faqs.js` | Homepage FAQ questions and answers |
| `app/data/featuredportfolio.js` | Featured work slider content |
| `app/data/footer.js` | Footer link groups and social profiles |
| `app/data/logos.js` | Client logo names and S3 files |
| `app/data/moreProjects.js` | Additional project slider content |
| `app/data/team.js` | Team data used by the alternate section implementation |
| `app/lib/theme.js` | Small shared theme constants |

Before deleting an apparently duplicate data file, use `rg` to confirm whether it is imported. The project contains both current and alternate/legacy section implementations.

## S3 asset helpers

`app/data/s3Assets.js` is the central media manifest.

```text
S3_BUCKET_BASE
└── adverto/
    ├── Banners/
    ├── campaigns/
    ├── teams/
    ├── Home/
    ├── Portfolio/
    ├── videos/
    └── client_logos/
```

`s3Asset()` encodes each path segment with `encodeURIComponent`. Pass a logical key rather than an already encoded URL. `s3PortfolioImage()` leaves absolute HTTP URLs unchanged and translates `/case-studies/` prefixes.

When adding media:

- preserve exact filename case;
- avoid replacing an object with a different aspect ratio under the same name;
- choose WebP/JPEG for photography, PNG only when needed, SVG for vectors, and MP4 for existing video flows;
- verify CORS and public read access from the production origin;
- update `next.config.ts` if the asset hostname changes;
- give every rendered image meaningful `alt` text unless it is decorative.

## Local assets and fonts

`public/main-logo.svg` is the navbar brand mark. `main_icon-01.svg` and `main_icon-02.svg` are icon variants; metadata currently uses `main_icon-02.svg`. `noise.svg` supports the global texture layer.

Creato Display font files live under `public/fonts/`. The root layout preloads regular, medium, bold, and italic files, while `globals.css` declares the broader family. If a font is renamed, update both locations.

## Contact and legal content

Phone numbers, email, office address, project types, budgets, and response steps are local constants in `app/contact-us/page.tsx`. The visible enquiry form currently has no submission path. Adding a `form` action or client handler must include validation, accessible error/success states, spam prevention, a privacy review, and an external backend compatible with static hosting.

Privacy and terms content is stored directly in their page files. Update their visible “last updated” dates whenever policy language changes and obtain appropriate legal review.

## Content quality checklist

- Slug is stable, unique, and used consistently across data and media maps.
- Titles and descriptions are reflected in metadata where applicable.
- S3 URLs return successfully with exact casing.
- Images have correct aspect ratios and useful alt text.
- Copy uses consistent service names and dates.
- New dynamic content appears in `out/` after `npm run build`.
- Desktop, mobile, keyboard, reduced-motion, and back-navigation behavior remain usable.

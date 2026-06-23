# Progress Log

## Latest Update

Date: 2026-06-23
Task: Built Stage 3 mock magazine-style report preview.

## Completed

- Set up a Next.js TypeScript app using the App Router.
- Added Tailwind CSS configuration and global styling based on the design system palette.
- Created a clear folder structure for app routes, layout components, species components, data and types.
- Copied poster assets into `public/assets/posters/`.
- Copied the supplied cover PNG into `public/assets/covers/ancient-human-relatives-cover.png`.
- Created a landing page using the cover image and a featured poster card.
- Created static hominin data for all eight core groups plus Homo naledi as an extension group.
- Created a species card grid at `/species`.
- Created static species detail pages at `/species/[slug]`.
- Displayed poster image, group number, name, date range, location, hook, big idea and uncertainty.
- Clearly marked Homo naledi as an extension case.
- Reworked the landing page, species browser and species detail pages with darker blue/black washes, cinematic fades and poster-led layouts.
- Reduced the pale card catalogue feel in favour of an exhibition-style interface closer to the supplied cover art.
- Created a `/report-preview` route using mock student data and mock selected species data.
- Built the fixed 8-page report structure: cover, species feature, evidence dossier, life and adaptations, comparison spread, timeline and overlap, final article, and reflection/back cover.
- Added report-specific components and mock report data.
- Added print CSS, A4 page sizing and page-break rules for the report preview.
- Added a navigation link to the report preview.

## Files Created or Changed

- `.gitignore`
- `package.json`
- `next.config.ts`
- `postcss.config.js`
- `tailwind.config.ts`
- `tsconfig.json`
- `next-env.d.ts`
- `public/assets/covers/ancient-human-relatives-cover.png`
- `public/assets/posters/01-australopithecus-afarensis.png`
- `public/assets/posters/02-homo-habilis.png`
- `public/assets/posters/03-homo-erectus.png`
- `public/assets/posters/04-homo-heidelbergensis.png`
- `public/assets/posters/05-neanderthals.png`
- `public/assets/posters/06-denisovans.png`
- `public/assets/posters/07-homo-floresiensis.png`
- `public/assets/posters/08-homo-sapiens.png`
- `public/assets/posters/09-homo-naledi-extension.png`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/species/page.tsx`
- `src/app/species/[slug]/page.tsx`
- `src/components/layout/SiteHeader.tsx`
- `src/components/species/SpeciesCard.tsx`
- `src/components/species/SpeciesDetail.tsx`
- `src/components/species/SpeciesGrid.tsx`
- `src/components/report/MockReport.tsx`
- `src/components/report/ReportPage.tsx`
- `src/app/report-preview/page.tsx`
- `src/data/hominins.ts`
- `src/data/mockReport.ts`
- `src/types/hominin.ts`
- `src/types/report.ts`
- `docs/PROGRESS_LOG.md`

## Current Stage

- Stage 1 complete and verified.
- Stage 2 complete and verified.
- Stage 3 complete and verified in code.
- Latest report-preview build verified with `npm run build`.

## Known Issues

- Student forms, localStorage, real report data connection, PDF export, Airtable, Supabase, login, teacher dashboard, AI feedback and analytics have intentionally not been implemented.
- The cover source remains in `assets/cover/Cover v 2.png`; the app uses the copied public asset path required by Next.js.
- `npm audit --omit=dev` reports two moderate issues through Next.js' bundled PostCSS dependency. `npm audit fix --force` recommends a breaking downgrade to Next 9.3.3, so it was not applied.
- In this managed Codex sandbox, `next dev` needed escalated process permissions because the first sandboxed run failed with `spawn EPERM`.
- Playwright package was available for screenshot checking, but the local Chromium executable was not installed, so screenshot verification was not completed through Playwright.

## Next Recommended Task

- Build Stage 4: define the student work data model, create default empty work, and add localStorage save/load/reset helpers without building the full form flow yet.

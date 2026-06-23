# Progress Log

## Latest Update

Date: 2026-06-23
Task: Continued Stage 3 mock magazine-style report preview and generated evidence vignette assets.

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
- Revised the report visual system to be selected-group aware rather than hardcoded to Neanderthals.
- Added selected-hominin `figureImage` and `figureCaption` data slots for all nine hominin groups.
- Generated first-pass hominin figure assets for all eight core groups plus Homo naledi as the extension group.
- Generated first-pass evidence/behaviour vignette assets for all eight core groups plus Homo naledi as the extension group.
- Added selected-hominin `vignetteImage` and `vignetteCaption` data slots for all nine hominin groups.
- Generated a second square activity/behaviour image set for all eight core groups plus Homo naledi.
- Added explicit `madeImage`, `madeCaption`, `activityImage` and `activityCaption` data slots so each species has at least three meaningful report images: figure, made/evidence object, and activity/behaviour scene.
- Generated a dedicated wide `activityWideImage` set for page 4 so the image-led layout does not upscale square assets.
- Added `activityWideImage` and `activityWideCaption` data slots while keeping the square activity assets for later report/app use.
- Removed the generated migration-route map from page 6 because route accuracy needs scientific review; replaced it with broad geography regions and a caution note.
- Added context-responsive page 4 imagery so a sapiens report shows sapiens, an erectus report shows erectus, and so on.
- Reworked page 2 to use the selected species figure instead of the information poster.
- Reworked page 4 to use the selected species activity/behaviour image in a square image module.
- Enlarged the page 4 activity/behaviour image and tightened the adaptation cards to use the page space better.
- Reworked page 4 again as a full-width magazine-style image band using the wide activity image, with soft edge fades, top-left caption and translucent adaptation cards layered below.
- Reworked page 5 comparison cards to use made/evidence imagery instead of repeating poster artwork.
- Reworked page 6 analysis panels so overlap, ladder challenge and geography have a cleaner layout.
- Reworked page 7 final article layout with a narrower sidebar and wider essay column to reduce cramped writing and prevent overlap.
- Fixed page 7 footer styling and sidebar width so the judgement panel no longer bleeds into the essay column and the essay no longer collides with the footer.
- Scoped the page 7 drop-cap styling to the final essay paragraph only, preventing the `Final evaluation` kicker from overlapping with the title.
- Reworked page 8 with a mosaic of unused made/activity images so the back cover feels closer to the cover-art tone.
- Removed the `Field report` overlay text from the cover page, leaving the cover art plus student details.

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
- `public/assets/report/evidence-dossier-banner.png`
- `public/assets/report/back-cover-branches.png`
- `public/assets/report/figures/australopithecus-afarensis.png`
- `public/assets/report/figures/homo-habilis.png`
- `public/assets/report/figures/homo-erectus.png`
- `public/assets/report/figures/homo-heidelbergensis.png`
- `public/assets/report/figures/neanderthals.png`
- `public/assets/report/figures/denisovans.png`
- `public/assets/report/figures/homo-floresiensis.png`
- `public/assets/report/figures/homo-sapiens.png`
- `public/assets/report/figures/homo-naledi.png`
- `public/assets/report/vignettes/australopithecus-afarensis.png`
- `public/assets/report/vignettes/homo-habilis.png`
- `public/assets/report/vignettes/homo-erectus.png`
- `public/assets/report/vignettes/homo-heidelbergensis.png`
- `public/assets/report/vignettes/neanderthals.png`
- `public/assets/report/vignettes/denisovans.png`
- `public/assets/report/vignettes/homo-floresiensis.png`
- `public/assets/report/vignettes/homo-sapiens.png`
- `public/assets/report/vignettes/homo-naledi.png`
- `public/assets/report/activities/australopithecus-afarensis.png`
- `public/assets/report/activities/homo-habilis.png`
- `public/assets/report/activities/homo-erectus.png`
- `public/assets/report/activities/homo-heidelbergensis.png`
- `public/assets/report/activities/neanderthals.png`
- `public/assets/report/activities/denisovans.png`
- `public/assets/report/activities/homo-floresiensis.png`
- `public/assets/report/activities/homo-sapiens.png`
- `public/assets/report/activities/homo-naledi.png`
- `public/assets/report/activity-wide/australopithecus-afarensis.png`
- `public/assets/report/activity-wide/homo-habilis.png`
- `public/assets/report/activity-wide/homo-erectus.png`
- `public/assets/report/activity-wide/homo-heidelbergensis.png`
- `public/assets/report/activity-wide/neanderthals.png`
- `public/assets/report/activity-wide/denisovans.png`
- `public/assets/report/activity-wide/homo-floresiensis.png`
- `public/assets/report/activity-wide/homo-sapiens.png`
- `public/assets/report/activity-wide/homo-naledi.png`
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
- Latest report layout checked with DOM-based A4 overflow audit after the three-image restructure: pages 1-8 report zero vertical page overflow.

## Known Issues

- Student forms, localStorage, real report data connection, PDF export, Airtable, Supabase, login, teacher dashboard, AI feedback and analytics have intentionally not been implemented.
- The cover source remains in `assets/cover/Cover v 2.png`; the app uses the copied public asset path required by Next.js.
- `npm audit --omit=dev` reports two moderate issues through Next.js' bundled PostCSS dependency. `npm audit fix --force` recommends a breaking downgrade to Next 9.3.3, so it was not applied.
- In this managed Codex sandbox, `next dev` needed escalated process permissions because the first sandboxed run failed with `spawn EPERM`.
- Playwright package was available for screenshot checking, but the local Chromium executable was not installed, so screenshot verification was not completed through Playwright.
- Generated hominin figures are illustrative first-pass assets and need scientific/teacher review before classroom release.
- Generated evidence/behaviour vignettes are illustrative first-pass assets and need scientific/teacher review before classroom release.
- Some `madeImage` slots are deliberately framed as evidence objects rather than made artefacts, because forcing a tool/jewellery claim for every group would weaken scientific accuracy.
- Generated decorative visuals must not be used as factual migration-route evidence unless reviewed against reliable sources.
- Page 6 currently uses broad geographic regions only; a reliable map should be added later from reviewed palaeoanthropology sources if needed.
- Browser screenshot capture was blocked by local Chromium/Edge crashpad permissions and in-app browser screenshot timeouts on the image-heavy report; verification used `npm run build` plus DOM layout/overflow measurements instead.
- Temporary browser profile/contact-sheet artifacts may remain locally but are ignored by git.

## Next Recommended Task

- Review the first-pass figure and vignette assets for scientific fit, then continue Stage 4: define the student work data model, create default empty work, and add localStorage save/load/reset helpers without building the full form flow yet.

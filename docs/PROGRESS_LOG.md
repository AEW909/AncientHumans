# Progress Log

## Latest Update

Date: 2026-06-24
Task: Built Stage 5 guided web quest forms and connected them to local autosave.

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
- Defined the Stage 4 student work TypeScript model covering student details, misconceptions, guided research, evidence, life/adaptations, comparison, timeline, final report and reflection.
- Created default empty student work with schema versioning, created timestamp and empty responses for all web quest sections.
- Added localStorage helpers to load, save, reset and detect saved student work using the project storage key.
- Added save timestamp handling through `updatedAt`.
- Added fallback normalization so missing, partial or older saved data is merged back into a safe complete shape.
- Added basic progress calculation across required fields and completed sections.
- Created a `/quest` route for the student-facing guided web quest.
- Built a polished museum-style web quest workspace with a dark image-led hero, cream research panel and sticky section rail.
- Added all ten Stage 5 sections: student details, misconceptions starter, group choice, guided research, evidence, life/adaptations, comparison, timeline/overlap, final response and self-assessment.
- Connected the form flow to the Stage 4 localStorage helpers with autosave, reload persistence, reset confirmation and save status display.
- Added visible character limits to student writing fields to protect the later PDF layout.
- Added progress display and per-step completion badges in the web quest side rail.
- Added a context-responsive hero image that changes to the selected hominin group where possible.
- Added the Stage 5 route to site navigation and changed the landing page primary call-to-action to start the web quest.
- Marked Homo naledi as an extension case in the group chooser.
- Changed the student date field to a plain text field with a report-friendly placeholder to avoid browser locale/date-input save issues.
- Reworked Stage 5 so the web quest feels less like a cramped form and more like a guided learning experience.
- Embedded the opening Kurzgesagt human origins video in the starter section.
- Rebuilt the group chooser with larger hominin images and clickable field-note modals.
- Added modal field notes with date, location, known-for, body, life, evidence, uncertainty, species-page link and full information-sheet link.
- Added a guided research launchpad with the selected species poster, app page link, full information-sheet link, trusted external research links and a prompt to ask for a printed handout.
- Added an evidence prompt strip using the selected species evidence/object image before the evidence form fields.
- Added comparison briefing panels so pupils see information for their focus group, Homo sapiens and their comparison group before writing.
- Prevented Homo sapiens from being selected as the separate comparison group because it is already included in the comparison task.
- Removed Homo sapiens from the focus/comparison chooser entirely and made it a fixed reference species.
- Added a dedicated Homo sapiens bridge step before the comparison task so pupils meet the reference species before writing comparisons.
- Changed species-page links from the web quest to open in a new tab and added a clear return-to-web-quest link on species detail pages.
- Added extra wrapping/min-width layout guards to reduce text overflow and overlap once real species are selected.
- Added a persistent trusted research sites panel to the web quest side rail.
- Added visible trusted-source panels to the Starter and Choose sections so pupils see external research sites before selecting a species.
- Set trusted-source links to open in a new tab for Smithsonian Human Origins, Natural History Museum and Australian Museum.
- Simplified section 02 by removing the main trusted-source panel from the starter task.
- Reframed section 02 as a baseline thinking check where pupils record initial ideas before research.
- Added a section 11 starter-review panel that presents pupils' section 02 misconception answers back to them for reflection.
- Hid the persistent trusted-source side panel while section 02 is active so the starter stays focused on initial thinking.
- Loosened quest heading line-height and added small heading padding to prevent tight display type from visually colliding on narrow viewports.

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
- `src/app/quest/page.tsx`
- `src/app/species/page.tsx`
- `src/app/species/[slug]/page.tsx`
- `src/components/layout/SiteHeader.tsx`
- `src/components/quest/QuestWorkspace.tsx`
- `src/components/species/SpeciesCard.tsx`
- `src/components/species/SpeciesDetail.tsx`
- `src/components/species/SpeciesGrid.tsx`
- `src/components/report/MockReport.tsx`
- `src/components/report/ReportPage.tsx`
- `src/app/report-preview/page.tsx`
- `src/data/hominins.ts`
- `src/data/defaultStudentWork.ts`
- `src/data/mockReport.ts`
- `src/lib/studentWorkStorage.ts`
- `src/types/hominin.ts`
- `src/types/studentWork.ts`
- `src/types/report.ts`
- `docs/PROGRESS_LOG.md`

## Current Stage

- Stage 1 complete and verified.
- Stage 2 complete and verified.
- Stage 3 complete and verified in code.
- Stage 4 complete and verified in code.
- Stage 5 complete and verified in code.
- Latest web quest build verified with `cmd /c npm.cmd run build`.
- Browser smoke test verified `/quest`, student detail autosave after reload, species focus/compare persistence, completion badges and selected-group hero image.
- Latest web quest interaction pass verified the video embed, nine large species cards, field-note modal links, research launchpad links, handout prompt, and three-branch comparison briefings.
- Latest browser pass verified the 11-step flow, eight selectable ancient-relative cards, Homo sapiens bridge page, new-tab species links, three-branch comparison briefings and zero horizontal overflow across all web quest sections after selecting Homo erectus and Neanderthals.
- Latest browser pass verified trusted research links are visible on Details, Starter and Choose, and that each external source link opens in a new tab.
- Latest browser pass verified section 02 has the baseline note but no main source-link panel, and section 11 shows six starter-review cards with no horizontal overflow.
- Latest browser pass verified section 02 has no source panels while active, no horizontal overflow, and a clear gap between the baseline note and the misconception questions.
- Latest browser pass verified section 03 now uses a compact research-site reminder in the main flow while keeping trusted source links available in the side panel, with no horizontal overflow.
- Latest report-preview build verified with `npm run build`.
- Latest report layout checked with DOM-based A4 overflow audit after the three-image restructure: pages 1-8 report zero vertical page overflow.
- Latest student work data/storage foundation verified with `npm run build`.

## Known Issues

- Real report data connection, PDF export, Airtable, Supabase, login, teacher dashboard, AI feedback and analytics have intentionally not been implemented.
- The `/report-preview` route still uses mock data; saved student work is intentionally not connected until Stage 6.
- The cover source remains in `assets/cover/Cover v 2.png`; the app uses the copied public asset path required by Next.js.
- `npm audit --omit=dev` reports two moderate issues through Next.js' bundled PostCSS dependency. `npm audit fix --force` recommends a breaking downgrade to Next 9.3.3, so it was not applied.
- In this managed Codex sandbox, `next dev` needed escalated process permissions because the first sandboxed run failed with `spawn EPERM`.
- Playwright package was available for screenshot checking, but the local Chromium executable was not installed, so screenshot verification was not completed through Playwright.
- Generated hominin figures are illustrative first-pass assets and need scientific/teacher review before classroom release.
- Generated evidence/behaviour vignettes are illustrative first-pass assets and need scientific/teacher review before classroom release.
- Some `madeImage` slots are deliberately framed as evidence objects rather than made artefacts, because forcing a tool/jewellery claim for every group would weaken scientific accuracy.
- Generated decorative visuals must not be used as factual migration-route evidence unless reviewed against reliable sources.
- Page 6 currently uses broad geographic regions only; a reliable map should be added later from reviewed palaeoanthropology sources if needed.
- Browser screenshot capture was blocked by local Chromium/Edge crashpad permissions and in-app browser screenshot timeouts on the image-heavy report; report verification used `npm run build` plus DOM layout/overflow measurements instead.
- Temporary browser profile/contact-sheet artifacts may remain locally but are ignored by git.

## Next Recommended Task

- Build Stage 6: connect saved student work to the magazine-style report preview, add empty states and add a preview handoff from the web quest.

# Build Plan

## Purpose

This document gives Codex a staged build plan for the Ancient Human Relatives web quest.

The project should be built in controlled stages. Do not attempt to build the whole app in one task.

The final PDF report is a core product, so the report preview should be designed early rather than added at the end.

---

# 1. Main Build Principle

The app is not just a form.

The app should guide students through a research process and then transform their work into a polished, magazine-style PDF field report.

The intended flow is:

```txt
Student completes guided web quest
        ↓
Answers are saved locally in the browser
        ↓
Student previews a polished report
        ↓
Student downloads the report as a PDF
        ↓
Student submits or prints the PDF
```

The report should be treated as the final product of the activity.

---

# 2. Staging Rule for Codex

Codex should work one stage at a time.

For each task, Codex should:

1. Read the relevant docs first.
2. Identify the current stage.
3. Make focused changes only for that stage.
4. Avoid building future-stage features early.
5. Update or create `docs/PROGRESS_LOG.md` after each task.

Codex should not add Airtable, Supabase, login, dashboards, analytics or AI feedback in version 1.

---

# 3. Recommended Folder Structure

The exact framework may alter this slightly, but the project should roughly follow this structure once the app is created:

```txt
AncientHumans/
  docs/
    PROJECT_BRIEF.md
    CONTENT_MODEL.md
    BUILD_PLAN.md
    DESIGN_SYSTEM.md
    PDF_REPORT_SPEC.md
    STORAGE_DECISION.md
    PROGRESS_LOG.md

  public/
    assets/
      posters/
        01-australopithecus-afarensis.png
        02-homo-habilis.png
        03-homo-erectus.png
        04-homo-heidelbergensis.png
        05-neanderthals.png
        06-denisovans.png
        07-homo-floresiensis.png
        08-homo-sapiens.png
        09-homo-naledi-extension.png
      covers/
        ancient-human-relatives-cover.png

  src/
    app/ or pages/
    components/
      layout/
      species/
      quest/
      report/
    data/
    lib/
    styles/
    types/
```

Current assets may initially be in `/assets`. Codex may move them into `/public/assets` when setting up the app.

---

# 4. Stage 1 — Project Setup and Assets

## Goal

Create the basic app structure and make sure the project runs locally.

## Tasks

* Create the app using Next.js and TypeScript.
* Add Tailwind CSS.
* Set up basic project folders.
* Add or move image assets into the correct public folder.
* Create a basic layout.
* Create a landing page.
* Confirm cover and poster assets can be displayed.
* Add basic navigation.

## Do Not Build Yet

Do not build:

* forms
* localStorage
* report preview
* PDF export
* Airtable
* Supabase
* login
* teacher dashboard

## Acceptance Criteria

Stage 1 is complete when:

* the app runs locally
* the landing page displays
* Tailwind styles work
* the cover image displays
* at least one poster image displays
* the folder structure is clear

---

# 5. Stage 2 — Static Content Browsing

## Goal

Allow users to browse the hominin groups and view the supplied posters.

## Tasks

* Create a data file for the hominin groups.
* Add all eight core groups plus the *Homo naledi* extension group.
* Create a species card component.
* Create a species grid.
* Create a species detail page, route or modal.
* Show poster image, number, name, date range, location, hook, big idea and uncertainty.
* Clearly mark *Homo naledi* as an extension case.

## Do Not Build Yet

Do not build:

* student forms
* saved answers
* report preview
* PDF export
* central storage

## Acceptance Criteria

Stage 2 is complete when:

* all nine group cards display correctly
* each group shows the correct image
* each group has accurate summary content
* users can open or navigate to more detail for each group
* *Homo naledi* is clearly marked as extension

---

# 6. Stage 3 — Magazine-Style Report Preview Foundation

## Goal

Build the report preview early using mock data.

This is important because the final PDF is the main product. The project should not leave report design until the end.

## Tasks

* Create a `/report-preview` route.
* Use mock student data.
* Use mock selected species data.
* Build the fixed 8-page report structure:

  1. Cover page
  2. Species feature page
  3. Evidence dossier
  4. Life and adaptations
  5. Comparison spread
  6. Timeline and overlap
  7. Final article
  8. Reflection / back cover
* Create report-specific components.
* Add print CSS.
* Add page-break rules.
* Make the report look good in the browser before export is attempted.

## Report Design Goal

The report should feel like:

* a life sciences magazine
* a museum field report
* a documentary science booklet
* a polished student publication

It should not look like:

* a form printout
* a worksheet
* a table dump
* a generic PDF export

## Do Not Build Yet

Do not build:

* real form data connection
* PDF download button
* server-side PDF generation
* Airtable
* Supabase

## Acceptance Criteria

Stage 3 is complete when:

* `/report-preview` displays a full 8-page mock report
* each page has a distinct design purpose
* page breaks are controlled in print view
* the report uses the project design system
* the report looks worth showing to students as the target output

---

# 7. Stage 4 — Student Data Model and localStorage

## Goal

Create the structure for storing student work in the browser.

## Tasks

* Define the student work data structure.
* Create default empty student work.
* Create save/load/reset helpers for localStorage.
* Add a save timestamp.
* Add basic progress calculation.
* Add fallback handling for missing fields.
* Ensure data shape matches the report preview needs.

## Do Not Build Yet

Do not build:

* all form pages
* PDF export
* central database
* teacher dashboard

## Acceptance Criteria

Stage 4 is complete when:

* student work can be saved to localStorage
* student work can be loaded after refresh
* reset clears saved work
* incomplete work does not crash the app
* the data structure can feed the report preview later

---

# 8. Stage 5 — Guided Web Quest Forms

## Goal

Build the student-facing activity flow.

## Task Flow

The web quest should include these sections:

1. Student details
2. Misconceptions starter
3. Choose research group
4. Guided research
5. Evidence and uncertainty
6. Life and adaptations
7. Comparison task
8. Timeline and overlap task
9. Final written response
10. Self-assessment

## Form Requirements

* Inputs should autosave.
* Students should be able to move backwards and forwards.
* Character limits should protect the final PDF layout.
* Prompts should encourage explanation, not copying.
* The UI should show progress.
* The UI should show save status.
* The app should work without accounts.

## Acceptance Criteria

Stage 5 is complete when:

* students can complete the activity from start to finish
* answers are saved locally
* character limits are visible
* progress is clear
* students can return to previous sections and edit
* the task flow matches the workbook structure

---

# 9. Stage 6 — Connect Form Data to Report Preview

## Goal

Replace mock report data with real saved student work.

## Tasks

* Connect localStorage student work to the report preview.
* Use the chosen group to load the correct species content and poster.
* Use the comparison group to load the correct comparison content.
* Add empty-state handling.
* Add a “Preview Report” button from the student workflow.
* Ensure incomplete reports still render gracefully.
* Use the one-sentence judgement and final answer in the magazine-style layout.

## Acceptance Criteria

Stage 6 is complete when:

* the report preview reflects the student’s real answers
* the chosen species appears correctly
* the comparison group appears correctly
* blank fields do not break the layout
* report preview still looks polished with realistic student answers

---

# 10. Stage 7 — PDF Export

## Goal

Allow the student to download the magazine-style report as a PDF.

## Preferred Approach

The preferred approach is:

1. Render the report as a fixed-layout `/report-preview` page.
2. Apply print-specific CSS.
3. Export that rendered report to PDF.

If simple browser print is not good enough, consider Playwright or another browser-rendered PDF approach.

## Tasks

* Add PDF export method.
* Preserve the 8-page layout.
* Ensure images render correctly.
* Ensure fonts and colours export correctly.
* Add a clear download button.
* Use a sensible filename.
* Test with realistic student data.

## Acceptance Criteria

Stage 7 is complete when:

* students can download a PDF
* the PDF keeps the intended 8-page structure
* page breaks are clean
* text is not cut off
* images display properly
* the report is suitable for digital submission or printing

---

# 11. Stage 8 — Polish and Deployment

## Goal

Make the app reliable, presentable and deployable.

## Tasks

* Improve visual polish.
* Improve mobile/tablet usability.
* Add teacher notes.
* Add research source page.
* Add accessibility improvements.
* Add reset confirmation.
* Add loading states where needed.
* Add export guidance.
* Prepare for Vercel deployment.
* Deploy to Vercel.

## Acceptance Criteria

Stage 8 is complete when:

* the app works on school laptops and tablets
* the deployed version works reliably
* students can complete the activity without technical support
* the final PDF can be produced and submitted
* teacher notes and sources are available

---

# 12. Stage 9 — Future Features

Do not build these in version 1, but avoid architecture decisions that would make them impossible later.

Possible future features:

* Airtable submission
* Supabase persistence
* pupil accounts
* teacher dashboard
* class codes
* teacher feedback
* rubric-based marking
* Microsoft Teams submission workflow
* analytics on task completion
* multiple web quests using the same template

---

# 13. Progress Log Requirement

After each Codex task, update or create:

```txt
/docs/PROGRESS_LOG.md
```

It should include:

```md
# Progress Log

## Latest Update

Date:
Task:

## Completed

- ...

## Files Created or Changed

- ...

## Current Stage

- ...

## Known Issues

- ...

## Next Recommended Task

- ...
```

This helps preserve context between Codex tasks.

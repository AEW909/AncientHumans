# Project Brief

## Project Name

Ancient Human Relatives

Repository name:

`AncientHumans`

---

# 1. Project Goal

Build a polished classroom web quest for secondary biology students exploring ancient human relatives and the idea that human evolution is a branching tree, not a straight ladder.

Students should be guided through a structured research activity using:

* supplied infographic posters
* trusted research links
* misconception checks
* guided research questions
* evidence analysis
* comparison tasks
* timeline tasks
* a final written evaluation

The final product should be a polished, magazine-style PDF field report that pupils would be proud to show at home or submit digitally.

---

# 2. Target Audience

The activity is designed for UK secondary school pupils, roughly GCSE to A-level bridging standard.

It should work well for:

* GCSE extension work
* A-level Biology introduction or enrichment
* evolution and classification lessons
* independent research tasks
* guided homework
* cover work
* end-of-topic consolidation

The tone should be mature enough for teenage pupils and should not feel childish.

---

# 3. Core Learning Goal

Students should understand that human evolution was:

* branching, not linear
* diverse, with multiple hominin groups existing at different times
* sometimes overlapping, with more than one human species alive at once
* evidence-based, using fossils, tools, DNA, footprints and archaeology
* uncertain in places, with ongoing scientific debate

The main conceptual message is:

> Human evolution is not a ladder leading inevitably to *Homo sapiens*. It is a branching tree, with many related groups, some of which overlapped in time and interacted.

---

# 4. Final Question

Students should work towards answering:

> Human evolution is best understood as a branching tree, not a straight ladder. Evaluate this statement using evidence from at least three ancient human relatives.

This question should drive the whole activity.

The web quest should not simply ask students to collect facts. It should push them to:

* compare groups
* explain evidence
* identify uncertainty
* challenge misconceptions
* use cautious scientific language
* make a final judgement

---

# 5. Tone and Style

The app should feel like a mixture of:

* life sciences magazine
* museum exhibition guide
* documentary field report
* guided digital workbook

It should feel:

* scientific
* visually engaging
* clear
* structured
* mature
* polished
* evidence-based

It should not feel like:

* a plain worksheet
* a generic Google Form
* a childish school website
* a simple poster-making task

---

# 6. Core Hominin Groups

The activity should include these eight core groups:

1. *Australopithecus afarensis*
2. *Homo habilis*
3. *Homo erectus*
4. *Homo heidelbergensis*
5. Neanderthals
6. Denisovans
7. *Homo floresiensis*
8. *Homo sapiens*

Extension group:

9. *Homo naledi*

*Homo naledi* should be clearly marked as an extension case.

---

# 7. App Type

Version 1 should be a client-side web quest with local browser storage and a polished PDF export.

The app should not initially require:

* pupil accounts
* teacher accounts
* central database storage
* Airtable
* Supabase
* login systems
* teacher dashboard

These can be considered in later versions after the activity has been tested.

---

# 8. Recommended Technical Stack

Recommended stack:

* Next.js
* TypeScript
* Tailwind CSS
* localStorage for browser persistence
* React components for the report preview
* print CSS for the report layout
* Playwright or another browser-rendered method for high-quality PDF export if needed
* Vercel for deployment

If a different React framework is used, keep the structure simple and maintainable.

---

# 9. Core App Sections

The app should include:

1. Landing page
2. Introduction / misconception starter
3. Species selection grid
4. Guided research task
5. Evidence and uncertainty task
6. Life and adaptations task
7. Comparison task
8. Timeline and overlap task
9. Final written response builder
10. Report preview
11. PDF export
12. Optional teacher notes / sources page

---

# 10. PDF as a Core Product

The final PDF is not a basic export of form answers.

It is a core feature of the app.

Students should leave the activity with a polished, magazine-style “field report” that looks good enough to show at home or submit digitally.

The web quest should collect structured student responses that can be transformed into a visually impressive PDF report.

The report should feel like:

* a life sciences magazine feature
* a museum-style field report
* a documentary-style science publication
* a polished educational artefact, not a worksheet printout

---

# 11. PDF Goal

The PDF should be an 8-page fixed-layout report:

1. Cover page
2. Species feature page
3. Evidence dossier
4. Life and adaptations
5. Comparison spread
6. Timeline and overlap
7. Final article
8. Reflection / back cover

The report should use the same visual identity as the web app:

* dark cinematic cover styling
* fossil, gold, navy and cream colour palette
* large imagery
* clear scientific labels
* pull quotes
* cards and panels
* controlled page breaks
* polished typography

---

# 12. Important Build Principle

The report preview should be built early using mock data.

Do not wait until the end to design the PDF.

First build a beautiful `/report-preview` route, then make the web quest forms feed data into that report.

This keeps the final product at the centre of the project and prevents the PDF becoming an afterthought.

---

# 13. Version 1 Requirements

Version 1 should include:

* landing page with cover image
* species selection grid
* species detail view
* guided research form
* localStorage autosave
* comparison task
* timeline/overlap task
* final written response builder
* magazine-style report preview
* PDF download/export
* reset progress option

---

# 14. Version 1 Exclusions

Do not include in version 1:

* Supabase
* Airtable
* pupil login
* teacher dashboard
* automated marking
* central submission
* AI feedback
* analytics

These may be added later if needed.

---

# 15. Success Criteria

The app is successful if:

* students can complete the web quest independently
* the task avoids simple copying and encourages explanation
* the final report clearly supports the branching-tree model of human evolution
* the PDF looks polished and worth keeping
* student progress is not lost on page refresh
* the app is simple enough to deploy and maintain
* the final product works well as a digital submission or printout

---

# 16. Scientific Framing

The app should avoid presenting human evolution as a ladder.

It should not imply that:

* *Homo sapiens* are the goal of evolution
* all species are direct ancestors of each other
* extinct species were failures
* bigger brains always mean greater success
* all behaviours are known with certainty

It should encourage cautious scientific language such as:

* “evidence suggests”
* “may have”
* “possibly”
* “scientists debate”
* “it is uncertain”
* “known from”
* “based on current evidence”

---

# 17. First Build Instruction for Codex

When Codex starts work, it should read the docs folder first, especially:

* `PROJECT_BRIEF.md`
* `CONTENT_MODEL.md`
* `BUILD_PLAN.md`
* `DESIGN_SYSTEM.md`
* `PDF_REPORT_SPEC.md`
* `STORAGE_DECISION.md`

Codex should then follow the staged build plan and should not attempt to build the whole app in one task.

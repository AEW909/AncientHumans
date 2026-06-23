# PDF Report Spec

## Purpose

The final PDF is the main product students take away from the Ancient Human Relatives web quest.

It should be a polished, magazine-style field report, not a plain form export.

The PDF should make students feel that they have produced something worth showing at home, submitting digitally, or printing.

---

# 1. Report Title

Main title:

> Ancient Human Relatives

Subtitle:

> A Field Report on the Human Family Tree

Optional footer text:

> Fossils • Tools • DNA • Debate

---

# 2. Overall Style

The report should feel like:

* a life sciences magazine
* a museum exhibition booklet
* a documentary field report
* a polished science publication

It should not feel like:

* a worksheet
* a form printout
* a table dump
* a basic browser print
* a generic PDF export

---

# 3. Visual Language

The report should use:

* cinematic cover styling
* large imagery
* fossil, gold, navy and cream palette
* evidence cards
* map and timeline elements
* pull quotes
* scientific labels
* clear typography
* controlled page breaks
* generous white space
* strong section hierarchy

---

# 4. Technical Approach

The preferred approach is:

1. Build a `/report-preview` route in React.
2. Render the final report as fixed pages using mock data first.
3. Style the report with print-specific CSS.
4. Later connect real student data from localStorage.
5. Export the report route to PDF.

Do not generate the PDF directly from raw data without a visual report preview.

The report should look excellent in the browser before PDF export is implemented.

---

# 5. Fixed Page Structure

The report should be built as an 8-page fixed-layout document.

Pages:

1. Cover page
2. Species feature
3. Evidence dossier
4. Life and adaptations
5. Comparison spread
6. Timeline and overlap
7. Final article
8. Reflection / back cover

Each page should have a distinct design purpose.

---

# 6. Page 1 — Cover Page

## Purpose

Create a strong first impression.

This page should feel like a science magazine cover or documentary title card.

## Content

Include:

* cover image
* title: Ancient Human Relatives
* subtitle: A Field Report on the Human Family Tree
* student name
* class
* date
* chosen group
* optional footer: Fossils • Tools • DNA • Debate

## Design

Use:

* full-page cover image or dark cinematic background
* large title
* minimal body text
* strong contrast
* student details in a clean panel, badge or label
* strong spacing

## Avoid

Avoid:

* too much text
* worksheet-style boxes
* weak title hierarchy
* cluttered overlays

---

# 7. Page 2 — Species Feature

## Purpose

Introduce the student’s chosen hominin group and make it visually exciting.

## Content

Include:

* chosen species/group name
* scientific name where appropriate
* species poster image
* subtitle or hook
* date range
* location
* known for
* key fact cards
* “why this group matters” pull quote
* student explanation of importance

## Design

Use:

* large image-led layout
* fact cards
* date/location badges
* one major pull quote
* strong species title

## Required Student Data

Use:

* chosen group
* importance answer
* one-sentence judgement or pull quote if available

## Empty State

If the student has not written an importance answer, show:

> Not completed yet.

---

# 8. Page 3 — Evidence Dossier

## Purpose

Show what evidence exists and how scientists know about the chosen group.

This should feel like a scientific case file.

## Content

Include:

* fossil evidence
* tool evidence
* DNA evidence
* other archaeological evidence
* strongest evidence paragraph
* evidence limitations
* uncertainty/debate

## Design

Use:

* case-file style
* evidence cards
* small labels or icons for evidence types
* “Evidence reviewed” style label
* uncertainty box
* clear distinction between evidence and interpretation

## Required Student Data

Use:

* fossil evidence answer
* tool evidence answer
* DNA evidence answer
* other evidence answer
* strongest evidence explanation
* evidence limitations
* uncertainty answer

## Empty State

If an evidence category is not relevant or left blank, show one of:

> No clear evidence.

or

> Not completed yet.

Use whichever is more appropriate.

---

# 9. Page 4 — Life and Adaptations

## Purpose

Explain body structure, adaptations, environment and survival.

This is the most biology-focused page.

## Content

Include:

* body plan
* key physical feature
* why that feature may have been useful
* likely environment
* lifestyle
* survival pressures
* cautious scientific wording

## Design

Use:

* anatomy/adaptation callout boxes
* environment strip
* short explanation cards
* visual hierarchy that separates “body”, “environment” and “survival”
* cautious wording prompts where useful

## Required Student Data

Use:

* body plan answer
* key physical feature
* feature usefulness
* environment answer
* lifestyle answer
* survival pressure answer

## Scientific Caution

Use cautious headings such as:

* “Evidence suggests”
* “Likely environment”
* “Possible adaptation”
* “Scientists infer”

Avoid presenting speculative behaviour as certain.

---

# 10. Page 5 — Comparison Spread

## Purpose

Compare the chosen group with *Homo sapiens* and one other group.

This page should help students move beyond fact collection and towards analysis.

## Content

Compare:

1. the chosen group
2. *Homo sapiens*
3. one other student-selected group

Include:

* date range
* location
* anatomy/body plan
* evidence
* lifestyle
* uncertainty
* similarities
* differences
* most similar judgement
* most different judgement

## Design

Use:

* three-column comparison
* mini profile cards
* comparison table or card layout
* similarity/difference callouts
* clear visual distinction between the three groups

## Required Student Data

Use:

* chosen group
* comparison group
* similarities answer
* differences answer
* most similar answer
* most different answer

## Important Design Note

Do not make *Homo sapiens* look like the “winner” or final goal.

The page should show comparison, not ranking.

---

# 11. Page 6 — Timeline and Overlap

## Purpose

Make the branching-tree idea visible.

This page should directly challenge the ladder model of human evolution.

## Content

Include:

* timeline of all groups
* date bars for the hominin groups
* overlap with *Homo sapiens*
* overlap with other groups
* student explanation of why this challenges the ladder model
* branching-tree explanation

## Design

Use:

* full-width timeline
* labelled bars
* overlapping date ranges
* callout boxes
* branching-tree message

## Required Student Data

Use:

* overlapping groups answer
* timeline explanation answer
* branching-tree explanation

## Key Message

The visual message should be:

> Many branches. Overlapping timelines. One surviving species.

## Avoid

Avoid visuals that imply:

```txt id="i7j6ca"
primitive → better → modern
```

The timeline should show overlap and diversity, not a straight progression.

---

# 12. Page 7 — Final Article

## Purpose

Present the student’s final written evaluation as a magazine-style article.

This is the main written outcome.

## Content

Include:

* article title
* final written answer
* one-sentence judgement
* key evidence used
* conclusion

## Suggested Article Titles

Students may choose or edit one of:

* Why Human Evolution Is Not a Ladder
* The Branching Human Story
* Many Humans, One Survivor
* What Ancient Humans Reveal About Evolution
* Fossils, DNA and the Human Family Tree

## Design

Use:

* magazine article layout
* large title
* possible drop cap
* pull quote
* final judgement badge
* clean readable essay text
* maybe a sidebar showing key evidence used

## Required Student Data

Use:

* report title
* one-sentence judgement
* paragraph responses or final answer
* conclusion

## Text Handling

The final answer should have a clear character limit.

Suggested range:

* minimum useful length: 800 characters
* preferred range: 1,200–1,800 characters

If the student writes more, the layout must handle it gracefully.

---

# 13. Page 8 — Reflection / Back Cover

## Purpose

Close the report and allow student reflection.

This should feel like a back cover, not just an extra worksheet page.

## Content

Include:

* self-assessment checklist
* what surprised me most
* one thing scientists are still debating
* improvement target
* source note
* closing statement

## Suggested Closing Statement

> Human evolution is not a straight road. It is a branching story built from fossils, tools, DNA and debate.

## Design

Use:

* back-cover style
* lighter than the main article
* clean checklist
* reflection cards
* source/credit note
* strong final message

## Required Student Data

Use:

* self-assessment checklist
* most interesting thing
* one thing still debated
* improvement target

---

# 14. Text Length Control

To preserve the layout, the app should guide students with character limits.

Suggested maximums:

```txt id="695pm5"
Short fact responses:        200 characters
Research responses:          400 characters
Evidence explanations:       400 characters
Comparison responses:        350 characters
One-sentence judgement:      180 characters
Final answer:                1,200–1,800 characters
Reflection answers:          300 characters
```

The app should show students when they are close to the limit.

---

# 15. Empty State Handling

If a student leaves a field blank, the report should:

* avoid breaking the layout
* show a subtle placeholder such as “Not completed”
* not produce broken visual elements
* still export successfully
* avoid looking unfinished where possible

Suggested placeholder:

> Not completed yet.

For evidence categories that genuinely do not apply, use:

> No clear evidence.

---

# 16. Export Requirements

The exported PDF should:

* preserve the 8-page structure
* have clean page breaks
* include images correctly
* render fonts correctly
* avoid cut-off text
* use readable font sizes
* work as a digital submission
* be printable if needed
* maintain visual polish

---

# 17. Filename

Suggested PDF filename pattern:

```txt id="829os1"
ancient-human-relatives-[student-name]-[chosen-group].pdf
```

Fallback:

```txt id="wog1m3"
ancient-human-relatives-report.pdf
```

Filenames should be sanitised so spaces and special characters do not cause problems.

---

# 18. Implementation Notes

If browser print export is not good enough, use Playwright or another server-side/browser-rendered PDF approach.

For version 1, it is acceptable to first build:

* report preview
* print CSS
* manual print/save as PDF

Then later add one-click PDF generation.

However, the design should be created with one-click PDF generation in mind.

---

# 19. Quality Bar

The PDF is successful if:

* pupils would want to show it at home
* it looks more like a science magazine than a worksheet
* it clearly uses the pupil’s own responses
* it reinforces the branching-tree model of human evolution
* it presents uncertainty and evidence clearly
* it exports reliably
* it can be submitted digitally without extra formatting work

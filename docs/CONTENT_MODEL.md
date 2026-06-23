# Content Model

## Purpose

This document explains the content and student response structure for the Ancient Human Relatives web quest.

It is written as guidance for Codex. Codex can later turn this into TypeScript files such as:

* `src/data/hominins.ts`
* `src/types/studentWork.ts`
* `src/lib/storage.ts`

Do not manually create those TypeScript files yet unless a build task asks for them.

---

# 1. Hominin Groups

The app should include eight core hominin groups and one extension group.

## Core Groups

1. *Australopithecus afarensis*
2. *Homo habilis*
3. *Homo erectus*
4. *Homo heidelbergensis*
5. Neanderthals
6. Denisovans
7. *Homo floresiensis*
8. *Homo sapiens*

## Extension Group

9. *Homo naledi*

*Homo naledi* should be clearly labelled as an extension case. It should not disrupt the main numbered sequence.

---

# 2. Shared Information Needed for Each Group

Each hominin group should eventually have the following information stored in the app:

## Basic Identity

* group number
* display name
* scientific name where appropriate
* subtitle
* short hook
* whether it is a core group or extension group

## Timeline and Location

* approximate date range
* main known locations
* timeline start point
* timeline end point
* whether it overlapped with *Homo sapiens*

## Images

* poster image path
* optional cover image path
* short image caption

## Scientific Summary

Each group needs short summaries for:

* body plan
* lifestyle
* evidence
* big idea
* debate or uncertainty

## Report Content

Each group also needs:

* a short pull quote
* a report caption
* a “why this group matters” sentence

These will be used in the final magazine-style PDF.

---

# 3. Asset File Names

Poster images should use these filenames:

```txt
01-australopithecus-afarensis.png
02-homo-habilis.png
03-homo-erectus.png
04-homo-heidelbergensis.png
05-neanderthals.png
06-denisovans.png
07-homo-floresiensis.png
08-homo-sapiens.png
09-homo-naledi-extension.png
```

Cover image:

```txt
ancient-human-relatives-cover.png
```

Current working folder:

```txt
/assets/posters/
/assets/covers/
```

Once the actual Next.js app is created, Codex may move these to:

```txt
/public/assets/posters/
/public/assets/covers/
```

That is fine.

---

# 4. Group Content

## 1. *Australopithecus afarensis*

### Subtitle

One of the earliest clearly bipedal human relatives.

### Hook

*A. afarensis* shows that walking upright evolved before large brains.

### Date Range

About 3.85–2.95 million years ago.

### Location

Eastern Africa, especially Ethiopia, Kenya and Tanzania.

### Known For

Lucy, the Dikika child and the Laetoli footprints.

### Body Plan

Small-brained and partly ape-like, but clearly adapted for walking upright on two legs.

### Lifestyle

Probably lived in mixed woodland and grassland environments. It may still have climbed trees.

### Evidence

Fossils, partial skeletons and footprints provide strong evidence for bipedalism.

### Big Idea

Upright walking evolved before large brains.

### Debate / Uncertainty

Scientists still debate how much time *A. afarensis* spent in trees compared with walking on the ground.

### Pull Quote

Walking upright evolved before large brains.

### Report Caption

*A. afarensis* is one of the clearest examples that early human evolution did not begin with a large brain.

---

## 2. *Homo habilis*

### Subtitle

An early *Homo* species with a debated place in the family tree.

### Hook

*H. habilis* sits near the blurred boundary between australopithecines and later humans.

### Date Range

About 2.4–1.65 million years ago.

### Location

Mainly East and South Africa.

### Known For

Early *Homo* fossils and possible association with simple stone tools.

### Body Plan

Larger-brained than australopithecines, but still small-bodied with several primitive features.

### Lifestyle

May have used simple stone tools, although stone tool use probably began before *H. habilis*.

### Evidence

Fragmentary skulls, jaws, teeth, limb bones and associated archaeological evidence.

### Big Idea

*H. habilis* shows that the origin of *Homo* was gradual and messy, not a clean step forward.

### Debate / Uncertainty

Scientists debate whether *H. habilis* truly belongs in the genus *Homo*.

### Pull Quote

The boundary between early *Homo* and earlier hominins is not neat.

### Report Caption

*H. habilis* is useful because it shows how difficult it can be to classify fossil humans.

---

## 3. *Homo erectus*

### Subtitle

A long-lasting human species that spread widely beyond Africa.

### Hook

*H. erectus* had a much more modern body shape and survived for an extraordinary length of time.

### Date Range

About 1.9 million to around 100,000 years ago.

### Location

Africa and Asia, including Java and China.

### Known For

Long-distance dispersal, modern body proportions and Acheulean tools in some populations.

### Body Plan

More human-like body proportions, with longer legs, shorter arms and a body adapted for travelling on the ground.

### Lifestyle

Likely travelled long distances, used stone tools, and may have controlled fire at some sites.

### Evidence

Skulls, skeletons, tools and widespread fossil sites across Africa and Asia.

### Big Idea

*H. erectus* was one of the most successful human species ever.

### Debate / Uncertainty

Scientists debate whether African *Homo ergaster* should be treated separately or included within *Homo erectus*.

### Pull Quote

One human species survived for far longer than *Homo sapiens* has existed so far.

### Report Caption

*H. erectus* challenges the idea that modern humans are the only successful humans.

---

## 4. *Homo heidelbergensis*

### Subtitle

A possible ancestor of later human groups.

### Hook

*H. heidelbergensis* may sit close to the branching point leading to *Homo sapiens*, Neanderthals and Denisovans.

### Date Range

Roughly 700,000–200,000 years ago.

### Location

Africa, Europe and possibly western Asia.

### Known For

Large-brained Middle Pleistocene humans and possible links to later lineages.

### Body Plan

Strongly built and large-brained, with a mixture of older and more recent human traits.

### Lifestyle

Likely used stone tools and hunted large animals. Some Middle Pleistocene humans made wooden spears.

### Evidence

Important fossils include the Mauer mandible, Sima de los Huesos material, Kabwe/Broken Hill and Bodo.

### Big Idea

This group may be close to the common ancestry of several later human lineages.

### Debate / Uncertainty

This is a messy category. Some fossils may belong to other Middle Pleistocene groups.

### Pull Quote

Some branches of the human family tree are difficult to separate.

### Report Caption

*H. heidelbergensis* is important because it sits near one of the most debated parts of the human family tree.

---

## 5. Neanderthals

### Scientific Name

*Homo neanderthalensis*

### Subtitle

Close human relatives adapted to Ice Age environments.

### Hook

Neanderthals were not stupid cave people. They were skilled, complex humans.

### Date Range

Roughly 400,000–40,000 years ago.

### Location

Europe and western Asia.

### Known For

Cold adaptation, large brains, skilled hunting, tools and interbreeding with *Homo sapiens*.

### Body Plan

Stocky, muscular bodies, large noses, heavy brow ridges and large brains.

### Lifestyle

Skilled hunters and toolmakers who used fire and may have shown symbolic behaviour.

### Evidence

Extensive fossils, tools, cave sites, DNA and evidence of interbreeding.

### Big Idea

Neanderthals show that *Homo sapiens* were not the only intelligent humans.

### Debate / Uncertainty

Scientists still debate why Neanderthals disappeared.

### Pull Quote

Neanderthals were close human relatives, not failed versions of us.

### Report Caption

Neanderthals are central to understanding human evolution because they overlapped and interbred with *Homo sapiens*.

---

## 6. Denisovans

### Subtitle

Ancient humans known mostly from DNA.

### Hook

Denisovans show how genetics has transformed our understanding of human evolution.

### Date Range

Probably Middle to Late Pleistocene.

### Location

First identified from Denisova Cave in Siberia, with genetic evidence across parts of Asia.

### Known For

Ancient DNA, fragmentary fossils and interbreeding with other human groups.

### Body Plan

Poorly known because we lack complete skeletons. Some evidence suggests they may have been robust.

### Lifestyle

Likely varied across different Asian environments.

### Evidence

Mostly ancient DNA, plus a small number of fossil fragments including material from Denisova Cave and Baishiya Karst Cave.

### Big Idea

Denisovans show that DNA can reveal ancient humans even when fossils are scarce.

### Debate / Uncertainty

Scientists are still unsure what Denisovans looked like, how many populations existed, and which fossils may belong to them.

### Pull Quote

Some ancient humans were discovered first through DNA, not skeletons.

### Report Caption

Denisovans are a powerful example of how genetic evidence can change the human family tree.

---

## 7. *Homo floresiensis*

### Subtitle

A small island human from Flores, Indonesia.

### Hook

*H. floresiensis* shows that human evolution did not always mean larger bodies or larger brains.

### Date Range

Fossils about 100,000–60,000 years ago; associated tools about 190,000–50,000 years ago.

### Location

Flores, Indonesia.

### Known For

Very small body size, small brain and island life.

### Body Plan

Very small body, around 1 metre tall, with a very small brain.

### Lifestyle

Used stone tools and may have hunted or scavenged island animals, including dwarf Stegodon.

### Evidence

Partial skeletons, teeth, bones and tools from Flores.

### Big Idea

*H. floresiensis* challenges the assumption that evolution always favours bigger brains and bodies.

### Debate / Uncertainty

Scientists debate whether it descended from *Homo erectus* or from an earlier lineage.

### Pull Quote

Human evolution did not always mean bigger brains or bigger bodies.

### Report Caption

*H. floresiensis* is one of the clearest examples that human evolution was not a simple march toward modern humans.

---

## 8. *Homo sapiens*

### Subtitle

The only surviving human species.

### Hook

*Homo sapiens* are the only humans alive today, but we were not alone for most of our history.

### Date Range

Around 300,000 years ago to present.

### Location

Originated in Africa, then spread globally.

### Known For

Modern humans, symbolic behaviour, complex culture and global spread.

### Body Plan

High rounded skull, smaller brow ridges, smaller face, chin and lighter skeleton compared with many archaic humans.

### Lifestyle

Complex language, symbolic behaviour, long-distance exchange, advanced tools and later agriculture.

### Evidence

Fossils, tools, art, burials, DNA and archaeological sites.

### Big Idea

*Homo sapiens* are the last surviving human species, not the final goal of evolution.

### Debate / Uncertainty

Scientists debate when modern behaviour fully emerged. It was probably not a single sudden event.

### Pull Quote

Last surviving human species, not the final step.

### Report Caption

*Homo sapiens* are the comparison point for the project, but they should not be presented as the inevitable endpoint of evolution.

---

## 9. *Homo naledi* — Extension

### Subtitle

The deep-cave human.

### Hook

*H. naledi* combines a small brain with surprisingly complex questions about behaviour.

### Date Range

About 335,000–236,000 years ago.

### Location

Rising Star Cave System, South Africa.

### Known For

Many fossils from deep cave chambers and a strange mix of primitive and modern traits.

### Body Plan

Small brain, curved fingers, human-like feet and a mixture of primitive and more modern features.

### Lifestyle

Probably lived in a mixed landscape of grasslands, woodlands and caves, but much about its lifestyle remains uncertain.

### Evidence

Over 1,500 fossil fragments from at least 15 individuals in the Rising Star Cave System.

### Big Idea

*H. naledi* shows how surprising and complicated the human family tree can be.

### Debate / Uncertainty

Scientists debate why bodies were found deep in the cave and whether this reflects deliberate behaviour.

### Pull Quote

A small brain does not make the story simple.

### Report Caption

*H. naledi* is best used as an extension case because it raises difficult questions about anatomy, behaviour and classification.

---

# 5. Student Work Sections

The web quest should collect student work in these sections.

## Student Details

Students should enter:

* name
* class
* date
* chosen hominin group
* comparison group

## Misconceptions Starter

Students should respond to these statements:

1. Humans evolved from monkeys.
2. Evolution always makes organisms better.
3. Human evolution was a straight line leading to us.
4. Neanderthals were unintelligent cave people.
5. Bigger brains always mean a species is more successful.
6. *Homo sapiens* lived at the same time as other human species.

For each statement, students should choose:

* true
* false
* partly true

They should then write a short explanation.

## Guided Research

Students should complete answers for:

* when their group lived
* where their group lived or was found
* what their body was like
* how they may have lived
* what evidence scientists have
* why the group matters
* what is still debated or uncertain

## Evidence Dossier

Students should identify and explain:

* fossil evidence
* tool evidence
* DNA evidence
* other archaeological evidence
* the strongest evidence for their group
* the limitations of the evidence

## Life and Adaptations

Students should explain:

* one important physical feature
* why that feature may have been useful
* likely environment
* likely lifestyle
* possible survival pressures

## Comparison Task

Students should compare:

1. their chosen group
2. *Homo sapiens*
3. one other hominin group

They should explain:

* similarities
* differences
* which groups are most similar
* which groups are most different
* what the comparison suggests about human evolution

## Timeline and Overlap Task

Students should answer:

* which groups overlapped with *Homo sapiens*
* which groups overlapped with each other
* why this challenges the ladder model of evolution
* why a branching tree is a better model

## Final Report

Students should write a final response to:

> Human evolution is best understood as a branching tree, not a straight ladder. Evaluate this statement using evidence from at least three ancient human relatives.

The app may scaffold this using:

* introduction
* early evidence paragraph
* later evidence paragraph
* overlap and uncertainty paragraph
* conclusion

Students should also write a one-sentence final judgement.

## Self-Assessment

Students should check whether they have:

* described at least three ancient human relatives
* included accurate dates or approximate time periods
* included evidence from fossils, tools, DNA or archaeology
* explained why human evolution is not a straight line
* included at least one uncertainty or debate
* used scientific vocabulary correctly
* written a clear final judgement

They should also answer:

* What was the most interesting thing you learned?
* What is one thing scientists are still debating?
* What would you improve about your work?

---

# 6. Character Limit Guidance

To protect the final magazine-style PDF layout, the app should guide students with sensible character limits.

Suggested limits:

* short fact responses: 200 characters
* research answers: 400 characters
* evidence explanations: 400 characters
* comparison answers: 350 characters
* one-sentence judgement: 180 characters
* final answer: 1,200–1,800 characters
* reflection answers: 300 characters

The app should show students when they are approaching the limit.

---

# 7. How This Feeds the PDF

The student answers should feed into the 8-page PDF report:

1. Cover page
   Uses student details, chosen group and cover image.

2. Species feature
   Uses chosen group content and student explanation of why it matters.

3. Evidence dossier
   Uses fossil, tool, DNA, other evidence and uncertainty answers.

4. Life and adaptations
   Uses body plan, feature, environment and lifestyle answers.

5. Comparison spread
   Uses chosen group, *Homo sapiens* and comparison group answers.

6. Timeline and overlap
   Uses timeline/overlap answers and branching-tree explanation.

7. Final article
   Uses final written answer and one-sentence judgement.

8. Reflection / back cover
   Uses self-assessment and reflection answers.

---

# 8. Important Scientific Wording

The app should encourage cautious scientific language.

Use phrases such as:

* “evidence suggests”
* “may have”
* “possibly”
* “scientists debate”
* “it is uncertain”
* “known from”
* “based on current evidence”

Avoid overclaiming.

Do not imply:

* human evolution is a ladder
* *Homo sapiens* are the goal of evolution
* extinct species were failures
* all groups are direct ancestors of each other
* bigger brains always mean more successful evolution
* every behaviour is proven with certainty

---

# 9. Future Coding Note for Codex

When Codex begins building the app, it should convert this document into structured TypeScript data.

Likely files:

```txt
src/data/hominins.ts
src/types/hominin.ts
src/types/studentWork.ts
src/lib/storage.ts
```

This should happen during the relevant build stage, not before.

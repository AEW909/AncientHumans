\# Storage Decision



\## Purpose



This document explains the storage decision for version 1 of the Ancient Human Relatives web quest.



The short version:



> Start with localStorage only.



Do not add Airtable, Supabase, logins or a teacher dashboard in version 1.



\---



\# 1. Version 1 Decision



Version 1 should use browser localStorage only.



This means student work is saved in the browser on the device they are using.



Students then generate and download their final PDF report.



They can submit that PDF using the school’s normal system, such as Microsoft Teams.



\---



\# 2. Why localStorage First?



localStorage is the best first approach because:



\* no login is required

\* no database is required

\* progress can persist after a page refresh

\* the app can remain simple

\* deployment is easier

\* there are fewer data protection complications

\* students can still produce a final PDF

\* the activity can be tested quickly with a class



The aim of version 1 is to prove the activity works before adding central storage.



\---



\# 3. Student Workflow



Recommended version 1 workflow:



1\. Student opens the web quest.

2\. Student enters name and class.

3\. Student completes the guided activity.

4\. Work autosaves in the browser.

5\. Student previews the final report.

6\. Student downloads the PDF.

7\. Student uploads the PDF to Teams or another school platform.



\---



\# 4. What localStorage Should Save



localStorage should save:



\* student name

\* class

\* date

\* chosen hominin group

\* comparison group

\* misconception starter answers

\* guided research answers

\* evidence dossier answers

\* life/adaptation answers

\* comparison answers

\* timeline answers

\* final written response

\* self-assessment answers

\* last saved timestamp



The data should match the sections described in `CONTENT\_MODEL.md`.



\---



\# 5. Save Behaviour



The app should:



\* autosave as students type

\* show a save status

\* load saved work when the student returns

\* provide a continue button if saved work exists

\* provide a reset button with confirmation

\* prevent accidental loss where possible



Suggested save status labels:



\* Saving...

\* Saved

\* Last saved at \[time]

\* Unsaved changes

\* Could not save



\---



\# 6. Limitations of localStorage



localStorage has limitations:



\* work is saved only on the same device and browser

\* clearing browser data will remove progress

\* students cannot easily move between devices

\* teacher cannot see live progress centrally

\* there is no central submission record

\* it is not suitable for long-term records



These limitations are acceptable for version 1.



\---



\# 7. Data Protection Benefit



Using localStorage avoids storing pupil data on a third-party database during version 1.



The app itself does not centrally collect student work.



The school’s normal submission system handles the final PDF submission.



This keeps the first version simpler from a data protection point of view.



\---



\# 8. Do Not Add Yet



Do not add these in version 1:



\* Airtable

\* Supabase

\* Firebase

\* pupil login

\* teacher login

\* central dashboard

\* analytics

\* automated marking

\* AI feedback

\* email submission



These may be considered later after the localStorage version has been tested.



\---



\# 9. Future Option: Airtable



Airtable may be useful later if the teacher wants a simple database of submissions.



Possible future workflow:



1\. Student completes the web quest.

2\. Student downloads their PDF.

3\. Student also clicks submit.

4\. Structured responses are sent to Airtable.

5\. Teacher reviews responses in an Airtable table.



\## Pros



\* simple teacher-facing interface

\* good for prototypes

\* easy to review submissions

\* no need to build a full dashboard



\## Cons



\* API keys must not be exposed in browser code

\* requires a serverless API route

\* introduces pupil data storage considerations

\* less flexible than a full database

\* not needed for first testing



Airtable should only be added after the localStorage version works.



\---



\# 10. Future Option: Supabase



Supabase may be useful later if the project becomes a reusable platform.



Possible future workflow:



\* pupil accounts

\* class groups

\* saved drafts across devices

\* teacher dashboard

\* feedback

\* submission history



\## Pros



\* powerful

\* scalable

\* proper database

\* authentication available

\* suitable for long-term platform development



\## Cons



\* more setup

\* more security requirements

\* more development complexity

\* more data protection responsibility

\* overkill for version 1



Supabase is not needed for version 1.



\---



\# 11. Future Data Protection Considerations



If central storage is added later, review:



\* what personal data is collected

\* where it is stored

\* who can access it

\* how long it is kept

\* how data can be deleted

\* whether school approval is needed

\* whether parental or pupil consent is needed

\* whether a data processing agreement is required

\* how exports and deletion requests would be handled



\---



\# 12. Privacy Principle



Avoid collecting unnecessary pupil data.



For version 1, the app only needs:



\* student name

\* class

\* activity responses



Do not collect:



\* email addresses

\* passwords

\* dates of birth

\* home addresses

\* unnecessary identifiers

\* behavioural analytics



\---



\# 13. Local Storage Key



Suggested localStorage key:



```txt id="oqhawl"

ancient-human-relatives-student-work

```



Optional separate key for app version:



```txt id="g7t68m"

ancient-human-relatives-version

```



If the data structure changes later, include a version number so old saved work can be handled safely.



\---



\# 14. Reset Behaviour



The reset button should:



\* warn the user that their saved work will be deleted from this browser

\* require confirmation

\* clear the localStorage key

\* return the student to the start page



Suggested warning:



> This will delete your saved work from this browser. Make sure you have downloaded your PDF if you want to keep it.



\---



\# 15. Current Recommendation



Build version 1 with:



\* localStorage

\* autosave

\* continue previous work

\* reset progress

\* report preview

\* PDF export

\* no central database



Only add Airtable or Supabase after testing with students and deciding that central collection is actually needed.




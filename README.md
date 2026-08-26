# Study Bench — PE Environmental Exam Prep

A static flashcard + problem-set web app for studying for the PE Environmental exam.
No build step, no backend — just HTML/CSS/JS, deployable free on GitHub Pages.

## Run it locally
Open `index.html` in a browser, or serve the folder (needed for the JSON `fetch()` calls to work in some browsers):
```
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

## Deploy to GitHub Pages
```
git add -A
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/pe-env-study-bench.git
git push -u origin main
```
Then in the repo on GitHub: **Settings → Pages → Source → Deploy from branch → main → / (root)**.
Your app will be live at `https://<your-username>.github.io/pe-env-study-bench/`.

If you'd rather keep it private, GitHub Pages works on private repos too if you're on a paid plan; otherwise just use it locally, or make the repo private and skip Pages.

## Adding your own content
Everything lives in three JSON files under `data/` — no code changes needed:

- **`data/topics.json`** — the six exam-spec areas (Water, Air, Solid & Hazardous Waste, Site Assessment & Remediation, EHS, Associated Engineering Principles). Edit `color` per topic if you want.
- **`data/flashcards.json`** — array of `{ id, topic, front, back }`. `id` just needs to be unique. `topic` must match a topic `id`.
- **`data/problems.json`** — array of `{ id, topic, question, choices[], answerIndex, explanation }`.

Just append new objects to the arrays and refresh the page.

## A note on your source material
I seeded this with a handful of original example cards/problems (standard formulas and definitions — Darcy's Law, RCRA Subtitle C/D, benefit-cost ratio, etc.) so the app has something to show out of the box.

I didn't pull content from the PDFs in your "PE Exam Prep" Drive folder (the NCEES Reference Handbooks and School of PE course materials) — those are copyrighted and explicitly marked "not allowed to distribute to others." Copying that text into a repo — even a private one, since it leaves your machine — crosses into redistribution that NCEES and School of PE don't permit.

The fix is easy: when you build out your own cards, **write them in your own words** from what you've studied, rather than pasting handbook text. Formulas, definitions, and facts themselves aren't copyrightable — only NCEES's/School of PE's specific wording and layout are — so a card like "Darcy's Law: Q = -KA(dh/dl)" is totally fine; a paragraph lifted verbatim from the handbook isn't.

## Progress tracking
Flashcard progress uses a simple 5-box leitner system stored in your browser's `localStorage` (key `pe-study-progress-v1`) — cards you get right move to a higher box and come back less often; cards you miss reset to box 0. This is per-browser, not synced anywhere.

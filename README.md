# DevPlus-Learn — MockTest Lite (Reading mini app)

A small front-end project for practicing reading tests. This repository contains a lightweight React (UMD) app that renders multiple-choice questions, supports Next/Prev navigation, and shows a score summary after submitting answers.

## Quick start

Serve the project with a simple static server and open the test page in your browser:

PowerShell (from project root):

```powershell
python -m http.server 8000
# then open http://localhost:8000/test.html
```

Alternatively use any static server you prefer.

## What you'll find here

- `index.html` — landing page (non-React) with test key form.
- `test.html` — the test page which mounts the React reading app and the NavBar.
- `questions.json` — sample questions used by the app.
- `styles.css` — shared styling used by the pages.
- `react-app.js` — main React application (UMD) that manages question fetching, navigation, selection state, and scoring.

Folders:
- `components/` — UMD-style React components that attach to `window.Components` (NavBar, Choices, QuestionCard). Useful for running in the browser without a bundler.
- `hooks/` — notes and placeholders for hooks; previously included an invalid hook implementation which was removed and replaced with a comment. See `hooks/README.md`.
- `assets/` — static assets (logo.svg placeholder and README).

## App behavior

- The test page mounts the NavBar into `#nav-root`, and the reading app into `#questions-container`.
- Navigation is single-question view with Next/Prev; the Submit button appears on the last question and becomes enabled after all questions have answers.
- On Submit the app shows a Score view listing correct/incorrect answers and offers a Restart button.
- Selections are tracked in `react-app.js` using `useState` in an object keyed by question id: `{ [questionId]: selectedIndex }`.

## Development notes

- Components are currently written as UMD scripts for simplicity. If you plan to add tests or bundle the app, migrate them to ES modules:

  - Convert `components/*.js` to `export default` / named exports.
  - Change `react-app.js` to import those modules.

- Hooks: if you want centralized navigation in a hook, implement an ES module hook (e.g., `hooks/useNavigation.js`) that exports `useNavigation` and import it from `react-app.js`. Avoid calling React hooks from non-hook global functions — follow the Rules of Hooks.

- Linting: no ESLint config is currently included. I recommend adding an ESLint + Prettier setup if you want to enforce style and catch issues early.

## Troubleshooting

- Blank page or nothing rendering — open DevTools and check Console and Network. Verify `react-app.js`, `components/*.js` and `questions.json` are loading (HTTP 200) and that there are no runtime errors.
- If fetch for `questions.json` fails on `file://` URIs, ensure you use a local server (see Quick start above).

## Next steps I can help with

- Migrate `components/` and `hooks/` to ES modules and add unit tests with Jest.
- Add ESLint and a small CI check.
- Improve the UI or add more test question data.

If you want, I can proceed to convert the UMD components to ES modules next — say the word and I'll refactor and update imports.

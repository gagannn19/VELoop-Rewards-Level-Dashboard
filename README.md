# VELOOP Rewards — Level-Up Dashboard (WIP)

Frontend internship task (Task 16) redesign of the Level-Up Dashboard.

**Status: Day 1 of 5 — dashboard skeleton.**
This README is a placeholder and will be replaced with the full
project documentation (per the task's submission checklist) on Day 5,
once every feature below is wired up.

## What's working today

- `LevelHero` — current level badge + animated XP progress bar
- `LevelRoadmap` — full completed / current / locked level states
  (the existing live dashboard only ever shows completed levels — this
  is one of the concrete improvements this redesign makes)
- `NextLevelReward` — locked next-level reward panel
- Loading skeleton + error state (see `src/hooks/useLevelData.js` —
  load the app with `?forceError=1` in the URL to preview the error
  state on demand)
- Responsive at mobile / tablet / laptop / desktop widths

## Not wired up yet (already built, arriving on schedule)

These components exist under `src/components/` but aren't imported
into the page yet — intentional, per the 5-day plan:

- `PlayAndEarn` (mini-game) — Day 2. **Note:** the mini-game concept
  is being reworked before this gets wired in, since the current
  implementation is too close to the existing live dashboard's game.
- `EarnMoreXP`, `XPActivity` — Day 3
- `LevelUpModal` — wired in once the game can actually award XP

## Tech stack

React 19 + Vite, Bootstrap grid utilities, CSS Modules, React Hooks,
lucide-react icons.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build
npm run preview   # preview the production build locally
```

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TRIPP+ Enterprise Fund Advance Request Process application - an interactive web guide for State Department fund advance requests. Single-page React application built with Vite.

**Production URL**: https://tripp-advance-request-app-v3.vercel.app
**GitHub**: https://github.com/djeckert17/tripp-advance-request-app-v3

## Development Commands

```bash
# Development
npm run dev          # Start dev server at http://localhost:5173

# Build
npm run build        # Production build to dist/

# Quality
npm run lint         # Run ESLint

# Preview
npm run preview      # Preview production build locally
```

## Architecture

### Single-Component Design
The entire application is a **single self-contained React component** (`src/App.jsx`) - approximately 1,850 lines including:
- Embedded CSS-in-JS (lines 9-1181)
- All data structures (phases, budgetMapping, pitfalls, checklists)
- All UI components as nested functions
- No external CSS files, no component splitting

This intentional monolithic design makes the app extremely portable and easy to customize.

### Data Layer
All application data is **hardcoded** in JavaScript objects at the top of `App.jsx`:
- `phases` - 4-phase timeline with steps
- `budgetMapping` - 7 budget categories with breakdowns
- `pitfalls` - 7 common mistakes and solutions
- Checklist arrays: `preSubmissionChecklist`, `submissionChecklist`, `postSubmissionChecklist`

No API calls, no database, no external data sources.

### State Management
Uses React `useState` only:
- `activeTab` - Navigation state (Overview, Timeline, Form Structure, etc.)
- `activePhase` - Timeline phase selection
- `checkedItems` - **Persisted to localStorage** as `'tripp-checklist-state'`

The checklist checkbox states persist across browser sessions using localStorage. When modifying checklist functionality, ensure localStorage sync is maintained.

### Styling System
CSS embedded as template string with CSS Variables for theming:
- **TRIPP+ Brand Colors**: `--tripp-navy`, `--tripp-gold`, `--tripp-royal-blue`
- **Fonts**: Inter (sans-serif), JetBrains Mono (monospace)
- **Responsive**: Mobile-first with breakpoints at 640px, 900px, 1100px

## Key Technical Details

### Entry Points
- `index.html` - HTML shell (loads Vite)
- `src/main.jsx` - React mounting point
- `src/App.jsx` - Entire application

### Build Configuration
- **Vite** for build/dev server (standard React config)
- **Vercel** for deployment (automatic on git push to main)
- Output: `dist/` directory

### Deployment
Connected to Vercel with GitHub integration:
- Push to `main` → automatic production deployment
- Pull requests → automatic preview deployments
- Vercel config in `vercel.json`

## Content Updates

To modify application content, edit data structures in `App.jsx`:

**Timeline/Process**: Edit `phases` array (line ~1199)
**Budget Categories**: Edit `budgetMapping` array (line ~1249)
**Common Mistakes**: Edit `pitfalls` array (line ~1323)
**Checklists**: Edit `*Checklist` arrays (lines ~1365-1395)

**Styling**: Modify CSS template string starting at line 9. All styles use CSS variables defined in `:root` (lines 12-37).

## Important Constraints

1. **No Component Splitting**: The app is intentionally a single component. Don't break it apart unless explicitly requested.

2. **localStorage Dependency**: The checklist feature depends on browser localStorage. Changes to checklist state management must maintain the `'tripp-checklist-state'` key and JSON serialization.

3. **Embedded Styles**: All CSS is embedded in the component. Don't create separate CSS files.

4. **Static Data**: All content is hardcoded. There's no CMS, no API, no dynamic data fetching.

5. **Production Context**: This is a professional State Department grant process guide. Maintain formal tone and accuracy when making content changes.

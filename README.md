# TheHireHub.AI - Candidate Pipeline Dashboard

A modern, responsive, dark glassmorphic B2B SaaS dashboard built for hiring and recruitment workflows. This interface allows hiring managers to seamlessly track candidate pipelines, filter by job metrics, and manage complex recruitment stages in both List and Kanban formats.

## Features
- **Dual Views:** Effortlessly toggle between a data-rich **Data Grid** (Table View) and an interactive **Kanban Board** (Pipeline View).
- **Mobile First:** A fully responsive off-canvas sidebar (via a hamburger menu), stacking flex layouts, and horizontal swipe scrolling for tables natively on mobile. Includes viewport pan-locking ensuring swipe touches do not derail the site!
- **Edge-Case Ready:** Handled empty states for tables, search queries, and kanban columns beautifully. Also incorporates loading skeleton states across all major layout panels explicitly preventing layout shift (CLS).
- **Candidate Detail Drawer:** Advanced off-canvas drawer pulling full candidate context, interviews, note threads, and match scores.

## Tech Stack
- **Framework:** React.js + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Vanilla PostCSS native classes, NO heavy component libraries!)
- **Icons:** Inline efficient SVG strokes
- **Deployment:** Vercel (Production Build Ready)

## How to Run Locally

### 1. Pre-requisites
Ensure you have `Node.js` installed (v16.0 or greater).

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Navigate to `http://localhost:5173` in your browser.

### 4. Build for Production
```bash
npm run build
```
This generates the minimized, highly optimized vanilla React bundle inside the `dist/` directory.

## Deployment Notes
This project is configured out-of-the-box for **Vercel**. Simply link your GitHub repository to a new Vercel project, and it will autodetect `Vite` settings natively.
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

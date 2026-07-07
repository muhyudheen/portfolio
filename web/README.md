# Muhammed Muhyudheen — Portfolio

Personal portfolio + blog. Rebuilt with **React + Vite + TypeScript**.

## Stack
- React 19 + Vite 6
- react-router-dom 7
- framer-motion (scroll/entrance animation)
- Plain CSS with design tokens + CSS Modules

## Develop
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build → dist/
npm run preview  # serve the production build
```

## Structure
```
src/
  data/        real content (profile, projects, blog) — single source of truth
  components/   Nav, Footer, Cursor, Layout (one folder per component + CSS module)
  pages/        Home, Blog, BlogPost, NotFound
  hooks/        useTheme
  styles/       tokens.css (palette/type), global.css (reset + primitives)
```

## Phases
- **P0** safety/cleanup ✅
- **P1** foundation: tokens, layout, routing, theme, cursor ✅
- **P2** home page (hero, marquee, real projects, about)
- **P3** blog (markdown-driven list + article)
- **P4** polish: a11y, SEO/meta, responsive, Lighthouse
- **P5** (optional) AI chat assistant + FastAPI backend wiring

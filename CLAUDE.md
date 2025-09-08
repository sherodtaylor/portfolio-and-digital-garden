# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Local Development
```bash
npm run dev          # Start development server at http://localhost:3000
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run prettier     # Format code with Prettier
```

### Environment Setup
- Create `.env.local` with `NEXT_PUBLIC_SITE_URL=http://localhost:3000` (or your domain for production)
- This environment variable is required for RSS feed generation and metadata

## Architecture Overview

### Core Technology Stack
- **Next.js 14** with App Router and TypeScript
- **Tailwind CSS** with shadcn/ui components system
- **MDX** for blog articles with custom plugins
- **Framer Motion** for animations
- **Vercel Analytics** for tracking

### Project Structure

**Content Management:**
- Articles are stored as MDX files in `src/app/articles/[slug]/page.mdx`
- Each article exports an `article` object with metadata (title, description, author, date)
- Articles are automatically discovered and sorted by date using `src/lib/articles.ts`
- RSS feed is auto-generated from articles at `/feed.xml` route

**Component Architecture:**
- Main layout structure: `Layout` → `Header` + `main` + `Footer`
- Article rendering uses `ArticleLayout` component for consistent styling
- Motion components (`motion-div.tsx`, `motion-list.tsx`, `motion-text.tsx`) wrap Framer Motion
- shadcn/ui integration via `components.json` config

**Styling System:**
- CSS variables for theming (light/dark mode support via next-themes)
- Tailwind config extends default theme with custom color palette
- Typography plugin for article content styling
- Custom Prism themes for code syntax highlighting

### Key Files and Their Purpose

**Configuration:**
- `next.config.mjs`: MDX processing with remark/rehype plugins for GitHub-flavored markdown and syntax highlighting
- `tailwind.config.ts`: Extended theme with CSS variables and shadcn/ui integration
- `mdx-components.tsx`: Global MDX component overrides (images use Next.js Image component)

**Content Systems:**
- `src/lib/articles.ts`: Article discovery and metadata extraction using fast-glob
- `src/app/feed.xml/route.ts`: RSS feed generation that fetches rendered HTML and parses with Cheerio
- Article metadata flows through Next.js metadata API for SEO

### Article Creation Workflow
1. Create new directory: `src/app/articles/YYYY.M.D-slug/`
2. Add `page.mdx` with required exports:
   ```typescript
   export const article = {
     author: 'Sherod Taylor',
     date: 'YYYY-MM-DD',
     title: 'Article Title',
     description: 'Brief description'
   }
   ```
3. Articles automatically appear in article listing and RSS feed

### Path Aliases
- `@/*` maps to `src/*` (configured in tsconfig.json)
- Use `@/components`, `@/lib`, etc. for imports

### Theme and Styling
- Dark mode implemented via `next-themes` with class-based switching
- Color system uses HSL CSS variables for consistent theming
- Components follow shadcn/ui patterns with variant-based styling

### Performance Considerations
- Next.js Image component used for optimized image loading
- Static generation for articles and RSS feed
- Fast-glob for efficient file system operations
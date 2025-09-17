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

## Resume Generation System

This project includes an automated resume generation system that converts YAML configuration to PDF resumes using LaTeX.

### Resume Generation Commands
```bash
python3 generate-resume.py    # Generate LaTeX from config.yaml
# Compile to PDF using your preferred LaTeX compiler (xelatex, pdflatex, etc.)
```

### Resume System Components

**Configuration Management:**
- `config.yaml`: Single source of truth for all resume content including personal info, experience, skills, projects, and community involvement
- Structured data format enables easy updates and consistency across web portfolio and PDF resume
- Contains sections: personal, contact, hero highlights, skills categories, experience positions, projects, and community activities

**LaTeX Template System:**
- `resume-template.tex`: Professional LaTeX template with custom styling and color scheme
- `generate-resume.py`: Python script that processes config.yaml and populates LaTeX template
- Generates `generated-resume.tex` ready for PDF compilation
- Template includes custom commands for consistent formatting: `\jobtitle`, `\project`, `\skillcategory`, `\communityrole`, `\highlightbox`

**Template Features:**
- Color-coded highlight boxes for key skills and expertise areas
- Professional typography using FiraCode Nerd Font with FontAwesome icons
- Responsive layout optimized for single-page PDF format
- LaTeX character escaping for special characters in YAML content
- Consistent spacing and alignment throughout all sections

### Resume Content Management
1. Edit `config.yaml` to update resume content
2. Run `python3 generate-resume.py` to generate LaTeX
3. Compile LaTeX to PDF using preferred compiler
4. Content automatically syncs between web portfolio and PDF resume

### Design Consistency
Both the web portfolio and PDF resume should maintain visual consistency:
- Use matching color schemes and typography when possible
- Ensure content parity between config.yaml and web components
- Follow the same information hierarchy and section organization

## Styling Guidelines & Responsive Design

### Design Principles
- **Mobile-First Approach**: Always design and implement for mobile devices first, then enhance for larger screens
- **Progressive Enhancement**: Start with core functionality that works everywhere, then add enhanced features for capable devices
- **Consistent Visual Language**: Maintain cohesive styling across all components and pages

### Responsive Design Requirements

**Breakpoint Strategy:**
- **Mobile**: `< 768px` - Single column layouts, larger touch targets, simplified navigation
- **Tablet**: `768px - 1024px` - Balanced layouts, moderate information density
- **Desktop**: `> 1024px` - Multi-column layouts, full feature sets, hover interactions

**Key Responsive Considerations:**
- Touch-friendly interface elements (minimum 44px touch targets)
- Readable typography on all screen sizes (minimum 16px base font size)
- Optimized image delivery using Next.js Image component with responsive sizing
- Efficient use of screen real estate without overwhelming smaller viewports

### Component Styling Standards

**Tailwind CSS Usage:**
- Use existing Tailwind utilities before creating custom CSS
- Leverage CSS variables from the design system for consistent theming
- Follow shadcn/ui component patterns for new components
- Use responsive modifiers (`sm:`, `md:`, `lg:`, `xl:`) for adaptive layouts

**Animation Guidelines:**
- Use Framer Motion for complex animations and page transitions
- Respect user preferences with `prefers-reduced-motion` media query
- Keep animations subtle and purposeful - enhance UX without distraction
- Optimize animation performance using transform and opacity properties

**Typography Hierarchy:**
- Maintain consistent text scaling across breakpoints
- Use semantic HTML headings (h1-h6) with proper hierarchy
- Ensure sufficient color contrast (WCAG AA standards minimum)
- Apply consistent line height and spacing for optimal readability

### Performance & Accessibility

**Image Optimization:**
- Always use Next.js Image component for automatic optimization
- Provide appropriate alt text for all images
- Use responsive image sizing with appropriate aspect ratios
- Implement lazy loading for images below the fold

**Core Web Vitals:**
- Optimize Largest Contentful Paint (LCP) with image optimization and critical CSS
- Minimize Cumulative Layout Shift (CLS) with proper image dimensions and font loading
- Reduce First Input Delay (FID) with code splitting and lazy loading

**Accessibility Standards:**
- Ensure keyboard navigation works throughout the application
- Provide proper ARIA labels and semantic markup
- Test with screen readers and other assistive technologies
- Maintain focus management for interactive elements and page transitions
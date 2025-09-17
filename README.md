# Sherod Taylor - Portfolio & Digital Garden

A modern, full-stack portfolio website built with Next.js 14, featuring an integrated blog system, automated resume generation, and responsive design optimized for both mobile and desktop experiences.

## 🎯 Project Overview

This project serves as both a personal portfolio and digital garden, showcasing professional experience while providing a platform for sharing technical insights through blog articles. The system includes an automated resume generation pipeline that maintains consistency between web and PDF formats.

### Key Features

- **📱 Responsive Design**: Mobile-first approach with optimized layouts across all device sizes
- **📝 Blog System**: MDX-powered articles with syntax highlighting and RSS feed generation
- **📄 Resume Generation**: Automated LaTeX-to-PDF resume creation from YAML configuration
- **🎨 Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **🌙 Dark Mode**: Full theme switching with next-themes
- **⚡ Performance**: Optimized for Core Web Vitals with Next.js 14 App Router
- **🔍 SEO Optimized**: Automatic metadata generation and structured data

## 🏗️ Architecture

### Core Technology Stack

- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui component system with Radix UI primitives
- **Content**: MDX for articles with remark/rehype plugins
- **Animation**: Framer Motion for page transitions and micro-interactions
- **Analytics**: Vercel Analytics integration
- **Resume**: Python + LaTeX pipeline for PDF generation

### Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── articles/           # Blog articles (MDX files)
│   │   ├── feed.xml/          # RSS feed generation
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   └── motion/           # Framer Motion wrappers
│   └── lib/                  # Utilities and configurations
├── config.yaml               # Portfolio content configuration
├── generate-resume.py        # Resume generation script
├── resume-template.tex       # LaTeX resume template
├── requirements.txt          # Python dependencies for resume
├── setup.sh                  # Resume dependency installation script
├── Makefile                  # Resume build automation
├── public/                   # Static assets and generated resume
│   └── resume.pdf           # Final resume PDF
└── CLAUDE.md                # Development guidelines
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.x (for resume generation)
- LaTeX distribution (for PDF compilation)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-and-digital-garden
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   # Create .env.local file
   echo "NEXT_PUBLIC_SITE_URL=http://localhost:3000" > .env.local
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **View the site**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Content Management

### Blog Articles

Articles are stored as MDX files in `src/app/articles/[slug]/page.mdx`:

```typescript
// Required article metadata
export const article = {
  author: 'Sherod Taylor',
  date: 'YYYY-MM-DD',
  title: 'Article Title',
  description: 'Brief description'
}

// Article content in MDX format
# Article Content
Your content here with full MDX support...
```

### Portfolio Configuration

All portfolio content is managed through `config.yaml`:

- **Personal Information**: Name, title, location, description
- **Contact Details**: Email, website, social links
- **Skills & Experience**: Categorized skills with experience levels
- **Work History**: Detailed position information with achievements
- **Projects**: Personal and professional project showcases
- **Community**: Leadership and volunteer activities

## 📄 Resume Generation

The automated resume system converts YAML configuration to professional PDF resumes using a complete LaTeX pipeline.

### Quick Start - Resume Generation

1. **Install dependencies:**
   ```bash
   make setup
   ```

2. **Generate resume:**
   ```bash
   make all
   ```

Your resume PDF will be created at `public/resume.pdf`.

### Resume Generation Commands

| Command | Description |
|---------|-------------|
| `make setup` | Install all dependencies (Python venv, PyYAML) |
| `make all` | Generate PDF from config.yaml (default) |
| `make clean` | Remove temporary files |
| `make clean-all` | Remove all generated files |
| `make help` | Show all available commands |

### Manual Resume Generation

```bash
# Generate LaTeX from config.yaml
python3 generate-resume.py

# Compile to PDF (requires LaTeX installation)
xelatex generated-resume.tex
# or
pdflatex generated-resume.tex
```

### Resume System Requirements

- **Python 3** with PyYAML (installed automatically by `make setup`)
- **XeLaTeX** (TeX Live or MacTeX)
- **FiraCode Nerd Font Mono** (`brew install font-fira-code-nerd-font`)

### How Resume Generation Works

1. **YAML Configuration** (`config.yaml`) → Single source of truth for all resume data
2. **Python Script** (`generate-resume.py`) → Converts YAML to LaTeX template
3. **LaTeX Compilation** (`xelatex`) → Generates professional PDF resume

### Resume Features

- **Consistent Branding**: Matches web portfolio design language
- **Professional Layout**: Single-page optimized format
- **Color-Coded Sections**: Visual hierarchy with custom highlight boxes
- **LaTeX Quality**: Publication-ready typography and formatting
- **Automated Updates**: Content syncs automatically from config.yaml
- **Clean Typography**: FiraCode Nerd Font Mono with FontAwesome icons
- **Responsive Layout**: Proper spacing and professional formatting
- **Character Escaping**: Safe handling of special LaTeX characters

## 🎨 Design System

### Responsive Breakpoints

- **Mobile**: `< 768px` - Single column, touch-optimized
- **Tablet**: `768px - 1024px` - Balanced layouts
- **Desktop**: `> 1024px` - Multi-column, full features

### Styling Approach

- **Mobile-First**: Progressive enhancement from mobile base
- **CSS Variables**: HSL-based color system for theming
- **Component Variants**: shadcn/ui patterns for consistency
- **Performance-First**: Optimized animations and image loading

## 🛠️ Development Commands

```bash
# Development
npm run dev              # Start dev server (includes resume build)
npm run build           # Production build
npm run start           # Start production server

# Code Quality
npm run lint            # Run ESLint
npm run prettier        # Format code
npm run check           # Run all checks
npm run fix             # Fix formatting and linting

# Resume Generation
npm run resume:build    # Build resume PDF (runs make)
npm run resume:clean    # Clean build artifacts (runs make clean)
npm run resume:clean-all # Remove all generated files (runs make clean-all)
make setup              # Install resume dependencies
make all                # Generate PDF from config.yaml
make clean              # Remove temporary files
make clean-all          # Remove all generated files
```

## 📊 Performance Features

- **Next.js Image Optimization**: Automatic responsive images with lazy loading
- **Static Generation**: Pre-built pages for optimal loading speeds
- **Code Splitting**: Automatic bundle optimization
- **RSS Feed**: Auto-generated from articles with full content
- **SEO Optimization**: Structured data and meta tag generation

## 🔧 Customization

### Adding New Articles

1. Create directory: `src/app/articles/YYYY.M.D-slug/`
2. Add `page.mdx` with required metadata export
3. Articles automatically appear in listings and RSS feed

### Updating Portfolio Content

1. Edit `config.yaml` with new information
2. Changes reflect immediately on web portfolio
3. Regenerate resume PDF for updated resume:
   ```bash
   make all  # or npm run resume:build
   ```

### Resume Template Customization

To modify the resume design, edit the LaTeX template section in `generate-resume.py`. The template includes:

- Modern, professional design with clean typography
- Color-coded sections and highlights from config.yaml
- FontAwesome icons for visual enhancement
- Automatic LaTeX character escaping for special symbols
- Responsive layout with proper spacing

### Styling Modifications

- Follow existing Tailwind utility patterns
- Use CSS variables for theme consistency
- Implement responsive design with mobile-first approach
- Test across all breakpoints and devices

## 📄 License

This project is based on the Tailwind UI Spotlight template and is licensed under the [Tailwind UI license](https://tailwindui.com/license).

## 🔗 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [MDX](https://mdxjs.com)
- [Framer Motion](https://www.framer.com/motion)
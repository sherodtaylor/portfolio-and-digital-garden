# Resume Generation

This project generates a professional LaTeX resume from YAML configuration.

## Quick Start

1. **Install dependencies:**
   ```bash
   make setup
   ```

2. **Generate resume:**
   ```bash
   make all
   ```

Your resume PDF will be created at `dist/resume.pdf`.

## Configuration

Edit `config.yaml` to customize your resume content:

- **Personal information:** Name, title, location, tagline, description
- **Contact details:** Email, website, GitHub, LinkedIn
- **Hero highlights:** 8 skill/expertise highlights with icons and colors
- **Experience:** Work history with achievements and technologies
- **Skills:** Categorized technical skills with experience levels  
- **Projects:** Personal projects with descriptions and links

## Commands

| Command | Description |
|---------|-------------|
| `make setup` | Install all dependencies (Python venv, PyYAML) |
| `make all` | Generate PDF from config.yaml (default) |
| `make clean` | Remove temporary files |
| `make clean-all` | Remove all generated files |
| `make help` | Show all available commands |

## Requirements

- **Python 3** with PyYAML (installed automatically by `make setup`)
- **XeLaTeX** (TeX Live or MacTeX)
- **FiraCode Nerd Font Mono** (`brew install font-fira-code-nerd-font`)

## How It Works

1. **YAML Configuration** (`config.yaml`) → Single source of truth for all resume data
2. **Python Script** (`generate-resume.py`) → Converts YAML to LaTeX template
3. **LaTeX Compilation** (`xelatex`) → Generates professional PDF resume

## File Structure

```
├── config.yaml              # Resume content configuration
├── generate-resume.py       # YAML-to-LaTeX converter
├── requirements.txt         # Python dependencies
├── setup.sh                 # Dependency installation script
├── Makefile                 # Build automation
└── dist/
    └── resume.pdf           # Generated resume
```

## Customization

The resume template is based on a modern, professional design with:

- Clean typography using FiraCode Nerd Font Mono
- Color-coded sections and highlights
- Responsive layout with proper spacing
- FontAwesome icons for visual enhancement
- LaTeX character escaping for special symbols

To modify the template design, edit the LaTeX template section in `generate-resume.py`.
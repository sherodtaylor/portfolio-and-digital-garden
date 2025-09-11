#!/usr/bin/env python3
"""
Resume LaTeX Generator from YAML Configuration
Generates a LaTeX resume template from config.yaml
"""

import yaml
import sys
from pathlib import Path

def load_config(config_path="config.yaml"):
    """Load and parse the YAML configuration file."""
    try:
        with open(config_path, 'r') as file:
            return yaml.safe_load(file)
    except FileNotFoundError:
        print(f"Error: Config file '{config_path}' not found.")
        sys.exit(1)
    except yaml.YAMLError as e:
        print(f"Error parsing YAML: {e}")
        sys.exit(1)

def escape_latex(text):
    """Escape special LaTeX characters in text."""
    if text is None:
        return ""
    
    # Replace special LaTeX characters in correct order (backslash first)
    replacements = [
        ('\\', '\\textbackslash{}'),
        ('&', '\\&'),
        ('%', '\\%'),
        ('$', '\\$'),
        ('#', '\\#'),
        ('^', '\\textasciicircum{}'),
        ('_', '\\_'),
        ('{', '\\{'),
        ('}', '\\}'),
        ('~', '\\textasciitilde{}'),
    ]
    
    for char, replacement in replacements:
        text = text.replace(char, replacement)
    
    return text

def generate_header(config):
    """Generate the LaTeX header section."""
    personal = config['personal']
    contact = config['contact']
    
    return f"""% Header Section
{{\\Large\\bfseries\\color{{textdark}} {personal['name']}}}

\\vspace{{0.1em}}
{{\\normalsize\\color{{textgray}} {personal['title']}}}

\\vspace{{0.1em}}
{{\\small\\color{{textdark}}\\textit{{{personal['tagline']}}}}}

\\vspace{{0.1em}}
{{\\small\\color{{textgray}} {personal['location']}}}

\\vspace{{0.3em}}
{{\\scriptsize\\color{{accentblue}}
    \\faEnvelope\\ \\href{{mailto:{contact['email']}}}{{{contact['email']}}} \\quad
    \\faGlobe\\ \\href{{{contact['website']}}}{{www.sherodtaylor.dev}} \\quad
    \\faGithub\\ \\href{{{contact['github']}}}{{github.com/sherodtaylor}} \\quad
    \\faLinkedin\\ \\href{{{contact['linkedin']}}}{{linkedin.com/in/sherodtaylor}}
}}

\\vspace{{0.8em}}

% Summary above highlights

\\vspace{{0.3em}}

{{\\small {personal['description']}}}

\\vspace{{1em}}"""

def get_fontawesome_icon(icon_name):
    """Map icon names to FontAwesome commands."""
    icon_map = {
        'Users': '\\faUsers',
        'Layers': '\\faServer',
        'Activity': '\\faChartLine', 
        'Code': '\\faCode',
        'Crown': '\\faStar',
        'CheckSquare': '\\faCheckSquare',
        'Package': '\\faCube',
        'Palette': '\\faPaintBrush'
    }
    return icon_map.get(icon_name, '\\faCode')

def get_highlight_color(color_name):
    """Map color names to LaTeX color definitions."""
    color_map = {
        'green': 'highlightgreen',
        'purple': 'highlightpurple', 
        'orange': 'highlightorange',
        'cyan': 'highlightcyan',
        'amber': 'highlightamber',
        'emerald': 'highlightemerald',
        'rose': 'highlightrose',
        'indigo': 'highlightindigo'
    }
    return color_map.get(color_name, 'highlightgreen')

def generate_highlights(config):
    """Generate the hero highlights section."""
    highlights = config['hero']['highlights']
    
    # Generate first row (first 4 highlights)
    first_row = []
    for highlight in highlights[:4]:
        icon = get_fontawesome_icon(highlight['icon'])
        color = get_highlight_color(highlight['color'])
        name = highlight['name']
        # Handle the "Full-Stack Development" -> "Full-Stack" mapping
        if name == "Full-Stack Development":
            name = "Full-Stack"
        first_row.append(f"\\highlightbox{{{icon}}}{{{color}}}{{{name}}}")
    
    # Generate second row (next 4 highlights)
    second_row = []
    for highlight in highlights[4:8]:
        icon = get_fontawesome_icon(highlight['icon'])
        color = get_highlight_color(highlight['color'])
        name = highlight['name']
        second_row.append(f"\\highlightbox{{{icon}}}{{{color}}}{{{name}}}")
    
    return f"""% Hero Highlights - 4 boxes evenly spaced
% Calculation: (100% - 4*22%) / 3 = 4% spacing between boxes
\\noindent%
{'\\hfill%\n'.join(first_row)}

\\vspace{{0.3em}}

\\noindent%
{'\\hfill%\n'.join(second_row)}

\\vspace{{1.2em}}"""

def generate_experience(config):
    """Generate the experience section."""
    positions = config['experience']['positions']
    
    experience_content = "% Experience Section\n\\section{Experience}\n\n"
    
    for position in positions:
        company = position['company']
        role = position['role'] 
        url = position['company_url']
        period = position['period']
        description = position['description']
        achievements = position['achievements']
        technologies = position['technologies']
        
        # Format period for LaTeX
        start_date, end_date = period.split(' - ')
        
        # Create achievements list
        achievements_latex = "\n".join([f"\\item {achievement}" for achievement in achievements])
        
        # Create technologies string
        tech_string = " • ".join(technologies)
        
        experience_content += f"""\\workexperience
    {{{role}}}
    {{{company}}}
    {{{url}}}
    {{{start_date}}}
    {{{end_date}}}
    {{{description}}}
    {{
{{\\small\\textbf{{Key achievements:}}}}\\\\[2pt]
\\begin{{itemize}}[nosep, leftmargin=10pt, itemindent=0pt, labelindent=0pt]
{achievements_latex}
\\end{{itemize}}
{{\\scriptsize\\textbf{{Technologies:}}}} {tech_string}
    }}

"""
    
    return experience_content

def generate_skills(config):
    """Generate the skills section."""
    categories = config['skills']['categories']
    
    skills_content = "% Skills Section\n\\section{Skills}\n\n"
    
    for category in categories:
        title = escape_latex(category['title'])
        description = escape_latex(category['description'])
        experience = escape_latex(category['experience'])
        skills_list = [escape_latex(skill['name']) for skill in category['skills']]
        
        # Create skills string
        skills_string = " • ".join(skills_list)
        
        skills_content += f"""\\skillcategory
    {{{title}}}
    {{{description}}}
    {{Expert}}
    {{{experience}}}
    {{{skills_string}}}

"""
    
    return skills_content

def generate_projects(config):
    """Generate the projects section."""
    projects = config['projects']['items']
    
    projects_content = "% Projects Section\n\\section{Projects}\n\n"
    
    for project in projects:
        name = project['name']
        description = project['description']
        tags = project['tags']
        
        # Handle optional link
        link_url = ""
        link_privacy = ""
        if 'link' in project:
            link_url = project['link']['href']
            if project['link']['is_private']:
                link_privacy = "Private"
            else:
                link_privacy = "Public"
        
        # Create tags string
        tags_string = ", ".join(tags)
        
        projects_content += f"""\\project
{{{name}}}
{{{link_url}}}
{{{link_privacy}}}
{{{description}}}
{{{tags_string}}}

"""
    
    return projects_content

def generate_latex_template(config):
    """Generate the complete LaTeX template."""
    
    # LaTeX preamble
    preamble = """\\documentclass[11pt,a4paper]{article}

%% Comprehensive Resume Template - Framer Design with ALL config.yaml data
%% Based on https://optimistic-studies-120476.framer.app/

% Essential packages
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{fontspec}
\\usepackage{geometry}
\\usepackage{xcolor}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{fontawesome5}
\\usepackage{multicol}
\\usepackage{graphicx}
\\usepackage{tikz}
\\usepackage{tabularx}
\\usepackage{array}

% Page geometry - tighter margins
\\geometry{
    top=0.75in,
    bottom=0.75in,
    left=0.75in,
    right=0.75in
}

% Expert-level spacing and alignment controls
\\setlength{\\parindent}{0pt}
\\setlength{\\parskip}{0pt}
\\setlength{\\parsep}{0pt}
\\setlength{\\partopsep}{0pt}
\\setlength{\\itemsep}{0pt}
\\setlength{\\topsep}{0pt}

% Remove default list spacing completely
\\setlist{nosep, leftmargin=0pt}
\\setlist[itemize]{leftmargin=*, labelindent=0pt, itemindent=0pt}

% Ensure consistent line spacing
\\renewcommand{\\baselinestretch}{1.0}
\\linespread{1.0}

% Color definitions from Framer design
\\definecolor{textdark}{HTML}{1F2937}
\\definecolor{textgray}{HTML}{6B7280}
\\definecolor{accentblue}{HTML}{3B82F6}
\\definecolor{rulecolor}{HTML}{E5E7EB}
\\definecolor{backgroundlight}{HTML}{FAF8F6}

% Highlight colors
\\definecolor{highlightgreen}{HTML}{10B981}
\\definecolor{highlightpurple}{HTML}{8B5CF6}
\\definecolor{highlightorange}{HTML}{F59E0B}
\\definecolor{highlightcyan}{HTML}{06B6D4}
\\definecolor{highlightamber}{HTML}{F59E0B}
\\definecolor{highlightemerald}{HTML}{10B981}
\\definecolor{highlightrose}{HTML}{F43F5E}
\\definecolor{highlightindigo}{HTML}{6366F1}

% Font setup - FiraCode Nerd Font Mono for modern, technical aesthetic
\\setmainfont{FiraCode Nerd Font Mono}

% Remove page numbers
\\pagestyle{empty}

% Hyperlink styling
\\hypersetup{
    colorlinks=true,
    linkcolor=accentblue,
    urlcolor=accentblue,
    pdftitle={Sherod Taylor - Platform Engineering Team Lead},
    pdfauthor={Sherod Taylor}
}

% Expert section formatting with precise spacing control
\\titleformat{\\section}
    {\\large\\bfseries\\color{textdark}}
    {}
    {0pt}
    {}
    [\\vspace{2pt}\\textcolor{rulecolor}{\\hrule height 0.5pt}\\vspace{4pt}]

\\titleformat{\\subsection}
    {\\normalsize\\bfseries\\color{textdark}}
    {}
    {0pt}
    {}

% Remove section spacing
\\titlespacing*{\\section}{0pt}{8pt}{0pt}
\\titlespacing*{\\subsection}{0pt}{4pt}{0pt}

% Remove section numbering
\\setcounter{secnumdepth}{0}

% Custom commands
\\newcommand{\\highlightbox}[3]{
    \\begin{minipage}[t]{0.22\\textwidth}
        \\centering
        {\\small\\textcolor{#2}{#1}} \\\\
        \\vspace{0.2em}
        {\\footnotesize\\color{textgray} #3}
    \\end{minipage}
}

\\newcommand{\\skillcategory}[5]{%
\\noindent{\\normalsize\\bfseries\\color{textdark} #1} \\hfill {\\scriptsize\\color{textgray} #4}\\\\[1pt]%
\\noindent{\\small\\color{textgray} #2}\\\\[2pt]%
\\noindent{\\scriptsize\\color{textdark} #5}\\\\[8pt]%
}

\\newcommand{\\workexperience}[7]{%
\\noindent{\\normalsize\\bfseries\\color{textdark} #1} \\hfill {\\scriptsize\\color{textgray} #4}\\\\[1pt]%
\\noindent{\\small\\color{textdark} #2} \\hfill {\\scriptsize\\color{textgray} #5}\\\\[1pt]%
\\noindent{\\scriptsize\\color{accentblue} \\href{#3}{#3}}\\\\[3pt]%
\\noindent{\\small\\color{textdark}#6}\\\\[3pt]%
\\noindent {\\small #7}\\\\[10pt]%
}

\\newcommand{\\project}[5]{%
\\noindent{\\normalsize\\bfseries\\color{textdark} #1}%
\\ifx&#2&\\else%
\\quad {\\scriptsize\\color{accentblue}\\faLink\\ \\href{#2}{View Project}}%
\\fi%
\\ifx&#3&\\else%
\\quad {\\scriptsize\\color{textgray}[#3]}%
\\fi\\\\[3pt]%
\\noindent{\\small\\color{textdark}#4}\\\\[2pt]%
\\noindent{\\scriptsize\\color{textgray}\\textbf{Technologies:} #5}%
\\par%
\\vspace{8pt}%
}

\\begin{document}

"""

    # Generate content sections
    header = generate_header(config)
    highlights = generate_highlights(config)
    experience = generate_experience(config)
    skills = generate_skills(config)
    projects = generate_projects(config)
    
    # Additional sections
    additional_sections = """
% Education
\\section{Education}

{\\normalsize\\bfseries Self-Directed Learning} \\hfill {\\scriptsize\\color{textgray} 2008 - Present}\\\\
{\\small\\color{textgray} Computer Science and Software Engineering}\\\\
\\vspace{0.15em}
{\\small Continuous learning through hands-on experience, open source contributions, technical documentation, and industry best practices.}

% Languages
\\section{Languages}

{\\normalsize English} \\hfill {\\scriptsize\\color{textgray} Native or Bilingual Proficiency}

% Interests
\\section{Interests}

{\\small\\textbf{Technology:}} AI/ML Infrastructure, Platform Engineering, Open Source, Home Lab\\\\
{\\small\\textbf{Leadership:}} Team Building, Technical Mentoring, Engineering Management

\\end{document}
"""

    # Combine all sections
    full_template = (preamble + header + "\n\n" + highlights + "\n\n" + 
                    experience + "\n" + skills + "\n" + projects + "\n" + 
                    additional_sections)
    
    return full_template

def main():
    """Main function to generate the LaTeX resume."""
    config = load_config()
    latex_content = generate_latex_template(config)
    
    # Write to generated resume file
    output_file = "generated-resume.tex"
    with open(output_file, 'w') as f:
        f.write(latex_content)
    
    print(f"Resume LaTeX generated successfully: {output_file}")

if __name__ == "__main__":
    main()
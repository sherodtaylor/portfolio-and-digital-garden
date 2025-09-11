#!/usr/bin/env python3
"""
Resume Generator - Converts YAML configuration to LaTeX resume using external template
"""

import yaml
import sys
from pathlib import Path

# Configuration
CONFIG_FILE = "config.yaml"
TEMPLATE_FILE = "resume-template.tex"
OUTPUT_FILE = "generated-resume.tex"

def load_config(config_path=CONFIG_FILE):
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

def load_template(template_path=TEMPLATE_FILE):
    """Load the LaTeX template file."""
    try:
        with open(template_path, 'r') as file:
            return file.read()
    except FileNotFoundError:
        print(f"Error: Template file '{template_path}' not found.")
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
{{\\Large\\bfseries\\color{{textdark}} {escape_latex(personal['name'])}}}

\\vspace{{0.1em}}
{{\\normalsize\\color{{textgray}} {escape_latex(personal['title'])}}}

\\vspace{{0.1em}}
{{\\small\\color{{textdark}}\\textit{{{escape_latex(personal['tagline'])}}}}}

\\vspace{{0.1em}}
{{\\small\\color{{textgray}} {escape_latex(personal['location'])}}}

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

{{\\small {escape_latex(personal['description'])}}}

\\vspace{{1em}}"""

def generate_highlights(config):
    """Generate the hero highlights section."""
    highlights = config['hero']['highlights']
    
    highlight_boxes = []
    for highlight in highlights:
        icon = highlight['icon']
        color = highlight['color']
        title = escape_latex(highlight['name'])  # Changed from 'title' to 'name'
        
        highlight_boxes.append(f"\\highlightbox{{{icon}}}{{{color}}}{{{title}}}")
    
    # Split into two rows of 4 boxes each using \\hfill for equal spacing
    row1 = "\\hfill".join(highlight_boxes[:4]) + "\\\\\\\\"
    row2 = "\\hfill".join(highlight_boxes[4:]) if len(highlight_boxes) > 4 else ""
    
    return f"""{row1}
\\vspace{{0.4em}}
{row2}"""

def generate_experience(config):
    """Generate the experience section."""
    experiences = config['experience']['positions']  # Changed from 'items' to 'positions'
    
    experience_content = "% Experience Section\n\\section{Experience}\n\n"
    
    for exp in experiences:
        title = escape_latex(exp['role'])  # Changed from 'title' to 'role'
        company = escape_latex(exp['company'])
        location = escape_latex(exp['location'])
        duration = escape_latex(exp['period'])  # Changed from 'duration' to 'period'
        
        experience_content += f"""\\jobtitle{{{title}}}{{{duration}}}{{{company}}}{{{location}}}

"""
        
        # Add achievements
        if 'achievements' in exp and exp['achievements']:
            experience_content += "\\begin{itemize}\n"
            for achievement in exp['achievements']:
                escaped_achievement = escape_latex(achievement)
                experience_content += f"    \\item {escaped_achievement}\n"
            experience_content += "\\end{itemize}\n"
        
        # Add technologies used
        if 'technologies' in exp and exp['technologies']:
            tech_list = [escape_latex(tech) for tech in exp['technologies']]
            tech_string = " • ".join(tech_list)
            experience_content += f"""
\\vspace{{0.2em}}
{{\\scriptsize\\color{{textgray}} Technologies: {tech_string}}}

"""
        
        experience_content += "\\vspace{0.5em}\n\n"
    
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
        name = escape_latex(project['name'])
        description = escape_latex(project['description'])
        link_url = project['link']['href']  # Changed from 'url' to 'href'
        
        projects_content += f"""\\project{{{name}}}{{{description}}}{{{link_url}}}

"""
        
        # Add tags if available
        if 'tags' in project and project['tags']:
            tags = [escape_latex(tag) for tag in project['tags']]
            tags_string = ", ".join(tags)
            projects_content += f"""\\vspace{{0.1em}}
{{\\scriptsize\\color{{textgray}} {tags_string}}}

"""
        
        projects_content += "\\vspace{0.4em}\n\n"
    
    return projects_content

def process_template(template_content, config):
    """Process the template by substituting placeholders with generated content."""
    
    # Generate content sections
    header = generate_header(config)
    highlights = generate_highlights(config)
    experience = generate_experience(config)
    skills = generate_skills(config)
    projects = generate_projects(config)
    
    # Define substitution mappings
    substitutions = {
        '{{HEADER_CONTENT}}': header,
        '{{HIGHLIGHTS_CONTENT}}': highlights,
        '{{EXPERIENCE_CONTENT}}': experience,
        '{{SKILLS_CONTENT}}': skills,
        '{{PROJECTS_CONTENT}}': projects,
    }
    
    # Perform substitutions
    processed_content = template_content
    for placeholder, content in substitutions.items():
        processed_content = processed_content.replace(placeholder, content)
    
    return processed_content

def main():
    """Main function to generate the LaTeX resume."""
    config = load_config()
    template = load_template()
    latex_content = process_template(template, config)
    
    # Write to generated resume file
    with open(OUTPUT_FILE, 'w') as f:
        f.write(latex_content)
    
    print(f"Resume LaTeX generated successfully: {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
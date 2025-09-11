# Portfolio Configuration Guide

Your portfolio app has been successfully refactored to use a single YAML configuration file for easy editing. All content can now be customized by editing the `config.yaml` file in the root directory.

## Configuration File Structure

The `config.yaml` file contains the following main sections:

### Personal Information (`personal`)
- `name`: Your full name
- `title`: Your professional title/role
- `location`: Your location (city, state/country)
- `tagline`: Main headline on the hero section
- `description`: Your bio/description text
- `availability`: Status and visibility settings

### Contact Information (`contact`)
- `email`: Your email address
- `github`: GitHub profile URL
- `linkedin`: LinkedIn profile URL

### Site Metadata (`site`)
- `title`: Browser tab title and meta title
- `description`: Meta description for SEO

### Hero Section (`hero`)
- `highlights`: Array of highlight items with name, icon, and color

### Skills Section (`skills`)
- `categories`: Array of skill categories, each containing:
  - `title`: Category name
  - `description`: Category description
  - `icon`: Icon identifier
  - `color`: Tailwind gradient classes
  - `experience`: Years of experience
  - `skills`: Array of individual skills with names and icons

### Experience Section (`experience`)
- `positions`: Array of work experience entries with:
  - Company details (name, URL, logo)
  - Role and employment details
  - Description and achievements
  - Technologies used
  - Color theme

### Projects Section (`projects`)
- `items`: Array of personal projects with:
  - Project details (name, description, highlights)
  - Link information
  - Icon and tags

### Article Section (`sections.latest_articles`)
- `title`: Section title
- `description`: Section description
- `max_count`: Number of articles to show

## Available Icons

The system supports both image-based icons and Lucide React icons:

### Image Icons
- `react`, `nextjs`, `typescript`, `nodejs`, `docker`
- `tailwindcss`, `git`, `go`, `python`, `postgresql`
- `graphql`, `terraform`, `packer`, `proxmox`
- `openstack`, `truenas`, `kubernetes`

### Lucide Icons
- `Users`, `Layers`, `Activity`, `Code`, `Crown`
- `CheckSquare`, `Package`, `Palette`, `Zap`
- `Database`, `Network`, `Server`, `Settings`

## Company Logos

Available company logos:
- `bbg` (Bloomberg)
- `paxos` (Paxos)
- `madison-reed` (Madison Reed)

## Editing Your Portfolio

1. **Edit Content**: Modify the `config.yaml` file to update any content
2. **Add Icons**: Place new icon images in `src/images/icons/` and update the icon mapping in `src/lib/config-server.ts`
3. **Add Logos**: Place company logos in `src/images/logos/` and update the logo mapping
4. **Test Changes**: Run `npm run dev` to see your changes locally
5. **Deploy**: Run `npm run build` to build for production

## File Structure

```
├── config.yaml                    # Main configuration file
├── src/
│   ├── lib/
│   │   ├── config-server.ts       # Server-side configuration loading
│   │   └── config.ts              # Client-side icon/logo mapping
│   ├── images/
│   │   ├── icons/                 # Skill/technology icons
│   │   └── logos/                 # Company logos
│   └── components/sections/       # Components that use configuration
```

## Architecture Notes

- Configuration is loaded server-side for optimal performance
- Components receive configuration data as props
- Icon and logo mappings are handled separately for type safety
- All changes require a rebuild, but hot reloading works in development

## Adding New Sections

To add new configurable sections:

1. Add the section schema to `config-server.ts`
2. Update the `AppConfig` interface
3. Add the section data to `config.yaml`
4. Create or update components to use the configuration
5. Pass the configuration data as props from the page component

This architecture ensures type safety, optimal performance, and easy content management through a single YAML file.
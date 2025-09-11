import { type StaticImageData } from 'next/image'

// Import all the static image assets
import avatarImage from '@/images/profile.jpeg'
import reactIcon from '@/images/icons/react.png'
import nextjsIcon from '@/images/icons/next-js.png'
import typescriptIcon from '@/images/icons/typescript.png'
import nodejsIcon from '@/images/icons/nodejs.png'
import dockerIcon from '@/images/icons/docker.png'
import tailwindcssIcon from '@/images/icons/tailwindcss.png'
import gitIcon from '@/images/icons/git.png'
import goIcon from '@/images/icons/go.svg'
import pythonIcon from '@/images/icons/python.png'
import postgresqlIcon from '@/images/icons/postgresql.svg'
import graphqlIcon from '@/images/icons/graphql.svg'
import terraformIcon from '@/images/icons/terraform.svg'
import packerIcon from '@/images/icons/packer.svg'
import proxmoxIcon from '@/images/icons/proxmox.svg'
import openstackIcon from '@/images/icons/openstack.svg'
import truenasIcon from '@/images/icons/truenas.svg'
import kubernetesIcon from '@/images/icons/kubernetes.svg'
import logoBBG from '@/images/logos/bbg.svg'
import logoPaxos from '@/images/logos/paxos.svg'
import logoMadisonReed from '@/images/logos/madison-reed.svg'

// Lucide icon imports
import {
  Users,
  Layers,
  Activity,
  Code,
  Crown,
  CheckSquare,
  Package,
  Palette,
  Zap,
  Database,
  Network,
  Server,
  Settings,
  Cog,
  Box,
  Calendar,
  ListTodo,
} from 'lucide-react'

// Type definitions
export interface PersonalConfig {
  name: string
  title: string
  location: string
  tagline: string
  description: string
  availability: {
    status: string
    active: boolean
  }
}

export interface ContactConfig {
  email: string
  github: string
  linkedin: string
}

export interface SiteConfig {
  title: string
  description: string
}

export interface HeroHighlight {
  name: string
  icon: string
  color: string
}

export interface HeroConfig {
  highlights: HeroHighlight[]
}

export interface SkillItem {
  name: string
  icon: string
}

export interface SkillCategory {
  title: string
  description: string
  icon: string
  color: string
  experience: string
  skills: SkillItem[]
}

export interface SkillsConfig {
  categories: SkillCategory[]
}

export interface ExperiencePosition {
  company: string
  company_url: string
  role: string
  period: string
  location: string
  type: string
  logo: string
  description: string
  achievements: string[]
  technologies: string[]
  color: string
}

export interface ExperienceConfig {
  positions: ExperiencePosition[]
}

export interface ProjectLink {
  href: string
  label: string
  is_private?: boolean
}

export interface ProjectItem {
  name: string
  description: string
  highlights: string[]
  link: ProjectLink
  icon: string
  tags: string[]
}

export interface ProjectsConfig {
  items: ProjectItem[]
}

export interface LatestArticlesConfig {
  title: string
  description: string
  max_count: number
}

export interface SectionsConfig {
  latest_articles: LatestArticlesConfig
}

export interface AppConfig {
  personal: PersonalConfig
  contact: ContactConfig
  site: SiteConfig
  hero: HeroConfig
  skills: SkillsConfig
  experience: ExperienceConfig
  projects: ProjectsConfig
  sections: SectionsConfig
}

// Icon mapping functions
const iconMap: Record<
  string,
  StaticImageData | React.ComponentType<{ className?: string }>
> = {
  // Static image icons
  react: reactIcon,
  nextjs: nextjsIcon,
  typescript: typescriptIcon,
  nodejs: nodejsIcon,
  docker: dockerIcon,
  tailwindcss: tailwindcssIcon,
  git: gitIcon,
  go: goIcon,
  python: pythonIcon,
  postgresql: postgresqlIcon,
  graphql: graphqlIcon,
  terraform: terraformIcon,
  packer: packerIcon,
  proxmox: proxmoxIcon,
  openstack: openstackIcon,
  truenas: truenasIcon,
  kubernetes: kubernetesIcon,
  // Lucide icons
  Users: Users,
  Layers: Layers,
  Activity: Activity,
  Code: Code,
  Crown: Crown,
  CheckSquare: CheckSquare,
  Package: Package,
  Palette: Palette,
  Zap: Zap,
  Database: Database,
  Network: Network,
  Server: Server,
  Settings: Settings,
  Cog: Cog,
  Box: Box,
  Calendar: Calendar,
  Tasks: ListTodo,
}

const logoMap: Record<string, StaticImageData> = {
  bbg: logoBBG,
  paxos: logoPaxos,
  'madison-reed': logoMadisonReed,
}

export function getIcon(
  iconName: string
): StaticImageData | React.ComponentType<{ className?: string }> | null {
  const icon = iconMap[iconName]
  if (!icon) {
    console.warn(
      `Icon not found: ${iconName}. Available icons:`,
      Object.keys(iconMap)
    )
  } else {
    console.log(
      `Icon found: ${iconName}, Type: ${typeof icon}, Is function: ${typeof icon === 'function'}`
    )
  }
  return icon || null
}

export function getLogo(logoName: string): StaticImageData | null {
  return logoMap[logoName] || null
}

export { avatarImage }

// Client-side helper functions - no file system access
// These are used for icon/logo mapping only

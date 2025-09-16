import { type StaticImageData } from 'next/image'

// Import all the static image assets
import avatarImage from '@/images/photos/personal-image.png'
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
import redisIcon from '@/images/icons/redis.svg'
import kafkaIcon from '@/images/icons/kafka.svg'
import airflowIcon from '@/images/icons/airflow.svg'
import mongodbIcon from '@/images/icons/mongodb.svg'
import javascriptIcon from '@/images/icons/javascript.svg'
import cssIcon from '@/images/icons/css.svg'
import awsIcon from '@/images/icons/aws.svg'
import angularIcon from '@/images/icons/angular.svg'
import webpackIcon from '@/images/icons/webpack.svg'
import homeassistantIcon from '@/images/icons/homeassistant.svg'
import jellyfinIcon from '@/images/icons/jellyfin.svg'
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
  GraduationCap,
  Heart,
  PlayCircle,
  Home,
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

export interface CommunityActivity {
  title: string
  role: string
  duration: string
  type: string
  icon: string
  color: string
  description: string
  achievements: string[]
}

export interface CommunityConfig {
  title: string
  description: string
  activities: CommunityActivity[]
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
  community: CommunityConfig
  sections: SectionsConfig
}

// Icon mapping functions
const iconMap: Record<
  string,
  StaticImageData | React.ComponentType<{ className?: string }>
> = {
  // Static image icons
  react: reactIcon,
  React: reactIcon,
  'React.js': reactIcon,
  nextjs: nextjsIcon,
  'Next.js': nextjsIcon,
  typescript: typescriptIcon,
  TypeScript: typescriptIcon,
  nodejs: nodejsIcon,
  'Node.js': nodejsIcon,
  docker: dockerIcon,
  Docker: dockerIcon,
  tailwindcss: tailwindcssIcon,
  'Tailwind CSS': tailwindcssIcon,
  TailwindCSS: tailwindcssIcon,
  git: gitIcon,
  Git: gitIcon,
  go: goIcon,
  Go: goIcon,
  Golang: goIcon,
  python: pythonIcon,
  Python: pythonIcon,
  postgresql: postgresqlIcon,
  PostgreSQL: postgresqlIcon,
  graphql: graphqlIcon,
  GraphQL: graphqlIcon,
  terraform: terraformIcon,
  Terraform: terraformIcon,
  packer: packerIcon,
  Packer: packerIcon,
  proxmox: proxmoxIcon,
  Proxmox: proxmoxIcon,
  openstack: openstackIcon,
  OpenStack: openstackIcon,
  truenas: truenasIcon,
  TrueNAS: truenasIcon,
  kubernetes: kubernetesIcon,
  Kubernetes: kubernetesIcon,
  K8s: kubernetesIcon,
  redis: redisIcon,
  Redis: redisIcon,
  kafka: kafkaIcon,
  'Apache Kafka': kafkaIcon,
  airflow: airflowIcon,
  'Apache Airflow': airflowIcon,
  mongodb: mongodbIcon,
  MongoDB: mongodbIcon,
  javascript: javascriptIcon,
  JavaScript: javascriptIcon,
  css: cssIcon,
  CSS: cssIcon,
  aws: awsIcon,
  AWS: awsIcon,
  angular: angularIcon,
  Angular: angularIcon,
  webpack: webpackIcon,
  Webpack: webpackIcon,
  // Additional tech mappings
  'Home Assistant': homeassistantIcon,
  Jellyfin: jellyfinIcon,
  Neovim: Code,
  Zsh: Code,
  Shell: Code,
  Tmux: Code,
  macOS: Settings,
  Linux: Settings,
  Vite: Zap,
  'Module Federation': Network,
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
  GraduationCap: GraduationCap,
  Heart: Heart,
  PlayCircle: PlayCircle,
  Home: Home,
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
    // Icon not found - returning null
    return null
  }
  return icon
}

export function getLogo(logoName: string): StaticImageData | null {
  return logoMap[logoName] || null
}

export { avatarImage }

// Client-side helper functions - no file system access
// These are used for icon/logo mapping only

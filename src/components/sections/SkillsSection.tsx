'use client'

import { useState } from 'react'
import Image, { type StaticImageData } from 'next/image'
import { Container } from '@/components/Container'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ChevronDown,
  ChevronUp,
  Crown,
  CheckSquare,
  Package,
  Palette,
  Users,
  Code,
  Database,
  Network,
  Zap,
  Cloud,
  Box,
  Server,
  HardDrive,
} from 'lucide-react'
import MotionDiv from '@/components/motion-div'
import MotionList from '@/components/motion-list'

// Import your existing skill icons
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

interface SkillItem {
  name: string
  icon: StaticImageData | React.ComponentType<{ className?: string }>
}

interface SkillCategory {
  title: string
  description: string
  icon: StaticImageData | React.ComponentType<{ className?: string }>
  color: string
  skills: SkillItem[]
  experience: string
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend Development',
    description: 'Building modern, responsive web applications',
    icon: reactIcon,
    color: 'from-blue-500/20 to-cyan-500/20',
    skills: [
      { name: 'React', icon: reactIcon },
      { name: 'Next.js', icon: nextjsIcon },
      { name: 'TypeScript', icon: typescriptIcon },
      { name: 'Tailwind CSS', icon: tailwindcssIcon },
    ],
    experience: '12+ years',
  },
  {
    title: 'Backend Development',
    description: 'Scalable server-side architecture and APIs',
    icon: nodejsIcon,
    color: 'from-green-500/20 to-emerald-500/20',
    skills: [
      { name: 'Node.js', icon: nodejsIcon },
      { name: 'TypeScript', icon: typescriptIcon },
      { name: 'Go', icon: goIcon },
      { name: 'Python', icon: pythonIcon },
      { name: 'PostgreSQL', icon: postgresqlIcon },
      { name: 'GraphQL', icon: graphqlIcon },
      { name: 'API Integration', icon: Zap },
    ],
    experience: '12+ years',
  },
  {
    title: 'DevOps & Infrastructure',
    description: 'Cloud infrastructure and deployment automation',
    icon: dockerIcon,
    color: 'from-purple-500/20 to-pink-500/20',
    skills: [
      { name: 'Docker', icon: dockerIcon },
      { name: 'Git', icon: gitIcon },
      { name: 'Terraform', icon: terraformIcon },
      { name: 'Packer', icon: packerIcon },
      { name: 'Proxmox', icon: proxmoxIcon },
      { name: 'OpenStack', icon: openstackIcon },
      { name: 'Networking', icon: Network },
      { name: 'TrueNAS', icon: truenasIcon },
      { name: 'Kubernetes', icon: kubernetesIcon },
    ],
    experience: '10+ years',
  },
  {
    title: 'Leadership & Strategy',
    description: 'Team leadership, product management, and design thinking',
    icon: Crown,
    color: 'from-amber-500/20 to-orange-500/20',
    skills: [
      { name: 'Leadership', icon: Crown },
      { name: 'People Management', icon: Users },
      { name: 'Project Management', icon: CheckSquare },
      { name: 'Product Strategy', icon: Package },
      { name: 'Design Thinking', icon: Palette },
    ],
    experience: '4+ years',
  },
]

interface SkillCardProps {
  category: SkillCategory
  index: number
}

function SkillCard({ category, index }: SkillCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <MotionDiv className="h-full">
      <Card className="group relative flex h-full min-h-[102px] w-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 transition-opacity group-hover:opacity-100`}
        />

        <CardContent className="relative flex flex-1 flex-col justify-center p-4">
          <div className="flex flex-1 flex-col">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`rounded-2xl p-2 shadow-sm ring-1 ring-border ${
                  category.title === 'Leadership & Strategy'
                    ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20'
                    : 'bg-background'
                }`}>
                  {category.icon === Crown ||
                  category.icon === Users ||
                  category.icon === CheckSquare ||
                  category.icon === Package ||
                  category.icon === Palette ||
                  category.icon === Code ||
                  category.icon === Database ||
                  category.icon === Network ||
                  category.icon === Zap ? (
                    <category.icon className={`h-6 w-6 ${
                      category.title === 'Leadership & Strategy'
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-primary'
                    }`} />
                  ) : (
                    <Image
                      src={category.icon}
                      alt={category.title}
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">
                      {category.title}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {category.experience}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(!isExpanded)}
                className="touch-target-44 shrink-0"
              >
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Expanded Content */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isExpanded ? 'mt-6 max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-foreground">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2 rounded-full bg-background/50 px-3 py-1.5"
                  >
                    {skill.icon === Crown ||
                    skill.icon === Users ||
                    skill.icon === CheckSquare ||
                    skill.icon === Package ||
                    skill.icon === Palette ||
                    skill.icon === Code ||
                    skill.icon === Database ||
                    skill.icon === Network ||
                    skill.icon === Zap ? (
                      <skill.icon className="h-4 w-4 text-primary" />
                    ) : (
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={16}
                        height={16}
                        className="h-4 w-4"
                      />
                    )}
                    <span className="text-sm font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </MotionDiv>
  )
}

export function SkillsSection() {
  return (
    <Container className="mt-16 sm:mt-20 md:mt-24 lg:mt-28">
      <MotionDiv>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Skills & Expertise
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>
      </MotionDiv>

      <MotionList className="mt-12 grid w-full grid-rows-[repeat(auto-fit,1fr)] gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-2">
        {skillCategories.map((category, index) => (
          <SkillCard key={category.title} category={category} index={index} />
        ))}
      </MotionList>
    </Container>
  )
}

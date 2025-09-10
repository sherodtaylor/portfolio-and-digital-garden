'use client'

import Link from 'next/link'
import { Container } from '@/components/Container'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github, Server, Settings } from 'lucide-react'
import MotionDiv from '@/components/motion-div'

interface Project {
  name: string
  description: string
  highlights: string[]
  link: { href: string; label: string; isPrivate?: boolean }
  icon: React.ComponentType<{ className?: string }>
  tags: string[]
}

const projects: Project[] = [
  {
    name: 'Home Lab AI Model Deployment',
    description:
      'Built personal infrastructure for AI model experimentation and deployment, gaining practical experience with model serving challenges relevant to production AI systems.',
    highlights: [
      'Local Model Deployment: Successfully deployed various language and vision models with performance optimization',
      'Infrastructure Design: Built GPU-accelerated inference pipeline with monitoring and resource management',
      'AI-Powered Applications: Self-hosted AI-leveraging applications including Immich (Google Photos alternative)',
    ],
    link: {
      href: 'https://github.com/sherodtaylor/homelab-setup',
      label: 'github.com/sherodtaylor/homelab-setup',
      isPrivate: true,
    },
    icon: Server,
    tags: ['AI/ML', 'Infrastructure', 'Docker', 'GPU Computing'],
  },
  {
    name: 'Dotfiles',
    description:
      'Maintained comprehensive dotfiles and development environment configurations for consistent, reproducible development setups across multiple systems.',
    highlights: [
      'Cross-Platform Configuration: Unified development environment setup for macOS and Linux systems',
      'Editor Configuration: Advanced Neovim configurations with language servers and productivity enhancements',
    ],
    link: {
      href: 'https://github.com/sherodtaylor/dotfiles',
      label: 'github.com/sherodtaylor/dotfiles',
    },
    icon: Settings,
    tags: ['DevOps', 'Automation', 'Neovim', 'Shell Scripting'],
  },
]

export function ProjectsSection() {
  return (
    <Container className="mt-24 md:mt-28">
      <MotionDiv>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Personal Projects
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Technical projects showcasing AI infrastructure, development tools,
            and automation solutions
          </p>
        </div>
      </MotionDiv>

      <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-1 lg:grid-cols-2">
        {projects.map((project) => {
          const IconComponent = project.icon
          return (
            <MotionDiv key={project.name}>
              <Card className="h-full w-full overflow-hidden">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-xl">{project.name}</CardTitle>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="text-sm leading-6">
                    {project.description}
                  </CardDescription>

                  <div className="space-y-2">
                    {project.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="text-sm text-muted-foreground"
                      >
                        <span className="font-medium">
                          {highlight.split(':')[0]}:
                        </span>
                        <span className="ml-1">
                          {highlight.split(':').slice(1).join(':').trim()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t pt-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Github className="h-4 w-4" />
                      <span className="truncate">{project.link.label}</span>
                      {project.link.isPrivate && (
                        <Badge variant="outline" className="text-xs">
                          Private
                        </Badge>
                      )}
                    </div>

                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href={project.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        View Code
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </MotionDiv>
          )
        })}
      </div>
    </Container>
  )
}

'use client'

import React from 'react'
import Link from 'next/link'
import Image, { type StaticImageData } from 'next/image'
import { Container } from '@/components/Container'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ExternalLink, Github, Play } from 'lucide-react'
import { getIcon, getGif } from '@/lib/config'
import { type ProjectsConfig } from '@/lib/config-server'
import MotionDiv from '@/components/motion-div'

// Type guard to check if icon is a StaticImageData
const isStaticImageData = (
  icon: StaticImageData | React.ComponentType<{ className?: string }> | null
): icon is StaticImageData => {
  return icon !== null && typeof icon === 'object' && 'src' in icon
}

interface ProjectsSectionProps {
  projectsConfig: ProjectsConfig
}

export function ProjectsSection({ projectsConfig }: ProjectsSectionProps) {
  return (
    <Container className="mt-12 sm:mt-16 md:mt-20 lg:mt-24">
      <MotionDiv>
        <div className="mx-auto max-w-2xl text-left lg:text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            → Personal Projects
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Technical projects showcasing AI infrastructure, development tools,
            and automation solutions
          </p>
        </div>
      </MotionDiv>

      <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
        {projectsConfig.items.map((project) => {
          const iconResult = getIcon(project.icon)
          const IconComponent = !isStaticImageData(iconResult)
            ? (iconResult as React.ComponentType<{
                className?: string
              }>)
            : null
          const iconImage = isStaticImageData(iconResult) ? iconResult : null
          const gifAsset = project.gif ? getGif(project.gif) : null
          return (
            <MotionDiv key={project.name}>
              <Card className="flex h-full w-full flex-col overflow-hidden break-words">
                <CardHeader>
                  <div className="relative">
                    {/* Project Icon - Floating Right */}
                    <div className="absolute -top-2 right-0 shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        {IconComponent && (
                          <IconComponent className="h-6 w-6 text-primary" />
                        )}
                        {iconImage && (
                          <Image
                            src={iconImage}
                            alt={`${project.name} icon`}
                            width={24}
                            height={24}
                            className="h-6 w-6 object-contain"
                          />
                        )}
                      </div>
                    </div>
                    <div className="pr-14">
                      <CardTitle className="break-words text-xl">
                        {project.name}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 space-y-4">
                  <CardDescription className="break-words text-sm leading-6 text-white">
                    • {project.description}
                  </CardDescription>

                  {/* Full-width GIF preview banner */}
                  {gifAsset && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="group relative cursor-pointer overflow-hidden rounded-lg border border-border/50 bg-gradient-to-br from-primary/5 to-primary/10 transition-all duration-300 hover:border-primary/30">
                          {/* Background GIF */}
                          <div className="absolute inset-0">
                            <Image
                              src={gifAsset}
                              alt={`${project.name} background preview`}
                              fill
                              className="object-cover object-center"
                              unoptimized
                            />
                          </div>

                          {/* Overlay content */}
                          <div className="relative z-10 flex items-center justify-center bg-gradient-to-r from-black/60 via-black/40 to-black/60 p-6">
                            <div className="text-center">
                              <div className="flex items-center justify-center gap-2 text-white">
                                <Play className="h-5 w-5" />
                                <span className="font-medium">
                                  {project.demo?.preview_text ||
                                    'View Live Demo'}
                                </span>
                              </div>
                              <p className="mt-1 text-xs text-white/80">
                                {project.demo?.preview_subtitle ||
                                  'Interactive mobile application showcase'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>
                            {project.demo?.title ||
                              `${project.name} Mobile Demo`}
                          </DialogTitle>
                          <DialogDescription>
                            {project.demo?.description ||
                              'Interactive demonstration of the mobile application features and animations.'}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-center py-4">
                          <div className="relative">
                            <Image
                              src={gifAsset}
                              alt={`${project.name} mobile demo`}
                              width={240}
                              height={480}
                              className="rounded-xl shadow-2xl ring-1 ring-border/20"
                              unoptimized
                            />
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/5 to-transparent" />
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}

                  <div className="space-y-2">
                    {project.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="break-words text-sm text-muted-foreground"
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

                  {/* Technology Pills */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => {
                      const tagIcon = getIcon(tag)
                      return (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="flex items-center gap-1.5 bg-primary/5 text-xs font-medium transition-colors hover:bg-primary/10"
                        >
                          {tagIcon && !isStaticImageData(tagIcon) ? (
                            React.createElement(
                              tagIcon as React.ComponentType<{
                                className?: string
                              }>,
                              {
                                className: 'h-3 w-3',
                              }
                            )
                          ) : tagIcon && isStaticImageData(tagIcon) ? (
                            <Image
                              src={tagIcon}
                              alt={tag}
                              width={12}
                              height={12}
                              className="h-3 w-3 object-contain"
                            />
                          ) : null}
                          {tag}
                        </Badge>
                      )
                    })}
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex w-full min-w-0 items-center gap-1 overflow-hidden text-sm text-muted-foreground sm:w-auto">
                    <Github className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
                    <span className="max-w-full truncate break-all text-xs leading-tight">
                      {project.link.label}
                    </span>
                    {project.link.is_private && (
                      <Badge
                        variant="outline"
                        className="ml-1 shrink-0 text-xs"
                      >
                        Private
                      </Badge>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                    asChild
                  >
                    <Link
                      href={project.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      View Code
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </MotionDiv>
          )
        })}
      </div>
    </Container>
  )
}

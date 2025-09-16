'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/Container'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  CalendarDays,
  MapPin,
  Zap,
  Code,
  Database,
  Network,
  Cloud,
  Box,
  ExternalLink,
} from 'lucide-react'
import { getIcon, getLogo } from '@/lib/config'
import {
  type ExperienceConfig,
  type ExperiencePosition,
} from '@/lib/config-server'
import MotionDiv from '@/components/motion-div'
import MotionList from '@/components/motion-list'

// Function to get icon for technology
function getTechIcon(tech: string) {
  const techLower = tech.toLowerCase()

  // Try to get from our icon mapping first
  const mappedIcon = getIcon(techLower) || getIcon(tech)
  if (mappedIcon) return mappedIcon

  // Fallback logic for technologies not in our mapping
  if (techLower.includes('kubernetes') || techLower === 'k8s') return Box
  if (
    techLower.includes('aws') ||
    techLower.includes('cloud') ||
    techLower.includes('openstack')
  )
    return Cloud
  if (
    techLower.includes('database') ||
    techLower.includes('mongodb') ||
    techLower.includes('redis')
  )
    return Database
  if (
    techLower.includes('javascript') ||
    techLower.includes('css') ||
    techLower.includes('html')
  )
    return Code
  if (techLower.includes('terraform') || techLower.includes('api'))
    return Network

  // Default fallback
  return Code
}

// Remove hardcoded experiences - we'll use config

interface ExperienceCardProps {
  experience: ExperiencePosition
  index: number
}

function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <MotionDiv className="relative">
      <Card className="group relative h-full w-full overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${experience.color} opacity-0 transition-opacity group-hover:opacity-100`}
        />

        <CardContent className="relative flex h-full flex-col p-4 sm:p-6">
          <div className="space-y-4">
            {/* Content */}
            <div className="min-w-0 flex-1 space-y-4">
              <div className="relative">
                {/* Company Logo - Floating Right */}
                <div className="absolute -top-2 right-0 shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-border sm:h-16 sm:w-16">
                    {getLogo(experience.logo) && (
                      <Image
                        src={getLogo(experience.logo)!}
                        alt={`${experience.company} logo`}
                        width={48}
                        height={48}
                        className="h-8 w-8 sm:h-10 sm:w-10"
                      />
                    )}
                  </div>
                </div>
                <div className="sm:pr-18 pr-14">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {experience.role}
                    </h3>
                    <Badge variant="secondary">{experience.type}</Badge>
                  </div>
                </div>
                <Link
                  href={experience.company_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-primary transition-colors hover:text-primary/80"
                >
                  {experience.company}
                  <ExternalLink className="h-3 w-3" />
                </Link>
                <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" />
                    {experience.period}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {experience.location}
                  </div>
                </div>
              </div>

              <p className="text-sm leading-6 text-white">
                • {experience.description}
              </p>

              <div className="flex-1">
                <h4 className="mb-2 text-sm font-medium text-foreground">
                  Key Achievements
                </h4>
                <ul className="space-y-1">
                  {experience.achievements.map((achievement, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Zap className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <h4 className="mb-2 text-sm font-medium text-foreground">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-1">
                  {experience.technologies.map((tech) => {
                    const TechIcon = getTechIcon(tech)

                    return (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="flex items-center gap-1 text-xs"
                      >
                        {typeof TechIcon === 'function' ? (
                          <TechIcon className="h-3 w-3" />
                        ) : (
                          <Image
                            src={TechIcon}
                            alt={`${tech} icon`}
                            width={12}
                            height={12}
                            className="h-3 w-3"
                          />
                        )}
                        {tech}
                      </Badge>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </MotionDiv>
  )
}

interface ExperienceSectionProps {
  experienceConfig: ExperienceConfig
}

export function ExperienceSection({
  experienceConfig,
}: ExperienceSectionProps) {
  const totalYears = new Date().getFullYear() - 2013

  return (
    <Container className="mt-12 sm:mt-16 md:mt-20 lg:mt-24">
      <MotionDiv>
        <div className="mx-auto max-w-2xl text-left lg:text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            → Work Experience
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            {totalYears}+ years of building scalable software solutions
          </p>
        </div>
      </MotionDiv>

      <div className="mx-auto mt-8 max-w-6xl">
        <MotionList className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          {experienceConfig.positions.map((experience, index) => (
            <ExperienceCard
              key={`${experience.company}-${experience.period}`}
              experience={experience}
              index={index}
            />
          ))}
        </MotionList>
      </div>
    </Container>
  )
}

'use client'

import React from 'react'
import Image, { type StaticImageData } from 'next/image'
import { Container } from '@/components/Container'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getIcon } from '@/lib/config'
import { type SkillsConfig, type SkillCategory } from '@/lib/config-server'
import MotionDiv from '@/components/motion-div'
import MotionList from '@/components/motion-list'

// Type guard to check if icon is a StaticImageData
const isStaticImageData = (
  icon: StaticImageData | React.ComponentType<{ className?: string }> | null
): icon is StaticImageData => {
  return icon !== null && typeof icon === 'object' && 'src' in icon
}

interface SkillCardProps {
  category: SkillCategory
  index: number
}

function SkillCard({ category }: SkillCardProps) {
  const categoryIcon = getIcon(category.icon)

  return (
    <MotionDiv className="h-full">
      <Card className="group relative flex h-full w-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 transition-opacity group-hover:opacity-100`}
        />

        <CardContent className="relative flex flex-1 flex-col p-4">
          {/* Header */}
          <div className="mb-3 flex items-start gap-3">
            <div
              className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg shadow-sm ring-1 ring-border ${
                category.title === 'Leadership & Strategy'
                  ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20'
                  : 'bg-background'
              }`}
            >
              {categoryIcon && !isStaticImageData(categoryIcon) ? (
                React.createElement(
                  categoryIcon as React.ComponentType<{
                    className?: string
                  }>,
                  {
                    className: `h-4 w-4 flex-shrink-0 ${
                      category.title === 'Leadership & Strategy'
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-primary'
                    }`,
                  }
                )
              ) : categoryIcon && isStaticImageData(categoryIcon) ? (
                <Image
                  src={categoryIcon}
                  alt={category.title}
                  width={16}
                  height={16}
                  className="h-4 w-4 flex-shrink-0 object-contain"
                />
              ) : null}
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold text-foreground">
                  {category.title}
                </h3>
                <Badge variant="outline" className="whitespace-nowrap text-xs">
                  {category.experience}
                </Badge>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {category.description}
              </p>
            </div>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5">
            {category.skills.map((skill) => {
              const skillIcon = getIcon(skill.icon)
              return (
                <div
                  key={skill.name}
                  className="flex items-center gap-1.5 rounded-full bg-background/50 px-2 py-1"
                >
                  {skillIcon && !isStaticImageData(skillIcon) ? (
                    React.createElement(
                      skillIcon as React.ComponentType<{
                        className?: string
                      }>,
                      {
                        className: 'h-3 w-3 text-primary',
                      }
                    )
                  ) : skillIcon && isStaticImageData(skillIcon) ? (
                    <Image
                      src={skillIcon}
                      alt={skill.name}
                      width={12}
                      height={12}
                      className="h-3 w-3"
                    />
                  ) : null}
                  <span className="text-xs font-medium">{skill.name}</span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </MotionDiv>
  )
}

interface SkillsSectionProps {
  skillsConfig: SkillsConfig
}

export function SkillsSection({ skillsConfig }: SkillsSectionProps) {
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
        {skillsConfig.categories.map((category, index) => (
          <SkillCard key={category.title} category={category} index={index} />
        ))}
      </MotionList>
    </Container>
  )
}

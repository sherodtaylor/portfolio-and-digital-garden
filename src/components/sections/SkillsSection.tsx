'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Container } from '@/components/Container'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { getIcon } from '@/lib/config'
import { type SkillsConfig, type SkillCategory } from '@/lib/config-server'
import MotionDiv from '@/components/motion-div'
import MotionList from '@/components/motion-list'

interface SkillCardProps {
  category: SkillCategory
  index: number
}

function SkillCard({ category }: SkillCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const categoryIcon = getIcon(category.icon)

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
                <div
                  className={`rounded-2xl p-2 shadow-sm ring-1 ring-border ${
                    category.title === 'Leadership & Strategy'
                      ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20'
                      : 'bg-background'
                  }`}
                >
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {categoryIcon && !(categoryIcon as any).src ? (
                    React.createElement(
                      categoryIcon as React.ComponentType<{
                        className?: string
                      }>,
                      {
                        className: `h-6 w-6 ${
                          category.title === 'Leadership & Strategy'
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-primary'
                        }`,
                      }
                    )
                  ) : categoryIcon ? (
                    <Image
                      src={categoryIcon}
                      alt={category.title}
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                  ) : null}
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
                {category.skills.map((skill) => {
                  const skillIcon = getIcon(skill.icon)
                  return (
                    <div
                      key={skill.name}
                      className="flex items-center gap-2 rounded-full bg-background/50 px-3 py-1.5"
                    >
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {skillIcon && !(skillIcon as any).src ? (
                        React.createElement(
                          skillIcon as React.ComponentType<{
                            className?: string
                          }>,
                          {
                            className: 'h-4 w-4 text-primary',
                          }
                        )
                      ) : skillIcon ? (
                        <Image
                          src={skillIcon}
                          alt={skill.name}
                          width={16}
                          height={16}
                          className="h-4 w-4"
                        />
                      ) : null}
                      <span className="text-sm font-medium">{skill.name}</span>
                    </div>
                  )
                })}
              </div>
            </div>
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

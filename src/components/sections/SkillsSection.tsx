'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Container } from '@/components/Container'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'
import MotionDiv from '@/components/motion-div'
import MotionList from '@/components/motion-list'

// Import your existing skill icons
import reactIcon from '@/images/icons/react.png'
import nextjsIcon from '@/images/icons/next-js.png'
import typescriptIcon from '@/images/icons/typescript.png'
import nodejsIcon from '@/images/icons/nodejs.png'
import dockerIcon from '@/images/icons/docker.png'
import tailwindcssIcon from '@/images/icons/tailwindcss.png'
import prismaIcon from '@/images/icons/prisma.png'
import gitIcon from '@/images/icons/git.png'

const skillCategories = [
  {
    title: 'Frontend Development',
    description: 'Building modern, responsive web applications',
    icon: reactIcon,
    color: 'from-blue-500/20 to-cyan-500/20',
    skills: [
      { name: 'React', level: 95, icon: reactIcon },
      { name: 'Next.js', level: 90, icon: nextjsIcon },
      { name: 'TypeScript', level: 88, icon: typescriptIcon },
      { name: 'Tailwind CSS', level: 92, icon: tailwindcssIcon },
    ],
    projects: '15+ projects',
    experience: '5+ years',
  },
  {
    title: 'Backend Development',
    description: 'Scalable server-side architecture and APIs',
    icon: nodejsIcon,
    color: 'from-green-500/20 to-emerald-500/20',
    skills: [
      { name: 'Node.js', level: 90, icon: nodejsIcon },
      { name: 'Prisma', level: 85, icon: prismaIcon },
      { name: 'TypeScript', level: 88, icon: typescriptIcon },
    ],
    projects: '20+ projects',
    experience: '6+ years',
  },
  {
    title: 'DevOps & Infrastructure',
    description: 'Cloud infrastructure and deployment automation',
    icon: dockerIcon,
    color: 'from-purple-500/20 to-pink-500/20',
    skills: [
      { name: 'Docker', level: 80, icon: dockerIcon },
      { name: 'Git', level: 95, icon: gitIcon },
    ],
    projects: '10+ projects',
    experience: '4+ years',
  },
]

interface SkillCardProps {
  category: (typeof skillCategories)[0]
  index: number
}

function SkillCard({ category, index }: SkillCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <MotionDiv>
      <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 transition-opacity group-hover:opacity-100`}
        />

        <CardContent className="relative p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-background p-3 shadow-sm ring-1 ring-border">
                <Image
                  src={category.icon}
                  alt={category.title}
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  {category.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="shrink-0 touch-target-44"
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="mt-4">
            <Badge variant="outline" className="text-xs">
              {category.experience}
            </Badge>
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
                  <div key={skill.name} className="flex items-center gap-2 rounded-full bg-background/50 px-3 py-1.5">
                    <Image
                      src={skill.icon}
                      alt={skill.name}
                      width={16}
                      height={16}
                      className="h-4 w-4"
                    />
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

      <MotionList className="mx-auto mt-12 grid max-w-5xl gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, index) => (
          <SkillCard key={category.title} category={category} index={index} />
        ))}
      </MotionList>
    </Container>
  )
}

'use client'

import React from 'react'
import { Container } from '@/components/Container'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users } from 'lucide-react'
import MotionDiv from '@/components/motion-div'
import MotionList from '@/components/motion-list'
import { getIcon } from '@/lib/config'
import { type StaticImageData } from 'next/image'
import Image from 'next/image'

// Community data - will be replaced with config loading later
const communityConfig = {
  title: 'Community & Leadership',
  description: 'Giving back through mentorship and volunteer work',
  activities: [
    {
      title: 'Bloomberg Diversity Interview Prep Bootcamp',
      role: 'Volunteer Instructor & Mentor',
      duration: '6-month program',
      type: 'Mentorship',
      icon: 'GraduationCap',
      color: 'from-blue-500/20 to-indigo-500/20',
      description:
        'A comprehensive bootcamp program designed to train underrepresented candidates for technical interviews through mentoring and hands-on training from Bloomberg engineers. Provides 1:1 guidance, curriculum development, and mock interview preparation.',
      achievements: [
        'Designed and delivered Systems Design curriculum',
        'Took on 1:1 mentee and prepared them for coding interviews',
        'Provided weekly mock interviews and detailed feedback sessions',
        'Followed training schedule for 6 months: algos, system design, coding interviews',
      ],
    },
    {
      title: 'Bloomberg Community Service Leadership',
      role: 'Community Service Leader',
      duration: 'Ongoing',
      type: 'Volunteer',
      icon: 'Heart',
      color: 'from-pink-500/20 to-rose-500/20',
      description:
        'Leading community service initiatives within Bloomberg engineering teams, organizing volunteer activities and coordinating outreach programs to support local NYC communities.',
      achievements: [
        'Logged 15+ volunteer hours in past year',
        'Mobilized multiple engineering teams for community service',
        'Coordinated homeless aid initiatives and care package distribution',
        'Organized NYC park cleanup efforts',
      ],
    },
  ],
}

// Badge color mapping based on activity type
const badgeColorMap: Record<string, string> = {
  Mentorship: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  Volunteer: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
}

interface CommunityCardProps {
  activity: (typeof communityConfig.activities)[0]
}

function CommunityCard({ activity }: CommunityCardProps) {
  const icon = getIcon(activity.icon)
  const badgeColor =
    badgeColorMap[activity.type] ||
    'bg-gray-500/10 text-gray-600 dark:text-gray-400'

  // Type guard to check if icon is a static image
  const isStaticImageData = (
    icon: StaticImageData | React.ComponentType<{ className?: string }> | null
  ): icon is StaticImageData => {
    return icon !== null && typeof icon === 'object' && 'src' in icon
  }

  return (
    <MotionDiv className="relative">
      <Card className="group relative h-full w-full overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${activity.color} opacity-0 transition-opacity group-hover:opacity-100`}
        />

        <CardContent className="relative flex h-full flex-col p-4 sm:p-6">
          {/* Header with Icon */}
          <div className="relative">
            {/* Activity Icon - Floating Right */}
            <div className="absolute -top-2 right-0 shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 shadow-sm ring-1 ring-border dark:bg-white/10">
                {icon && isStaticImageData(icon) ? (
                  <Image
                    src={icon}
                    alt={`${activity.title} icon`}
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                ) : icon ? (
                  React.createElement(
                    icon as React.ComponentType<{ className?: string }>,
                    {
                      className: 'h-6 w-6 text-primary',
                    }
                  )
                ) : (
                  <Users className="h-6 w-6 text-primary" />
                )}
              </div>
            </div>
            <div className="pr-14">
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold leading-tight text-foreground">
                  {activity.title}
                </h3>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={badgeColor}>
                    {activity.type}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Role and Duration */}
          <div className="mt-4 space-y-2">
            <p className="font-medium text-primary">{activity.role}</p>
            <p className="text-sm text-muted-foreground">{activity.duration}</p>
            <p className="text-sm leading-relaxed text-white">
              • {activity.description}
            </p>
          </div>

          {/* Achievements */}
          <div className="mt-4 flex-1">
            <h4 className="mb-3 text-sm font-medium text-foreground">
              Key Contributions
            </h4>
            <ul className="space-y-2">
              {activity.achievements.map((achievement, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <Users className="mt-1 h-3 w-3 shrink-0 text-primary" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </MotionDiv>
  )
}

export function CommunitySection() {
  return (
    <Container className="mt-12 sm:mt-16 md:mt-20 lg:mt-24">
      <MotionDiv>
        <div className="mx-auto max-w-2xl text-left lg:text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            → Community Involvement
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Giving back through mentorship, volunteer work, and community
            leadership
          </p>
        </div>
      </MotionDiv>

      <div className="mx-auto mt-8 max-w-4xl">
        <MotionList className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          {communityConfig.activities.map((activity) => (
            <CommunityCard key={activity.title} activity={activity} />
          ))}
        </MotionList>
      </div>
    </Container>
  )
}

'use client'

import { Container } from '@/components/Container'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Heart, GraduationCap, Sparkles } from 'lucide-react'
import MotionDiv from '@/components/motion-div'
import MotionList from '@/components/motion-list'

const communityActivities = [
  {
    title: 'Bloomberg Diversity Interview Prep Bootcamp',
    role: 'Volunteer Instructor & Mentor',
    duration: '6-month program',
    type: 'Mentorship',
    icon: GraduationCap,
    color: 'from-blue-500/20 to-indigo-500/20',
    badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
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
    icon: Heart,
    color: 'from-pink-500/20 to-rose-500/20',
    badgeColor: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
    description:
      'Leading community service initiatives within Bloomberg engineering teams, organizing volunteer activities and coordinating outreach programs to support local NYC communities.',
    achievements: [
      'Logged 15+ volunteer hours in past year',
      'Mobilized multiple engineering teams for community service',
      'Coordinated homeless aid initiatives and care package distribution',
      'Organized NYC park cleanup efforts',
    ],
  },
]

interface CommunityCardProps {
  activity: (typeof communityActivities)[0]
  index: number
}

function CommunityCard({ activity, index }: CommunityCardProps) {
  const IconComponent = activity.icon

  return (
    <MotionDiv className="relative">
      <Card className="group relative h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${activity.color} opacity-0 transition-opacity group-hover:opacity-100`}
        />

        <CardContent className="relative flex h-full flex-col p-4 sm:p-6">
          {/* Header with Icon */}
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20 shadow-sm ring-1 ring-border dark:bg-white/10">
              <IconComponent className="h-6 w-6 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold leading-tight text-foreground">
                  {activity.title}
                </h3>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={activity.badgeColor}>
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
            <p className="text-sm leading-relaxed text-muted-foreground">
              {activity.description}
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
    <Container className="mt-16 sm:mt-20 md:mt-24 lg:mt-28">
      <MotionDiv>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Community Involvement
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Giving back through mentorship, volunteer work, and community
            leadership
          </p>
        </div>
      </MotionDiv>

      <div className="mx-auto mt-12 max-w-4xl">
        <MotionList className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
          {communityActivities.map((activity, index) => (
            <CommunityCard
              key={activity.title}
              activity={activity}
              index={index}
            />
          ))}
        </MotionList>
      </div>
    </Container>
  )
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/Container'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  CalendarDays,
  MapPin,
  Users,
  Zap,
  Code,
  Database,
  Network,
  Cloud,
  Box,
} from 'lucide-react'
import MotionDiv from '@/components/motion-div'
import MotionList from '@/components/motion-list'
import logoBBG from '@/images/logos/bbg.svg'
import logoPaxos from '@/images/logos/paxos.svg'
import logoMadisonReed from '@/images/logos/madison-reed.svg'
import reactIcon from '@/images/icons/react.png'
import nodejsIcon from '@/images/icons/nodejs.png'
import typescriptIcon from '@/images/icons/typescript.png'
import dockerIcon from '@/images/icons/docker.png'
import pythonIcon from '@/images/icons/python.png'
import goIcon from '@/images/icons/go.svg'
import postgresqlIcon from '@/images/icons/postgresql.svg'
import graphqlIcon from '@/images/icons/graphql.svg'

// Function to get icon for technology
function getTechIcon(tech: string) {
  const techLower = tech.toLowerCase()

  // Image icons
  if (techLower.includes('react')) return reactIcon
  if (techLower.includes('node') || techLower === 'node.js') return nodejsIcon
  if (techLower.includes('typescript')) return typescriptIcon
  if (techLower.includes('docker')) return dockerIcon
  if (techLower.includes('python')) return pythonIcon
  if (techLower.includes('go') || techLower === 'golang') return goIcon
  if (techLower.includes('postgresql') || techLower === 'postgres')
    return postgresqlIcon
  if (techLower.includes('graphql')) return graphqlIcon

  // Lucide icons for other technologies
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

const experiences = [
  {
    company: 'Bloomberg LP',
    companyUrl: 'https://www.bloomberg.com',
    role: 'Platform Engineering Team Lead',
    period: 'March 2023 - Present',
    location: 'New York, NY',
    type: 'Full-time',
    logo: logoBBG,
    description:
      'Leading centralized API platform development and managing a 5-engineer team focused on developer tools. Created Bento UI framework using module federation.',
    achievements: [
      'Built centralized API platform for Private Cloud infrastructure',
      'Designed Activity API platform providing infrastructure event visibility',
      'Created Bento UI framework using module federation',
      'Managed 5-engineer team focused on developer tools and infrastructure reliability',
    ],
    technologies: [
      'React',
      'Node.js',
      'TypeScript',
      'Kubernetes',
      'Docker',
      'Golang',
      'PostgreSQL',
      'GraphQL',
      'OpenStack',
    ],
    color: 'from-orange-500/20 to-red-500/20',
  },
  {
    company: 'Bloomberg LP',
    companyUrl: 'https://www.bloomberg.com',
    role: 'Senior Software Engineer',
    period: 'August 2018 - March 2023',
    location: 'New York, NY',
    type: 'Full-time',
    logo: logoBBG,
    description:
      'Led data center modernization project and architected full-stack software solutions for Bloomberg infrastructure.',
    achievements: [
      'Led data center modernization project',
      'Built centralized API platform for Private Cloud infrastructure',
      'Designed Activity API platform providing infrastructure event visibility',
      'Architected full-stack software solutions for Bloomberg infrastructure',
    ],
    technologies: [
      'Python',
      'JavaScript',
      'React',
      'Node.js',
      'AWS',
      'Golang',
      'PostgreSQL',
      'GraphQL',
      'OpenStack',
    ],
    color: 'from-orange-500/20 to-red-500/20',
  },
  {
    company: 'Paxos (formerly itBit)',
    companyUrl: 'https://paxos.com',
    role: 'Senior Software Engineer',
    period: 'April 2015 - August 2018',
    location: 'New York, NY',
    type: 'Full-time',
    logo: logoPaxos,
    description:
      'Led infrastructure modernization and REST API platform development. Designed SWIFT banking system integration and implemented zero downtime deployments.',
    achievements: [
      'Completed full Terraform migration of manually deployed systems',
      'Designed and implemented TLS client certificate authentication',
      'Led REST API platform development for institutional trading',
      'Designed SWIFT banking system for institutional trading integration',
      'Implemented zero downtime deployments using HA Proxy',
      'Proposed framework using Node.js, React.js, and Flux architecture',
      'Contributed to becoming second-largest Bitcoin exchange by volume',
    ],
    technologies: ['Node.js', 'React.js', 'Terraform', 'Docker', 'PostgreSQL'],
    color: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    company: 'Madison Reed',
    companyUrl: 'https://www.madison-reed.com',
    role: 'Software Engineer',
    period: 'September 2013 - May 2015',
    location: 'San Francisco, CA',
    type: 'Full-time',
    logo: logoMadisonReed,
    description:
      'Implemented Redis caching system, developed custom CMS, and led migration from Magento to custom Node.js framework.',
    achievements: [
      'Implemented Redis caching system reducing database calls',
      'Developed custom CMS tailored to company workflow',
      'Led migration from Magento to custom Node.js order processing framework',
    ],
    technologies: ['Node.js', 'Redis', 'MongoDB', 'JavaScript', 'CSS'],
    color: 'from-pink-500/20 to-rose-500/20',
  },
]

interface ExperienceCardProps {
  experience: (typeof experiences)[0]
  index: number
}

function ExperienceCard({ experience, index }: ExperienceCardProps) {
  return (
    <MotionDiv className="relative">
      <Card className="group relative h-full w-full overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${experience.color} opacity-0 transition-opacity group-hover:opacity-100`}
        />

        <CardContent className="relative flex h-full flex-col p-4 sm:p-6">
          <div className="flex gap-3 sm:gap-4">
            {/* Content */}
            <div className="min-w-0 flex-1 space-y-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {experience.role}
                  </h3>
                  <Badge variant="secondary">{experience.type}</Badge>
                </div>
                <Link
                  href={experience.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary transition-colors hover:text-primary/80"
                >
                  {experience.company}
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

              <p className="text-sm leading-6 text-muted-foreground">
                {experience.description}
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

            {/* Company Logo */}
            <div className="relative shrink-0">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-border sm:h-20 sm:w-20">
                <Image
                  src={experience.logo}
                  alt={`${experience.company} logo`}
                  width={48}
                  height={48}
                  className="h-10 w-10 sm:h-12 sm:w-12"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </MotionDiv>
  )
}

export function ExperienceSection() {
  const totalYears = new Date().getFullYear() - 2013

  return (
    <Container className="mt-16 sm:mt-20 md:mt-24 lg:mt-28">
      <MotionDiv>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Work Experience
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {totalYears}+ years of building scalable software solutions
          </p>
        </div>
      </MotionDiv>

      <div className="mx-auto mt-12 max-w-6xl">
        <MotionList className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
          {experiences.map((experience, index) => (
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

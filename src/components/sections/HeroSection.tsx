'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/Container'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons'
import { Download, MapPin, Mail } from 'lucide-react'
import { getIcon, avatarImage } from '@/lib/config'
import {
  type PersonalConfig,
  type ContactConfig,
  type HeroConfig,
} from '@/lib/config-server'
import MotionDiv from '@/components/motion-div'

interface HeroSectionProps {
  personalConfig: PersonalConfig
  contactConfig: ContactConfig
  heroConfig: HeroConfig
}

export function HeroSection({
  personalConfig,
  contactConfig,
  heroConfig,
}: HeroSectionProps) {
  return (
    <Container className="mt-4 sm:mt-6 md:mt-8 lg:mt-12">
      <MotionDiv>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Content Side - 50% width */}
          <div className="flex flex-col justify-center space-y-4 sm:space-y-6 md:space-y-6 lg:space-y-6">
            {/* Location Badge - Desktop only */}
            <div className="hidden justify-center sm:justify-start lg:flex">
              <Badge variant="secondary" className="w-fit">
                <MapPin className="mr-2 h-3 w-3" />
                {personalConfig.location}
              </Badge>
            </div>

            {/* Mobile: Horizontal layout with tagline, position, and avatar */}
            <div className="flex items-start gap-4 lg:hidden">
              {/* Text content */}
              <div className="flex-1 space-y-1">
                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {personalConfig.tagline}
                </h1>
                <h2 className="text-sm text-muted-foreground sm:text-base">
                  {personalConfig.title}
                </h2>
                {/* Location Badge - Mobile only */}
                <div className="flex justify-start pt-1">
                  <Badge variant="secondary" className="w-fit text-xs">
                    <MapPin className="mr-1 h-2.5 w-2.5" />
                    {personalConfig.location}
                  </Badge>
                </div>
                {/* Availability - Mobile only */}
                {personalConfig.availability.active && (
                  <div className="flex items-center gap-2 pt-1">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-xs font-medium text-muted-foreground">
                      {personalConfig.availability.status}
                    </span>
                  </div>
                )}
              </div>

              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-28 sm:w-32">
                  <div className="aspect-square rotate-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 p-2">
                    <Image
                      src={avatarImage}
                      alt="Sherod Taylor"
                      sizes="(max-width: 1023px) 8rem, 0px"
                      className="aspect-square rounded-xl bg-zinc-100 object-cover dark:bg-zinc-800"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop: Original layout */}
            <div className="hidden space-y-2 lg:block">
              <h1 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-left sm:text-3xl md:text-4xl lg:text-5xl">
                {personalConfig.tagline}
              </h1>
            </div>

            <div className="space-y-1 text-left sm:space-y-2">
              <h2 className="hidden text-base text-muted-foreground sm:text-base md:text-lg lg:block lg:text-xl">
                {personalConfig.title}
              </h2>
              <p className="text-xs leading-4 text-white sm:text-sm sm:leading-5 md:text-base md:leading-6">
                {personalConfig.description}
              </p>
            </div>

            {/* Desktop CTA Buttons and Social Links */}
            <div className="hidden lg:block">
              {/* Availability Badge */}
              {personalConfig.availability.active && (
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {personalConfig.availability.status}
                  </span>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <Button size="default" className="group flex-1" asChild>
                    <Link href={`mailto:${contactConfig.email}`}>
                      <Mail className="mr-2 h-4 w-4" />
                      Get in touch
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="default"
                    className="group flex-1"
                    asChild
                  >
                    <Link
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                      Download Resume
                    </Link>
                  </Button>
                </div>

                {/* Social Links */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="default"
                    className="flex-1 border-gray-600 bg-gray-600 hover:bg-gray-700"
                    asChild
                  >
                    <Link
                      href={contactConfig.github}
                      aria-label="GitHub"
                      className="flex items-center justify-center gap-2"
                    >
                      <GitHubIcon className="h-4 w-4 text-white" />
                      <span className="text-sm font-medium text-white">
                        GitHub
                      </span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="default"
                    className="flex-1 border-gray-600 bg-gray-600 hover:bg-gray-700"
                    asChild
                  >
                    <Link
                      href={contactConfig.linkedin}
                      aria-label="LinkedIn"
                      className="flex items-center justify-center gap-2"
                    >
                      <LinkedInIcon className="h-4 w-4 text-white" />
                      <span className="text-sm font-medium text-white">
                        LinkedIn
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Core Strengths Icons - Mobile only, above CTA */}
            <div className="grid grid-cols-2 gap-1.5 text-xs sm:gap-2 md:grid-cols-2 lg:hidden">
              {heroConfig.highlights.map((highlight) => {
                const IconComponent = getIcon(
                  highlight.icon
                ) as React.ComponentType<{ className?: string }>
                const colorClasses = {
                  green: 'bg-green-500/10 text-green-600 dark:text-green-400',
                  purple:
                    'bg-purple-500/10 text-purple-600 dark:text-purple-400',
                  orange:
                    'bg-orange-500/10 text-orange-600 dark:text-orange-400',
                  cyan: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
                  amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
                  emerald:
                    'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
                  rose: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
                  indigo:
                    'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
                }

                return (
                  <div
                    key={highlight.name}
                    className="flex items-center gap-1.5 sm:gap-2"
                  >
                    <div
                      className={`flex h-4 w-4 items-center justify-center rounded-md sm:h-5 sm:w-5 ${colorClasses[highlight.color as keyof typeof colorClasses]}`}
                    >
                      {IconComponent && (
                        <IconComponent className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
                      )}
                    </div>
                    <span className="whitespace-nowrap text-xs font-medium text-foreground sm:text-xs">
                      {highlight.name}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Mobile CTA Buttons - Show only on mobile */}
            <div className="mt-4 flex flex-col items-center gap-2 lg:hidden">
              <div className="flex w-full flex-col gap-2">
                <Button size="sm" className="group w-full" asChild>
                  <Link href={`mailto:${contactConfig.email}`}>
                    <Mail className="mr-2 h-3.5 w-3.5" />
                    Get in touch
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="group w-full"
                  asChild
                >
                  <Link
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="mr-2 h-3.5 w-3.5 transition-transform group-hover:translate-y-1" />
                    Download Resume
                  </Link>
                </Button>
              </div>
              <div className="grid w-full grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-auto border-gray-600 bg-gray-600 px-3 py-2 hover:bg-gray-700"
                  asChild
                >
                  <Link
                    href={contactConfig.github}
                    aria-label="GitHub"
                    className="flex items-center justify-center gap-1.5"
                  >
                    <GitHubIcon className="h-3.5 w-3.5 text-white" />
                    <span className="text-xs font-medium text-white">
                      GitHub
                    </span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-auto border-gray-600 bg-gray-600 px-3 py-2 hover:bg-gray-700"
                  asChild
                >
                  <Link
                    href={contactConfig.linkedin}
                    aria-label="LinkedIn"
                    className="flex items-center justify-center gap-1.5"
                  >
                    <LinkedInIcon className="h-3.5 w-3.5 text-white" />
                    <span className="text-xs font-medium text-white">
                      LinkedIn
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Portrait Side - 50% width */}
          <div className="relative hidden lg:flex lg:flex-col lg:items-center lg:justify-center">
            <div className="w-full max-w-md">
              <div className="aspect-square rotate-3 overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 p-4">
                <Image
                  src={avatarImage}
                  alt="Sherod Taylor"
                  sizes="(min-width: 1024px) 32rem, 20rem"
                  className="aspect-square rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </MotionDiv>
    </Container>
  )
}

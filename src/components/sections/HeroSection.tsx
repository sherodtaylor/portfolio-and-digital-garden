'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/Container'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons'
import {
  Download,
  MapPin,
  Mail,
  Users,
  Layers,
  Activity,
  Code,
  Crown,
  CheckSquare,
  Package,
  Palette,
} from 'lucide-react'
import avatarImage from '@/images/profile.jpeg'
import MotionDiv from '@/components/motion-div'

export function HeroSection() {
  return (
    <Container className="mt-4 sm:mt-6 md:mt-8 lg:mt-12">
      <MotionDiv>
        <div className="grid gap-6 lg:grid-cols-5 lg:gap-8 xl:gap-12">
          {/* Content Side - 60% width */}
          <div className="flex flex-col justify-center space-y-6 sm:space-y-6 md:space-y-6 lg:col-span-3 lg:space-y-6">
            <div className="space-y-2 text-center sm:text-left">
              {/* Availability Badge */}
              <Badge variant="secondary" className="w-fit">
                <MapPin className="mr-2 h-3 w-3" />
                New York, NY
              </Badge>
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
                Building{' '}
                <span className="bg-gradient-to-r from-primary to-primary/30 bg-clip-text text-transparent">
                  scalable solutions
                </span>{' '}
                for complex infrastructure
              </h1>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <h2 className="text-sm text-muted-foreground sm:text-base md:text-lg lg:text-xl">
                Platform Engineering Team Lead @ Bloomberg
              </h2>
              <p className="text-xs leading-4 text-muted-foreground sm:text-sm sm:leading-5 md:text-base md:leading-6">
                What started as a passion for solving complex problems has
                evolved into leading a platform engineering team that serves
                thousands of developers. At Bloomberg, I've architected systems
                serving 9,000+ engineers and led teams that deliver
                mission-critical platforms.
                <br />
                <br />I build the invisible infrastructure that makes everything
                else possible—bridging the gap between technical excellence and
                team leadership. My sweet spot? Taking ambitious ideas and
                turning them into elegant, scalable solutions while building the
                teams that maintain and evolve them.
              </p>
            </div>

            {/* Core Strengths - Desktop Only Compact Icons */}
            <div className="hidden gap-2 text-xs md:grid md:grid-cols-2">
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-md bg-green-500/10 text-green-600 dark:text-green-400">
                  <Users className="h-2.5 w-2.5" />
                </div>
                <span className="whitespace-nowrap font-medium text-foreground">
                  Team Management
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  <Layers className="h-2.5 w-2.5" />
                </div>
                <span className="whitespace-nowrap font-medium text-foreground">
                  Distributed Systems
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400">
                  <Activity className="h-2.5 w-2.5" />
                </div>
                <span className="whitespace-nowrap font-medium text-foreground">
                  API Architecture
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                  <Code className="h-2.5 w-2.5" />
                </div>
                <span className="whitespace-nowrap font-medium text-foreground">
                  Full-Stack Development
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Crown className="h-2.5 w-2.5" />
                </div>
                <span className="whitespace-nowrap font-medium text-foreground">
                  Leadership
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <CheckSquare className="h-2.5 w-2.5" />
                </div>
                <span className="whitespace-nowrap font-medium text-foreground">
                  Project Management
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400">
                  <Package className="h-2.5 w-2.5" />
                </div>
                <span className="whitespace-nowrap font-medium text-foreground">
                  Product
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <Palette className="h-2.5 w-2.5" />
                </div>
                <span className="whitespace-nowrap font-medium text-foreground">
                  Design
                </span>
              </div>
            </div>
          </div>

          {/* Portrait Side - 40% width */}
          <div className="relative hidden lg:col-span-2 lg:block">
            <div className="w-full">
              <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-4">
                <div className="relative h-full w-full overflow-hidden rounded-xl">
                  <Image
                    src={avatarImage}
                    alt="Sherod Taylor"
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Availability Badge and CTA under portrait */}
              <div className="mt-4 space-y-3">
                {/* Availability Badge */}
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Open for new opportunities
                  </span>
                </div>

                {/* CTA Buttons - Same width as portrait */}
                <div className="flex flex-col gap-2">
                  <Button size="default" className="group w-full" asChild>
                    <Link href="mailto:sherodtaylor@gmail.com">
                      <Mail className="mr-2 h-4 w-4" />
                      Get in touch
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="default"
                    className="group w-full"
                  >
                    <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                    Download Resume
                  </Button>
                </div>

                {/* Social Links - Equal width */}
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="default"
                    className="h-auto bg-white/20 px-4 py-3 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20"
                    asChild
                  >
                    <Link
                      href="https://github.com/sherodtaylor"
                      aria-label="GitHub"
                      className="flex items-center justify-center gap-2"
                    >
                      <GitHubIcon className="h-4 w-4" />
                      <span className="text-sm font-medium">GitHub</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="default"
                    className="h-auto bg-white/20 px-4 py-3 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20"
                    asChild
                  >
                    <Link
                      href="https://www.linkedin.com/in/sherodtaylor/"
                      aria-label="LinkedIn"
                      className="flex items-center justify-center gap-2"
                    >
                      <LinkedInIcon className="h-4 w-4" />
                      <span className="text-sm font-medium">LinkedIn</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MotionDiv>
    </Container>
  )
}

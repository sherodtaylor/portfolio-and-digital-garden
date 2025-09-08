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
  Zap,
  Activity,
  Code,
} from 'lucide-react'
import avatarImage from '@/images/profile.jpeg'
import MotionDiv from '@/components/motion-div'

export function HeroSection() {
  return (
    <Container className="mt-4 sm:mt-6 md:mt-8 lg:mt-12">
      <MotionDiv>
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-8 xl:gap-16">
          {/* Content Side */}
          <div className="flex flex-col justify-center space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
            <div className="space-y-2 text-center sm:text-left">
              <Badge variant="secondary" className="w-fit">
                <MapPin className="mr-2 h-3 w-3" />
                New York, NY
              </Badge>
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Sherod Taylor
                </span>
              </h1>
            </div>

            <div className="space-y-1 sm:space-y-2">
              <h2 className="text-sm text-muted-foreground sm:text-base md:text-lg lg:text-xl">
                Platform Engineering Team Lead @ Bloomberg
              </h2>
              <p className="text-xs leading-4 text-muted-foreground sm:text-sm sm:leading-5 md:text-base md:leading-6">
                I lead engineering teams focused on developer tools and
                infrastructure automation. Building scalable platforms that make
                developers' lives easier.
              </p>

              {/* Core Strengths - Desktop Only Compact Icons */}
              <div className="hidden gap-2 text-xs md:grid md:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <Zap className="h-3 w-3" />
                  </div>
                  <span className="font-medium text-foreground">
                    Platform Leadership
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-green-500/10 text-green-600 dark:text-green-400">
                    <Users className="h-3 w-3" />
                  </div>
                  <span className="font-medium text-foreground">
                    Team Management
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    <Layers className="h-3 w-3" />
                  </div>
                  <span className="font-medium text-foreground">
                    Distributed Systems
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400">
                    <Activity className="h-3 w-3" />
                  </div>
                  <span className="font-medium text-foreground">
                    API Architecture
                  </span>
                </div>

                <div className="flex items-center gap-2 md:col-span-2 lg:col-span-1">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                    <Code className="h-3 w-3" />
                  </div>
                  <span className="font-medium text-foreground">
                    Full-Stack Development
                  </span>
                </div>
              </div>

              {/* Availability Badge */}
              <div className="mt-1 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-xs font-medium text-muted-foreground">
                  Available for new opportunities
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:gap-2 md:gap-3">
              <Button size="default" className="group w-full sm:w-auto">
                <Mail className="mr-2 h-4 w-4" />
                Get in touch
              </Button>
              <Button
                variant="outline"
                size="default"
                className="group w-full sm:w-auto"
              >
                <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                Download Resume
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-1.5 sm:gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-auto bg-white/20 px-2 py-1 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20 sm:px-3 sm:py-1.5"
                asChild
              >
                <Link
                  href="https://github.com/sherodtaylor"
                  aria-label="GitHub"
                  className="flex items-center gap-1 sm:gap-2"
                >
                  <GitHubIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs font-medium">GitHub</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-auto bg-white/20 px-2 py-1 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20 sm:px-3 sm:py-1.5"
                asChild
              >
                <Link
                  href="https://www.linkedin.com/in/sherodtaylor/"
                  aria-label="LinkedIn"
                  className="flex items-center gap-1 sm:gap-2"
                >
                  <LinkedInIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs font-medium">LinkedIn</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Image Side - Large Desktop only */}
          <div className="relative hidden xl:block">
            <div className="aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8">
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <Image
                  src={avatarImage}
                  alt="Sherod Taylor"
                  className="h-full w-full object-cover"
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

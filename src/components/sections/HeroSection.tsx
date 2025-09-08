'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/Container'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons'
import { Download, MapPin, Mail, Users, Layers, Zap, Activity, Code } from 'lucide-react'
import avatarImage from '@/images/profile.jpeg'
import MotionDiv from '@/components/motion-div'

export function HeroSection() {
  return (
    <Container className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
      <MotionDiv>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-20">
          {/* Content Side */}
          <div className="flex flex-col justify-center space-y-3 md:space-y-6">
            <div className="space-y-2">
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

            <div className="space-y-2">
              <h2 className="text-base text-muted-foreground sm:text-lg md:text-xl">
                Platform Engineering Team Lead @ Bloomberg
              </h2>
              <p className="text-sm leading-5 text-muted-foreground sm:text-base sm:leading-6">
                I lead engineering teams focused on developer tools and
                infrastructure automation. Building scalable platforms that make
                developers' lives easier.
              </p>

              {/* Core Strengths - Desktop Only Compact Icons */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <Zap className="h-3 w-3" />
                  </div>
                  <span className="font-medium text-foreground">Platform Leadership</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-green-500/10 text-green-600 dark:text-green-400">
                    <Users className="h-3 w-3" />
                  </div>
                  <span className="font-medium text-foreground">Team Management</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    <Layers className="h-3 w-3" />
                  </div>
                  <span className="font-medium text-foreground">Distributed Systems</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400">
                    <Activity className="h-3 w-3" />
                  </div>
                  <span className="font-medium text-foreground">API Architecture</span>
                </div>

                <div className="flex items-center gap-2 md:col-span-2 lg:col-span-1">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                    <Code className="h-3 w-3" />
                  </div>
                  <span className="font-medium text-foreground">Full-Stack Development</span>
                </div>
              </div>

              {/* Availability Badge */}
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                  Available for new opportunities
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:gap-3 md:gap-4">
              <Button size="default" className="group w-full sm:w-auto">
                <Mail className="mr-2 h-4 w-4" />
                Get in touch
              </Button>
              <Button variant="outline" size="default" className="group w-full sm:w-auto">
                <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                Download Resume
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-auto px-3 py-1.5 bg-white/20 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20" asChild>
                <Link
                  href="https://github.com/sherodtaylor"
                  aria-label="GitHub"
                  className="flex items-center gap-2"
                >
                  <GitHubIcon className="h-5 w-5" />
                  <span className="text-xs font-medium sm:text-sm">GitHub</span>
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="h-auto px-3 py-1.5 bg-white/20 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20" asChild>
                <Link
                  href="https://www.linkedin.com/in/sherodtaylor/"
                  aria-label="LinkedIn"
                  className="flex items-center gap-2"
                >
                  <LinkedInIcon className="h-5 w-5" />
                  <span className="text-xs font-medium sm:text-sm">LinkedIn</span>
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

'use client'

import { Container } from '@/components/Container'
import { Users, Layers, Zap, Activity, Code } from 'lucide-react'
import MotionDiv from '@/components/motion-div'

export function StrengthsSection() {
  return (
    <Container className="mt-16 sm:mt-20 md:hidden">
      <MotionDiv>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Core Strengths
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Key capabilities that drive platform engineering excellence
          </p>
        </div>
      </MotionDiv>

      <div className="mx-auto mt-12 max-w-4xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center gap-3 rounded-lg bg-blue-500/5 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Zap className="h-5 w-5" />
            </div>
            <span className="font-medium text-foreground">Platform Leadership</span>
          </div>
          
          <div className="flex items-center gap-3 rounded-lg bg-green-500/5 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-600 dark:text-green-400">
              <Users className="h-5 w-5" />
            </div>
            <span className="font-medium text-foreground">Team Management</span>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-purple-500/5 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Layers className="h-5 w-5" />
            </div>
            <span className="font-medium text-foreground">Distributed Systems</span>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-orange-500/5 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400">
              <Activity className="h-5 w-5" />
            </div>
            <span className="font-medium text-foreground">API Architecture</span>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-cyan-500/5 p-4 sm:col-span-2 lg:col-span-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <Code className="h-5 w-5" />
            </div>
            <span className="font-medium text-foreground">Full-Stack Development</span>
          </div>
        </div>
      </div>
    </Container>
  )
}
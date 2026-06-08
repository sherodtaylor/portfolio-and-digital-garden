import React from 'react'
import { type Metadata } from 'next'
import Link from 'next/link'

import { SimpleLayout } from '@/components/SimpleLayout'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ExternalLink,
  Github,
  Globe,
  Server,
  Settings,
  Bot,
} from 'lucide-react'
import Image, { type StaticImageData } from 'next/image'
import { getIcon } from '@/lib/config'

const isStaticImageData = (
  icon: StaticImageData | React.ComponentType<{ className?: string }> | null
): icon is StaticImageData => {
  return icon !== null && typeof icon === 'object' && 'src' in icon
}

interface Project {
  name: string
  description: string
  highlights: string[]
  link: { href: string; label: string; isPrivate?: boolean }
  website?: { href: string; label: string }
  icon: React.ComponentType<{ className?: string }>
  tags: string[]
}

const projects: Project[] = [
  {
    name: 'agent-smith',
    description:
      'Autonomous AI engineering teammates that live inside the home lab cluster and treat Matrix as the input channel. Tag a bot, it opens a PR; tag the other bot, it reviews; the product-manager bot owns PRDs and roadmap. They auto-address review comments, use the cluster’s own observability stack via MCP, and never hold the real credentials — those stay behind an egress proxy at the cluster edge. Packaged as a public Helm chart anyone can deploy.',
    highlights: [
      'Three-Agent Crew, One Parametric Image: DevBot (code), InfraBot (k3s/Flux), and PMBot (product/PRDs) run as separate StatefulSets from the same ghcr.io/sherodtaylor/agent-smith image. Per-agent persona, MCP config, and subagents live under agents/<name>/; the shared base CLAUDE.md is one ConfigMap',
      'Matrix-Driven, Autonomous PR Workflow: Messages in #dev / #infra are real Claude Code prompts. After opening a PR the author mentions the other bot for review; the reviewer runs the code-review skill and posts inline findings. A Stop-hook re-wakes the author on unaddressed comments so iteration happens without a human in the loop',
      'Egress Credential Firewall (iron-proxy): Productionized so agents never hold real GitHub or Anthropic tokens — iron-proxy MITMs egress with a private CA and swaps placeholder tokens for real credentials per-host against a domain allowlist. A compromised pod leaks nothing useful',
      "MCP for Everything Observable: VictoriaMetrics + VictoriaLogs MCP servers, a stdio NATS MCP server for the durable event log, and the Matrix channel plugin for inputs. 'Check the api-latency dashboard' becomes a single prompt",
      'Two-Pane Runtime: Each pod runs claude in tmux — pane 0 owns the Matrix identity, pane 1 runs a second claude --remote-control with its own $HOME so humans can attach via kubectl exec or the Claude desktop/web app',
      'Public OSS Distribution: image (ghcr.io/sherodtaylor/agent-smith) and Helm chart (oci://ghcr.io/sherodtaylor/charts/agent-smith) ship every release; framework docs at sherodtaylor.github.io/agent-smith',
    ],
    link: {
      href: 'https://github.com/sherodtaylor/agent-smith',
      label: 'github.com/sherodtaylor/agent-smith',
    },
    website: {
      href: 'https://sherodtaylor.github.io/agent-smith',
      label: 'Framework docs',
    },
    icon: Bot,
    tags: [
      'Claude Code',
      'MCP',
      'AI Agents',
      'Matrix',
      'NATS',
      'k3s',
      'Flux GitOps',
      'Helm',
      'iron-proxy',
      'Bun',
      'Go',
      'Docker',
      'tmux',
      'GitHub Actions',
    ],
  },
  {
    name: 'Home Lab Cluster',
    description:
      "Self-hosted k3s cluster running every app my family actually depends on. Flux reconciles every manifest from sherodtaylor/homelab, Traefik fronts the lot with auto-renewed Let's Encrypt certs, ExternalSecrets pulls credentials from Infisical, and VictoriaMetrics + VictoriaLogs catch anything that drifts — so the house keeps running while I keep tinkering.",
    highlights: [
      'Media + Entertainment: Jellyfin and Plex stream the family library, Jellyseerr handles requests, the *arr stack (Sonarr, Radarr, Lidarr, Prowlarr) automates discovery, qBittorrent and Sabnzbd handle downloads, Audiobookshelf catalogues the audiobook collection',
      'Photos + Files + Storage: Immich runs face recognition over years of family photos, Nextcloud hosts personal files, TrueNAS (8 TB via NFS) backs every stateful service in the cluster',
      'Home Automation: Home Assistant runs the house — lights, thermostats, schedules, sensors across the home — all on the same cluster, not a separate appliance',
      "Observability Built-in: VictoriaMetrics + VictoriaLogs ingest every pod's metrics and logs; Grafana dashboards and Alertmanager catch regressions before they become outages",
      'GitOps All the Way Down: Flux reconciles every Kustomization and HelmRelease from sherodtaylor/homelab; cert-manager + kubernetes-replicator handle TLS across namespaces; the cluster rebuilds from a single git push',
    ],
    link: {
      href: 'https://github.com/sherodtaylor/homelab',
      label: 'github.com/sherodtaylor/homelab',
    },
    icon: Server,
    tags: [
      'Proxmox',
      'k3s',
      'Flux GitOps',
      'Helm',
      'Traefik',
      'cert-manager',
      'ExternalSecrets',
      'Infisical',
      'TrueNAS',
      'Home Assistant',
      'Jellyfin',
      'Plex',
      'Immich',
      'Nextcloud',
      'Audiobookshelf',
      'Sonarr',
      'Radarr',
      'Prowlarr',
      'qBittorrent',
      'VictoriaMetrics',
      'VictoriaLogs',
      'Grafana',
      'Alertmanager',
      "Let's Encrypt",
    ],
  },
  {
    name: 'Dotfiles',
    description:
      'Maintained comprehensive dotfiles and development environment configurations for consistent, reproducible development setups across multiple systems.',
    highlights: [
      'Cross-Platform Configuration: Unified development environment setup for macOS and Linux systems',
      'Editor Configuration: Advanced Neovim configurations with language servers and productivity enhancements',
    ],
    link: {
      href: 'https://github.com/sherodtaylor/dotfiles',
      label: 'github.com/sherodtaylor/dotfiles',
    },
    icon: Settings,
    tags: ['DevOps', 'Automation', 'Neovim', 'Shell Scripting'],
  },
]

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Personal technical projects showcasing AI infrastructure, development tools, and automation solutions.',
}

export default function Projects() {
  return (
    <SimpleLayout
      title="Personal Technical Projects"
      intro="A collection of personal projects that reflect my passion for AI infrastructure, developer tooling, and automation. These projects demonstrate hands-on experience with modern technologies and best practices in platform engineering."
    >
      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
        {projects.map((project) => {
          const IconComponent = project.icon
          return (
            <Card key={project.name} className="w-full overflow-hidden">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.tags.map((tag) => {
                        const tagIcon = getIcon(tag)
                        return (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="flex items-center gap-1.5 text-xs"
                          >
                            {tagIcon && !isStaticImageData(tagIcon) ? (
                              React.createElement(tagIcon, {
                                className: 'h-3 w-3',
                              })
                            ) : tagIcon && isStaticImageData(tagIcon) ? (
                              <Image
                                src={tagIcon}
                                alt={tag}
                                width={12}
                                height={12}
                                className="h-3 w-3"
                              />
                            ) : null}
                            <span>{tag}</span>
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <CardDescription className="text-sm leading-6">
                  {project.description}
                </CardDescription>

                <div className="space-y-2">
                  {project.highlights.map((highlight, index) => (
                    <div key={index} className="text-sm text-muted-foreground">
                      <span className="font-medium">
                        {highlight.split(':')[0]}:
                      </span>
                      <span className="ml-1">
                        {highlight.split(':').slice(1).join(':').trim()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Github className="h-4 w-4" />
                    <span className="truncate">{project.link.label}</span>
                    {project.link.isPrivate && (
                      <Badge variant="outline" className="text-xs">
                        Private
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {project.website && (
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          href={project.website.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <Globe className="h-3 w-3" />
                          {project.website.label}
                        </Link>
                      </Button>
                    )}
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href={project.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        View Code
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </SimpleLayout>
  )
}

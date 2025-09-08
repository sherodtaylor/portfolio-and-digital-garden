import MotionDiv from '@/components/motion-div'
import MotionList from '@/components/motion-list'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import reactIcon from '@/images/icons/react.png'
import nextjsIcon from '@/images/icons/next-js.png'
import vueIcon from '@/images/icons/vue.png'
import typescriptIcon from '@/images/icons/typescript.png'
import javascriptIcon from '@/images/icons/javascript.png'
import pythonIcon from '@/images/icons/python.png'
import javaIcon from '@/images/icons/java.png'
import html5Icon from '@/images/icons/html5.png'
import tailwindcssIcon from '@/images/icons/tailwindcss.png'
import shadcnuiIcon from '@/images/icons/shadcn-ui.png'
import pnpmIcon from '@/images/icons/pnpm.png'
import viteIcon from '@/images/icons/vite.png'
import prettierIcon from '@/images/icons/prettier.png'
import nodejsIcon from '@/images/icons/nodejs.png'
import nestjsIcon from '@/images/icons/nest-js.png'
import expressjsIcon from '@/images/icons/express-js.png'
import prismaIcon from '@/images/icons/prisma.png'
import mysqlIcon from '@/images/icons/mysql.png'
import springbootIcon from '@/images/icons/springboot.png'
import dockerIcon from '@/images/icons/docker.png'
import gitIcon from '@/images/icons/git.png'
import ubuntuIcon from '@/images/icons/ubuntu.svg'
import macosIcon from '@/images/icons/macos.png'
import vscodeIcon from '@/images/icons/vscode.png'
import arcIcon from '@/images/icons/arc.png'
import warpIcon from '@/images/icons/warp.webp'
import postmanIcon from '@/images/icons/postman.svg'
import davinciResolveIcon from '@/images/icons/davinci-resolve.png'
import lightroomIcon from '@/images/icons/lightroom.png'
import ExpoIcon from '@/images/icons/expo.png'
import githubActionsIcon from '@/images/icons/github-actions.png'
import trpcIcon from '@/images/icons/trpc.svg'

export default function SkillsNew() {
  const data = [
    {
      title: 'Web Development',
      skills: [
        {
          name: 'React.js',
          icon: reactIcon,
        },
        {
          name: 'Next.js',
          icon: nextjsIcon,
        },
        {
          name: 'Vue.js',
          icon: vueIcon,
        },
        {
          name: 'tRPC',
          icon: trpcIcon,
        },
        {
          name: 'TypeScript',
          icon: typescriptIcon,
        },
        {
          name: 'JavaScript',
          icon: javascriptIcon,
        },
        {
          name: 'HTML5',
          icon: html5Icon,
        },
        {
          name: 'Tailwind CSS',
          icon: tailwindcssIcon,
        },
        {
          name: 'shadcn/ui',
          icon: shadcnuiIcon,
        },
        {
          name: 'PNPM',
          icon: pnpmIcon,
        },
        {
          name: 'Vite',
          icon: viteIcon,
        },
        {
          name: 'Prettier',
          icon: prettierIcon,
        },
      ],
    },
    {
      title: 'Backend Development',
      skills: [
        {
          name: 'Node.js',
          icon: nodejsIcon,
        },
        {
          name: 'Nest.js',
          icon: nestjsIcon,
        },
        {
          name: 'Express.js',
          icon: expressjsIcon,
        },
        {
          name: 'Prisma ORM',
          icon: prismaIcon,
        },
        {
          name: 'MySQL',
          icon: mysqlIcon,
        },
        {
          name: "Spring Boot (a lil' bit..)",
          icon: springbootIcon,
        },
      ],
    },
    {
      title: 'Mobile Development',
      skills: [
        {
          name: 'React Native',
          icon: reactIcon,
        },
        {
          name: 'Expo',
          icon: ExpoIcon,
        },
      ],
    },
    {
      title: 'DevOps',
      skills: [
        {
          name: 'Git',
          icon: gitIcon,
        },
        {
          name: 'GitHub Actions',
          icon: githubActionsIcon,
        },
        {
          name: 'Docker',
          icon: dockerIcon,
        },
        {
          name: 'Ubuntu',
          icon: ubuntuIcon,
        },
      ],
    },
    {
      title: 'Languages',
      skills: [
        {
          name: 'TypeScript',
          icon: typescriptIcon,
        },
        {
          name: 'JavaScript',
          icon: javascriptIcon,
        },
        {
          name: 'Python',
          icon: pythonIcon,
        },
        {
          name: 'Java',
          icon: javaIcon,
        },
      ],
    },
    {
      title: 'Tools & Environment',
      skills: [
        {
          name: 'macOS',
          icon: macosIcon,
        },
        {
          name: 'VS Code',
          icon: vscodeIcon,
        },
        {
          name: 'Arc',
          icon: arcIcon,
        },
        {
          name: 'Warp Terminal',
          icon: warpIcon,
        },
        {
          name: 'Postman',
          icon: postmanIcon,
        },
      ],
    },
    {
      title: 'Visual',
      skills: [
        {
          name: 'DaVinci Resolve',
          icon: davinciResolveIcon,
        },
        {
          name: 'Lightroom',
          icon: lightroomIcon,
        },
      ],
    },
  ]

  return (
    <div className="space-y-8">
      <MotionDiv>
        <h2 className="mb-6 text-2xl font-bold text-foreground">My Skills</h2>
      </MotionDiv>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {data.map((category, categoryIndex) => (
          <MotionDiv key={categoryIndex} className="space-y-4">
            <Card className="h-full">
              <div className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-foreground">
                  {category.title}
                </h3>
                <MotionList className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <SkillBadge key={skill.name} {...skill} />
                  ))}
                </MotionList>
              </div>
            </Card>
          </MotionDiv>
        ))}
      </div>
    </div>
  )
}

function SkillBadge({ icon, name }: { icon: string; name: string }) {
  return (
    <Badge
      variant="secondary"
      className="flex items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-accent/80"
    >
      <div className="flex h-4 w-4 items-center justify-center">
        <Image
          src={icon}
          alt={name}
          width={16}
          height={16}
          className="h-4 w-4 object-contain"
        />
      </div>
      <span>{name}</span>
    </Badge>
  )
}

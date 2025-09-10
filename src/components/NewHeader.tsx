'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Menu, Sun, Moon, X } from 'lucide-react'

import { Container } from '@/components/Container'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import avatarImage from '@/images/profile.jpeg'
import { cn } from '@/lib/utils'

interface NavItem {
  name: string
  href: string
}

const navItems: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Now', href: '/now' },
  { name: 'Thoughts', href: '/articles' },
]

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const otherTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={mounted ? `Switch to ${otherTheme} theme` : 'Toggle theme'}
      onClick={() => setTheme(otherTheme)}
      className="h-8 w-8 rounded-full md:h-9 md:w-9"
    >
      <Sun className="h-3.5 w-3.5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 md:h-4 md:w-4" />
      <Moon className="absolute h-3.5 w-3.5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 md:h-4 md:w-4" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

function DesktopNavigation() {
  const pathname = usePathname()

  return (
    <NavigationMenu className="hidden md:block">
      <NavigationMenuList>
        {navItems.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink
              asChild
              className={cn(
                navigationMenuTriggerStyle(),
                'h-9 bg-transparent hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                pathname === item.href && 'bg-accent text-accent-foreground'
              )}
            >
              <Link href={item.href}>{item.name}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function MobileNavigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full md:h-9 md:w-9"
        >
          <Menu className="h-3.5 w-3.5 md:h-4 md:w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={avatarImage.src} alt="Profile" />
                <AvatarFallback>ST</AvatarFallback>
              </Avatar>
              <span className="font-semibold">Sherod Taylor</span>
            </div>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </SheetClose>
          </div>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                  pathname === item.href
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function ProfileAvatar({
  large = false,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href'> & {
  large?: boolean
}) {
  return (
    <Link
      href="/"
      aria-label="Home"
      className={cn('pointer-events-auto', className)}
      {...props}
    >
      <Avatar
        className={
          large ? 'h-12 w-12 md:h-16 md:w-16' : 'h-8 w-8 md:h-9 md:w-9'
        }
      >
        <AvatarImage src={avatarImage.src} alt="Profile" />
        <AvatarFallback>ST</AvatarFallback>
      </Avatar>
    </Link>
  )
}

function clamp(number: number, a: number, b: number) {
  const min = Math.min(a, b)
  const max = Math.max(a, b)
  return Math.min(Math.max(number, min), max)
}

export function NewHeader() {
  const isHomePage = usePathname() === '/'
  const headerRef = useRef<React.ElementRef<'div'>>(null)
  const avatarRef = useRef<React.ElementRef<'div'>>(null)
  const isInitial = useRef(true)

  useEffect(() => {
    const downDelay = avatarRef.current?.offsetTop ?? 0
    const upDelay = 64

    function setProperty(property: string, value: string) {
      document.documentElement.style.setProperty(property, value)
    }

    function removeProperty(property: string) {
      document.documentElement.style.removeProperty(property)
    }

    function updateHeaderStyles() {
      if (!headerRef.current) {
        return
      }

      const { top, height } = headerRef.current.getBoundingClientRect()
      const scrollY = clamp(
        window.scrollY,
        0,
        document.body.scrollHeight - window.innerHeight
      )

      if (isInitial.current) {
        setProperty('--header-position', 'sticky')
      }

      setProperty('--content-offset', `${downDelay}px`)

      if (isInitial.current || scrollY < downDelay) {
        setProperty('--header-height', `${downDelay + height}px`)
        setProperty('--header-mb', `${-downDelay}px`)
      } else if (top + height < -upDelay) {
        const offset = Math.max(height, scrollY - upDelay)
        setProperty('--header-height', `${offset}px`)
        setProperty('--header-mb', `${height - offset}px`)
      } else if (top === 0) {
        setProperty('--header-height', `${scrollY + height}px`)
        setProperty('--header-mb', `${-scrollY}px`)
      }

      if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
        setProperty('--header-inner-position', 'fixed')
        removeProperty('--header-top')
        removeProperty('--avatar-top')
      } else {
        removeProperty('--header-inner-position')
        setProperty('--header-top', '0px')
        setProperty('--avatar-top', '0px')
      }
    }

    function updateAvatarStyles() {
      if (!isHomePage) {
        return
      }

      const fromScale = 1
      const toScale = 36 / 64
      const fromX = 0
      const toX = 2 / 16

      const scrollY = downDelay - window.scrollY

      let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale
      scale = clamp(scale, fromScale, toScale)

      let x = (scrollY * (fromX - toX)) / downDelay + toX
      x = clamp(x, fromX, toX)

      setProperty(
        '--avatar-image-transform',
        `translate3d(${x}rem, 0, 0) scale(${scale})`
      )

      const borderScale = 1 / (toScale / scale)
      const borderX = (-toX + x) * borderScale
      const borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`

      setProperty('--avatar-border-transform', borderTransform)
      setProperty('--avatar-border-opacity', scale === toScale ? '1' : '0')
    }

    function updateStyles() {
      updateHeaderStyles()
      updateAvatarStyles()
      isInitial.current = false
    }

    updateStyles()
    window.addEventListener('scroll', updateStyles, { passive: true })
    window.addEventListener('resize', updateStyles)

    return () => {
      window.removeEventListener('scroll', updateStyles)
      window.removeEventListener('resize', updateStyles)
    }
  }, [isHomePage])

  return (
    <>
      <header
        className="relative z-50 flex flex-none flex-col"
        style={{
          height: 'var(--header-height)',
          marginBottom: 'var(--header-mb)',
        }}
      >
        {isHomePage && (
          <>
            <div
              ref={avatarRef}
              className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))] hidden md:block"
            />
            <Container
              className="top-0 order-last -mb-3 hidden pt-3 md:block"
              style={{
                position:
                  'var(--header-position)' as React.CSSProperties['position'],
              }}
            >
              <div
                className="top-[var(--avatar-top,theme(spacing.3))] w-full"
                style={{
                  position:
                    'var(--header-inner-position)' as React.CSSProperties['position'],
                }}
              >
                <div className="relative">
                  <div
                    className="absolute left-0 top-3 h-10 w-10 origin-left rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition-opacity dark:bg-zinc-800/90 dark:ring-white/10"
                    style={{
                      opacity: 'var(--avatar-border-opacity, 0)',
                      transform: 'var(--avatar-border-transform)',
                    }}
                  />
                  <ProfileAvatar
                    large
                    className="block h-16 w-16 origin-left"
                    style={{ transform: 'var(--avatar-image-transform)' }}
                  />
                </div>
              </div>
            </Container>
          </>
        )}
        <div
          ref={headerRef}
          className="top-0 z-10 h-12 pt-3 md:h-16 md:pt-6"
          style={{
            position:
              'var(--header-position)' as React.CSSProperties['position'],
          }}
        >
          <Container
            className="top-[var(--header-top,theme(spacing.3))] w-full md:top-[var(--header-top,theme(spacing.6))]"
            style={{
              position:
                'var(--header-inner-position)' as React.CSSProperties['position'],
            }}
          >
            <div className="relative flex items-center justify-between">
              {/* Mobile Layout: Hamburger - Portrait - Theme */}
              <div className="flex w-full items-center justify-between md:hidden">
                <MobileNavigation />
                <div className="rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10">
                  <ProfileAvatar />
                </div>
                <ThemeToggle />
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:flex md:w-full md:items-center md:justify-between">
                <div className="flex items-center">
                  {!isHomePage && (
                    <div className="rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10">
                      <ProfileAvatar />
                    </div>
                  )}
                </div>

                <div className="flex flex-1 items-center justify-center">
                  <DesktopNavigation />
                </div>

                <div className="flex items-center justify-end">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>
      {isHomePage && (
        <div
          className="hidden flex-none md:block"
          style={{ height: 'var(--content-offset)' }}
        />
      )}
    </>
  )
}

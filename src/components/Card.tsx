import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Card as ShadcnCard, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function Card<T extends React.ElementType = 'div'>({
  as,
  className,
  children,
}: Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className'> & {
  as?: T
  className?: string
}) {
  const Component = as ?? 'div'

  return (
    <Component className={cn('group relative', className)}>
      <ShadcnCard className="h-full border-0 bg-transparent shadow-none transition-all duration-200 group-hover:bg-accent/50">
        <CardContent className="flex flex-col items-start p-6">
          {children}
        </CardContent>
      </ShadcnCard>
    </Component>
  )
}

Card.Link = function CardLink({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link>) {
  return (
    <>
      <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-accent/0 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:bg-accent/50 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl" />
      <Link {...props} className="relative z-10">
        <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Link>
    </>
  )
}

Card.Title = function CardTitle<T extends React.ElementType = 'h2'>({
  as,
  href,
  children,
}: Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'href'> & {
  as?: T
  href?: string
}) {
  const Component = as ?? 'h2'

  return (
    <Component className="text-base font-semibold tracking-tight text-foreground">
      {href ? (
        <>
          <Link href={href} className="absolute inset-0 z-20">
            <span className="sr-only">{children}</span>
          </Link>
          <span className="relative z-10">{children}</span>
        </>
      ) : (
        children
      )}
    </Component>
  )
}

Card.Description = function CardDescription({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <p className="relative z-10 mt-2 text-sm text-muted-foreground">
      {children}
    </p>
  )
}

Card.Cta = function CardCta({ children }: { children: React.ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 mt-4 flex items-center text-sm font-medium text-primary transition-colors group-hover:text-primary/80"
    >
      {children}
      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
    </div>
  )
}

Card.Eyebrow = function CardEyebrow<T extends React.ElementType = 'p'>({
  as,
  decorate = false,
  className,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'decorate'> & {
  as?: T
  decorate?: boolean
}) {
  const Component = as ?? 'p'

  return (
    <Component
      className={cn(
        'relative z-10 order-first mb-3 flex items-center text-sm text-muted-foreground',
        decorate && 'pl-3.5',
        className
      )}
      {...props}
    >
      {decorate && (
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-4 w-0.5 rounded-full bg-border" />
        </span>
      )}
      {children}
    </Component>
  )
}

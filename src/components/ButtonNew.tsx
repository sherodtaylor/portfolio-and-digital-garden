import Link from 'next/link'
import {
  Button as ShadcnButton,
  ButtonProps as ShadcnButtonProps,
} from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Map your custom variants to shadcn/ui variants
const variantMapping = {
  primary: 'default' as const,
  secondary: 'secondary' as const,
}

type CustomButtonProps = {
  variant?: keyof typeof variantMapping
} & (
  | (Omit<ShadcnButtonProps, 'variant'> & { href?: undefined })
  | (Omit<React.ComponentPropsWithoutRef<typeof Link>, 'className'> & {
      className?: string
      variant?: keyof typeof variantMapping
    })
)

export function Button({
  variant = 'primary',
  className,
  ...props
}: CustomButtonProps) {
  const shadcnVariant = variantMapping[variant]

  // Handle Link rendering
  if ('href' in props && props.href !== undefined) {
    const { href, ...linkProps } = props
    return (
      <ShadcnButton
        asChild
        variant={shadcnVariant}
        className={cn('gap-2', className)}
      >
        <Link href={href} {...linkProps} />
      </ShadcnButton>
    )
  }

  // Handle button rendering
  return (
    <ShadcnButton
      variant={shadcnVariant}
      className={cn('gap-2', className)}
      {...(props as ShadcnButtonProps)}
    />
  )
}

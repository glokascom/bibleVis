import { Link } from '@nextui-org/link'
import { extendVariants } from '@nextui-org/system'

export const BVLink = extendVariants(Link, {
  variants: {
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      danger: 'text-danger',
    },
    size: {
      sm: 'text-small',
      md: 'text-medium font-[600]',
      lg: 'text-large',
    },
  },
  defaultVariants: {
    color: 'secondary',
    size: 'md',
    isBlock: false,
    underline: 'none',
    isDisabled: false,
  },
})

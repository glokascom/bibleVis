import { Button } from '@nextui-org/button'
import { extendVariants } from '@nextui-org/system'

export const BVButton = extendVariants(Button, {
  variants: {
    color: {
      primary: 'text-white bg-primary',
      secondary: 'text-white bg-secondary',
      danger: 'text-white bg-danger',
    },
    isDisabled: {
      true: 'opacity-70 cursor-not-allowed',
    },
    size: {
      md: 'h-auto px-7 py-4 text-medium font-[600] rounded-full',
      lg: 'h-auto px-7 py-4 text-large font-[600] rounded-full',
      xl: 'h-auto px-7 py-5 text-medium font-[500] rounded-medium',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
  },
  compoundVariants: [
    {
      isDisabled: true,
      color: 'primary',
      class: 'opacity-100 bg-secondary-50 text-secondary',
    },
  ],
})

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
      class: 'background-secondary-50 cursor-not-allowed',
    },
  ],
})

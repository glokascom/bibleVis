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
      md: 'h-auto px-7 py-4 text-base font-[600] rounded-full',
      lg: 'h-auto px-7 py-4 text-lg font-[600] rounded-full',
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

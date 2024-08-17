import { Avatar } from '@nextui-org/avatar'
import { extendVariants } from '@nextui-org/system'

export const BVAvatar = extendVariants(Avatar, {
  variants: {
    size: {
      sm: {
        base: 'w-9 h-9 text-tiny',
      },
      md: {
        base: 'w-12 h-12 text-tiny',
      },
      lg: {
        base: 'w-15 h-15 text-small',
      },
    },
  },
})

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
        base: 'w-14 h-14 text-small',
      },
      xl: {
        base: 'w-20 h-20 text-small',
      },
      xxl: {
        base: 'w-24 h-24 text-small',
      },
      mega: {
        base: 'w-36 h-36 text-small',
      },
    },
  },
})

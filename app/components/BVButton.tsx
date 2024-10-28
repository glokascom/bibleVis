import React from 'react'

import { Button, ButtonProps } from '@nextui-org/button'
import { Image } from '@nextui-org/react'
import { extendVariants } from '@nextui-org/system'
import { VariantProps } from '@nextui-org/theme'

const ExtendedButton = extendVariants(Button, {
  variants: {
    color: {
      primary: 'text-white bg-primary',
      secondary: 'text-white bg-secondary',
      danger: 'text-white bg-danger',
      default: 'text-foreground bg-secondary-50',
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

// Полиморфный реф: получение правильного типа рефа для указанного компонента
type PolymorphicRef<C extends React.ElementType> = React.Ref<
  C extends keyof JSX.IntrinsicElements
    ? JSX.IntrinsicElements[C] extends React.ComponentPropsWithRef<C>
      ? JSX.IntrinsicElements[C]['ref']
      : never
    : never
>

// Проп `as` для полиморфного компонента
type AsProp<C extends React.ElementType> = {
  as?: C
}

// Пропсы, которые нужно исключить
type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P)

// Полиморфные пропсы для компонента без рефа
type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = object,
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>

// Полиморфные пропсы для компонента с рефом
type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = object,
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> }

// Пропсы для кнопки BVButton
type BVButtonProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  ButtonProps &
    VariantProps<typeof ExtendedButton> & {
      startIcon?: React.ReactNode
      endIcon?: React.ReactNode
      isLoading?: boolean
    }
>

// Интерфейс компонента BVButton с рефом
interface BVButtonComponent
  extends React.ForwardRefExoticComponent<BVButtonProps<React.ElementType>> {
  displayName?: string
}

// Реализация компонента BVButton с использованием forwardRef
const BVButton = React.forwardRef(
  <C extends React.ElementType = 'button'>(
    { as, children, isLoading, startIcon, endIcon, ...otherProps }: BVButtonProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || 'button'
    return (
      <ExtendedButton
        as={Component}
        ref={ref}
        startContent={startIcon}
        endContent={endIcon}
        spinner={
          <Image
            removeWrapper
            height={24}
            width={24}
            property="true"
            src="/spinner.svg"
            alt="Loading spinner"
            radius="none"
          />
        }
        isLoading={isLoading}
        {...otherProps}
      >
        {children}
      </ExtendedButton>
    )
  }
) as BVButtonComponent

BVButton.displayName = 'BVButton'

export { BVButton }
export default BVButton

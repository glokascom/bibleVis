import React from 'react'

import { Button, ButtonProps } from '@nextui-org/button'
import { extendVariants } from '@nextui-org/system'
import { VariantProps } from '@nextui-org/theme'

const CustomSpinner = () => (
  <svg
    viewBox="-25 -25 100 100"
    preserveAspectRatio="xMidYMid meet"
    width="24"
    height="24"
  >
    <circle fill="currentColor" stroke="none" cx="6" cy="25" r="8">
      <animateTransform
        attributeName="transform"
        dur="1s"
        type="translate"
        values="0 15 ; 0 -15; 0 15"
        repeatCount="indefinite"
        begin="0.1"
      />
      <animate
        attributeName="opacity"
        dur="1s"
        values="0;1;0"
        repeatCount="indefinite"
        begin="0.1"
      />
    </circle>
    <circle fill="currentColor" stroke="none" cx="30" cy="25" r="8">
      <animateTransform
        attributeName="transform"
        dur="1s"
        type="translate"
        values="0 10 ; 0 -10; 0 10"
        repeatCount="indefinite"
        begin="0.2"
      />
      <animate
        attributeName="opacity"
        dur="1s"
        values="0;1;0"
        repeatCount="indefinite"
        begin="0.2"
      />
    </circle>
    <circle fill="currentColor" stroke="none" cx="54" cy="25" r="8">
      <animateTransform
        attributeName="transform"
        dur="1s"
        type="translate"
        values="0 5 ; 0 -5; 0 5"
        repeatCount="indefinite"
        begin="0.3"
      />
      <animate
        attributeName="opacity"
        dur="1s"
        values="0;1;0"
        repeatCount="indefinite"
        begin="0.3"
      />
    </circle>
  </svg>
)

const ExtendedButton = extendVariants(Button, {
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

type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref']

type AsProp<C extends React.ElementType> = {
  as?: C
}

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P)

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = object,
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>

type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = object,
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> }

type BVButtonProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  ButtonProps &
    VariantProps<typeof ExtendedButton> & {
      startIcon?: React.ReactNode
      endIcon?: React.ReactNode
    }
>

interface BVButtonComponent
  extends React.ForwardRefExoticComponent<BVButtonProps<React.ElementType>> {
  displayName?: string
}

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
        spinner={<CustomSpinner />}
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

import { Input } from '@nextui-org/input'
import { extendVariants } from '@nextui-org/system'

export const BVInput = extendVariants(Input, {
  slots: {
    label: [
      'absolute',
      'z-10',
      'pointer-events-none',
      'origin-top-left',
      'rtl:origin-top-right',
      'subpixel-antialiased',
      'block',
      'text-small',
      'text-foreground-500',
    ],
    mainWrapper: 'h-full',
    inputWrapper:
      'relative w-full inline-flex tap-highlight-transparent flex-row items-center',
    innerWrapper: 'inline-flex w-full items-center h-full box-border',
    input: [
      'w-full bg-transparent !outline-none focus-visible:outline-none',
      'data-[has-start-content=true]:ps-2',
      'data-[has-end-content=true]:pe-2',
      'file:cursor-pointer file:bg-transparent file:border-0',
      'autofill:bg-transparent bg-clip-text',
    ],
    helperWrapper:
      'hidden group-data-[has-helper=true]:flex p-1 relative flex-col gap-1.5',
    description: 'text-tiny text-foreground-400',
    errorMessage: 'text-tiny text-danger',
  },
  variants: {
    variant: {
      default: {
        inputWrapper: [
          'bg-secondary-50 border border-secondary-50 px-5 py-4 gap-3',
          'data-[hover=true]:bg-secondary-50',
          'data-[active=true]:bg-secondary-50 data-[active=true]:border-secondary-950',
          'group-data-[focus=true]:border-secondary-950 shadow-none',
        ],
        input: [' font-[600]'],
      },
    },
    color: {
      default: {},
      primary: {},
      secondary: {},
      danger: {},
    },
    size: {
      sm: {
        label: 'text-tiny',
        inputWrapper: 'h-auto p-0 rounded-medium',
        input: 'text-small p-4',
        clearButton: 'text-small',
      },
      md: {
        inputWrapper: 'h-auto p-0 rounded-medium',
        input: 'text-medium p-3.5',
        clearButton: 'text-medium',
      },
      lg: {
        inputWrapper: 'h-auto p-0 rounded-medium',
        input: 'text-large p-3',
        clearButton: 'text-large',
      },
    },
    radius: {
      sm: {
        inputWrapper: 'rounded-small',
      },
      md: {
        inputWrapper: 'rounded-medium',
      },
      lg: {
        inputWrapper: 'rounded-large',
      },
    },
    labelPlacement: {
      outside: {
        mainWrapper: 'flex flex-col',
      },
      'outside-left': {
        base: 'flex-row items-center flex-nowrap data-[has-helper=true]:items-start',
        inputWrapper: 'flex-1',
        mainWrapper: 'flex flex-col',
        label: 'relative text-foreground pr-2 rtl:pr-0 rtl:pl-2',
      },
      inside: {
        label: 'text-tiny cursor-text',
        inputWrapper: 'flex-col items-start justify-center gap-0',
        innerWrapper: 'group-data-[has-label=true]:items-end',
      },
    },
    isClearable: {
      true: {
        input: 'peer pr-6 rtl:pr-0 rtl:pl-6',
        clearButton: 'peer-data-[filled=true]:opacity-70 peer-data-[filled=true]:block',
      },
    },
    isMultiline: {
      true: {
        label: 'relative',
        inputWrapper: '!h-auto',
        innerWrapper: 'items-start group-data-[has-label=true]:items-start',
        input: 'resize-none data-[hide-scroll=true]:scrollbar-hide',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    color: 'default',
    size: 'md',
    radius: 'md',
    fullWidth: true,
    labelPlacement: 'outside',
    isDisabled: false,
    isMultiline: false,
  },
  compoundVariants: [
    {
      labelPlacement: ['inside', 'outside'],
      class: {
        label: ['group-data-[filled-within=true]:pointer-events-auto'],
      },
    },
    // labelPlacement=[outside] & isMultiline
    {
      labelPlacement: 'outside',
      isMultiline: false,
      class: {
        base: 'group relative justify-end',
        label: [
          'pb-0',
          'z-20',
          'top-1/2',
          '-translate-y-1/2',
          'group-data-[filled-within=true]:left-0',
        ],
      },
    },
    // outside & size
    {
      labelPlacement: 'outside',
      size: 'md',
      isMultiline: false,
      class: {
        label: [
          'left-3',
          'rtl:left-auto',
          'rtl:right-3',
          'text-small',
          'group-data-[filled-within=true]:-translate-y-[calc(100%_+_theme(fontSize.small)/2_+_20px)]',
        ],
        base: 'data-[has-label=true]:mt-[calc(theme(fontSize.small)_+_10px)]',
      },
    },
    {
      labelPlacement: 'outside-left',
      size: 'md',
      class: {
        label: 'group-data-[has-helper=true]:pt-3',
      },
    },
    // labelPlacement=[outside, outside-left] & isMultiline
    {
      labelPlacement: ['outside', 'outside-left'],
      isMultiline: true,
      class: {
        inputWrapper: 'py-2',
      },
    },
    // isMultiline & labelPlacement="outside"
    {
      labelPlacement: 'outside',
      isMultiline: true,
      class: {
        label: 'pb-1.5',
      },
    },
    // text truncate labelPlacement=[inside,outside]
    {
      labelPlacement: ['inside', 'outside'],
      class: {
        label: ['pe-2', 'max-w-full', 'text-ellipsis', 'overflow-hidden'],
      },
    },
  ],
})

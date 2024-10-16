import { ComponentProps } from 'react'

export default function CloseIcon({
  color = 'currentColor',
  ...props
}: {
  color?: string & ComponentProps<'svg'>
}) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2 2L8 8M14 14L8 8M8 8L14 2L2 14"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

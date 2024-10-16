import { ComponentProps } from 'react'

export default function ArrowDownIcon({
  color = 'currentColor',
  ...props
}: {
  color?: string & ComponentProps<'svg'>
}) {
  return (
    <svg
      width="25"
      height="15"
      viewBox="0 0 25 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="0.785156" width="24" height="3" rx="1.5" fill={color} />
      <rect x="0.785156" y="6" width="24" height="3" rx="1.5" fill={color} />
      <rect x="0.785156" y="12" width="24" height="3" rx="1.5" fill={color} />
    </svg>
  )
}

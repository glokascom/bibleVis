export const Chevron = ({ fill = 'currentColor', filled, ...props }) => {
  return (
    <svg
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill={filled ? fill : 'none'}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.5 1.75L6 6.25L10.5 1.75"
        stroke={fill}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  )
}

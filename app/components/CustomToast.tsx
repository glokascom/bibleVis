export interface CustomToastProps {
  message: string
  type: 'success' | 'error' | 'neutral'
}

const CustomToast: React.FC<CustomToastProps> = ({ message, type }) => {
  let backgroundColor, backgroundIconColor

  switch (type) {
    case 'success':
      backgroundColor = 'bg-[#01AB6C4D]'
      backgroundIconColor = '#10CD87'
      break
    case 'error':
      backgroundColor = 'bg-[#AB01014D]'
      backgroundIconColor = '#EA4F57'
      break
    case 'neutral':
    default:
      backgroundColor = 'bg-[#96969680]'
      backgroundIconColor = '#2D2D2E'
      break
  }

  return (
    <div
      className={`flex w-full max-w-xs items-center justify-between rounded-lg p-4 shadow-md ${backgroundColor} min-h-[50px] min-w-[356px]`}
    >
      <div className="mr-4 h-full w-[2px] rounded bg-white"></div>
      <div className="flex-grow text-sm font-medium text-white">{message}</div>
      <div className="ml-4 p-1">
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse
            cx="13"
            cy="13"
            rx="13"
            ry="13"
            transform="rotate(-180 13 13)"
            fill={backgroundIconColor}
          />
          <path
            d="M10 10L13 13M16 16L13 13M13 13L16 10L10 16"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}

export default CustomToast

import { toast } from 'react-hot-toast'

export interface CustomToastProps {
  message: string
  type: 'success' | 'error' | 'neutral'
}

const CustomToast: React.FC<CustomToastProps & { id: string }> = ({
  message,
  type,
  id,
}) => {
  let backgroundColor, backgroundIconColor
  switch (type) {
    case 'success':
      backgroundColor = 'bg-primary-400/30'
      backgroundIconColor = 'text-primary-500'
      break
    case 'error':
      backgroundColor = 'bg-danger-400/30'
      backgroundIconColor = 'text-danger-500'
      break
    case 'neutral':
    default:
      backgroundColor = 'bg-secondary-400/50'
      backgroundIconColor = 'text-secondary'
      break
  }

  return (
    <div
      className={`flex w-full max-w-md items-center justify-between rounded-lg p-4 shadow-md ${backgroundColor} min-h-[50px] min-w-80 backdrop-blur-2xl`}
    >
      <div className="flex-grow border-l-1 border-background pl-2.5 font-sans text-sm font-medium text-background">
        {message}
      </div>
      <div
        className={`ml-4 p-1 ${backgroundIconColor} cursor-pointer`}
        onClick={() => {
          toast.remove(id)
        }}
      >
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
            fill="currentColor"
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
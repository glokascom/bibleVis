export interface CustomToastProps {
  message: string
  type: 'success' | 'error' | 'neutral'
}

const CustomToast: React.FC<CustomToastProps> = ({ message, type }) => {
  let backgroundColor, backgroundIconColor

  switch (type) {
    case 'success':
      backgroundColor = 'bg-[#01AB6C4D]'
      backgroundIconColor = 'bg-[#10CD87]'
      break
    case 'error':
      backgroundColor = 'bg-[#AB01014D]'
      backgroundIconColor = 'bg-[#EA4F57]'
      break
    case 'neutral':
    default:
      backgroundColor = 'bg-[#96969680]'
      backgroundIconColor = 'bg-[#2D2D2E]'
      break
  }

  return (
    <div
      className={`flex w-full max-w-xs items-center justify-between rounded-lg p-4 shadow-md ${backgroundColor} min-h-[56px]`}
    >
      <div className="mr-4 h-full w-[2px] rounded bg-white"></div>
      <div className="flex-grow font-medium text-white">{message}</div>
      <div className={`ml-4 rounded-full text-white ${backgroundIconColor} p-1`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-current"
          viewBox="0 0 24 24"
          fill="currentColor"
          strokeWidth="2"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.225 4.811a1 1 0 011.414 0L12 9.172l4.361-4.36a1 1 0 011.415 1.414L13.414 10.586l4.362 4.361a1 1 0 01-1.415 1.415L12 12l-4.361 4.362a1 1 0 01-1.415-1.415L10.586 10.586 6.225 6.225a1 1 0 010-1.414z"
          />
        </svg>
      </div>
    </div>
  )
}

export default CustomToast

export function Button({ onClick, children }) {
  return (
    <button className="rounded-lg bg-blue-500 px-4 py-2 text-white" onClick={onClick}>
      {children}
    </button>
  )
}

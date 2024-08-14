const AuthButton = ({ name, type, label, className }) => (
  <button
    name={name}
    type={type}
    className={`rounded-md px-4 py-2 text-white ${className}`}
  >
    {label}
  </button>
)

export default AuthButton

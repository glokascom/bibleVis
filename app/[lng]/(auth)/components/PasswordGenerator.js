import generatePassword from '../../../utils/generatePassword'

const PasswordGenerator = ({ onGenerate }) => {
  const handleGeneratePassword = () => {
    const generatedPassword = generatePassword()
    if (onGenerate) {
      onGenerate(generatedPassword)
    }
  }

  return (
    <button
      type="button"
      onClick={handleGeneratePassword}
      className="mt-2 rounded-md bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
    >
      Generate a password
    </button>
  )
}

export default PasswordGenerator

export default function PasswordStrengthMeter({ password }) {
  const calculateStrength = () => {
    if (password.length === 0) {
      return { message: '', strength: '', color: 'gray' }
    }

    if (password.length < 6) {
      return {
        message: 'The password must be at least 6 characters',
        strength: 'low',
        color: 'red',
      }
    }

    let strengthPoints = 0

    if (/[a-z]/.test(password)) strengthPoints++
    if (/[A-Z]/.test(password)) strengthPoints++
    if (/\d/.test(password)) strengthPoints++
    if (/[^\w]/.test(password)) strengthPoints++

    if (password.length >= 6 && strengthPoints === 1) {
      return {
        message: 'Include at least one number and letter for better security.',
        strength: 'poor',
        color: 'red',
      }
    }

    if (password.length >= 7 && strengthPoints >= 2 && password.length <= 10) {
      return {
        message:
          'Include both uppercase and lowercase letters, numbers, and special characters.',
        strength: 'moderate',
        color: 'yellow',
      }
    }

    if (password.length >= 11) {
      if (strengthPoints === 3) {
        return {
          message:
            'Include a mix of uppercase, lowercase, numbers, and special characters for maximum security.',
          strength: 'strong',
          color: 'green',
        }
      } else {
        return {
          message: '',
          strength: 'strong',
          color: 'green',
        }
      }
    }

    return { message: '', strength: '', color: 'gray' }
  }

  const { message, strength, color } = calculateStrength()

  return (
    <div className="flex flex-col space-y-2">
      <div className="h-2 w-full rounded-full bg-gray-200">
        <div
          className={`h-2 rounded-full ${
            color === 'red'
              ? 'w-1/4 bg-red-500'
              : color === 'yellow'
                ? 'w-2/4 bg-yellow-500'
                : color === 'green'
                  ? 'w-full bg-green-500'
                  : 'w-0'
          }`}
        ></div>
      </div>

      <div className="flex flex-col">
        <span className="font-sans font-semibold text-secondary-600">
          Strength{' '}
          <span
            className={`${
              color === 'red'
                ? 'text-red-500'
                : color === 'yellow'
                  ? 'text-yellow-500'
                  : 'text-green-500'
            }`}
          >
            {strength ? strength : ''}
          </span>
        </span>
        <span className="font-sans text-sm text-secondary-400">{message}</span>
      </div>
    </div>
  )
}

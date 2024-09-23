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

    if (strengthPoints === 1) {
      return {
        message: 'Include at least one number and letter for better security.',
        strength: 'poor',
        color: 'red',
      }
    }

    if (strengthPoints === 2) {
      return {
        message:
          'Include both uppercase and lowercase letters, numbers, and special characters.',
        strength: 'moderate',
        color: 'yellow',
      }
    }

    if (strengthPoints === 3) {
      return {
        message:
          'Include a mix of uppercase, lowercase, numbers, and special characters for maximum security.',
        strength: 'strong',
        color: 'green',
      }
    }

    if (strengthPoints > 3) {
      return {
        message: '',
        strength: 'strong',
        color: 'green',
      }
    }

    return { message: '', strength: '', color: 'gray' }
  }

  const { message, strength, color } = calculateStrength()

  return (
    <div className="flex flex-col space-y-2">
      <div className="h-2 w-full rounded-full bg-secondary-50">
        <div
          className={`h-2 rounded-full ${
            color === 'red'
              ? 'w-1/4 bg-danger'
              : color === 'yellow'
                ? 'w-2/4 bg-warning'
                : color === 'green'
                  ? 'w-full bg-primary'
                  : 'w-0'
          }`}
        ></div>
      </div>

      {(strength !== 'strong' || (strength === 'strong' && message)) &&
        color !== 'gray' && (
          <div className="flex flex-col">
            <span className="font-sans font-semibold text-secondary-600">
              Strength{' '}
              <span
                className={`${
                  color === 'red'
                    ? 'text-danger'
                    : color === 'yellow'
                      ? 'text-warning'
                      : 'text-primary'
                }`}
              >
                {strength}
              </span>
            </span>
            <span className="font-sans text-sm text-secondary-400">{message}</span>
          </div>
        )}
    </div>
  )
}

import { useMemo } from 'react'

export default function PasswordStrengthMeter({ password }) {
  const getPasswordStrength = () => {
    const allowedPattern = /^[A-Za-z0-9!@#$%^&*(),.?":{}|<>[\]\\/'`~+=-]+$/

    if (password.length === 0) return { strength: '', message: '', color: 'gray' }

    if (!allowedPattern.test(password)) {
      return {
        strength: 'invalid',
        message:
          'Password can contain only Latin letters, numbers, and specific symbols.',
        color: 'red',
      }
    }
    if (password.length < 6)
      return { strength: 'low', message: 'At least 6 characters', color: 'red' }

    let strengthPoints = 0

    if (/[a-z]/.test(password)) strengthPoints++
    if (/[A-Z]/.test(password)) strengthPoints++
    if (/\d/.test(password)) strengthPoints++
    if (/[!@#$%^&*(),.?":{}|<>[\]\\/'`~\-+=]/.test(password)) {
      strengthPoints++
    }

    const strengthLevels = {
      1: {
        strength: 'poor',
        message: 'Add letters and numbers for better security.',
        color: 'red',
      },
      2: {
        strength: 'moderate',
        message: 'Include uppercase, lowercase, numbers, and symbols.',
        color: 'yellow',
      },
      3: {
        strength: 'strong',
        message:
          'Include a mix of uppercase, lowercase, numbers, and special characters for maximum security.',
        color: 'green',
      },
      4: { strength: 'strong', message: '', color: 'green' },
    }

    return strengthLevels[strengthPoints] || { strength: '', message: '', color: 'gray' }
  }

  const { strength, message, color } = useMemo(getPasswordStrength, [password])

  const colorClasses = {
    red: 'w-1/4 bg-danger',
    yellow: 'w-2/4 bg-[#EAB54F]',
    green: 'w-full bg-primary',
    gray: 'w-0',
  }

  return (
    <div className="flex flex-col space-y-2">
      <div className="h-2 w-full rounded-full bg-secondary-50">
        <div
          className={`h-2 rounded-full transition-all duration-300 ease-in-out ${colorClasses[color]}`}
        ></div>
      </div>

      {message && color !== 'gray' && (
        <div className="flex flex-col">
          <span className="font-sans font-semibold text-secondary-600">
            Strength{' '}
            <span
              className={
                color === 'red'
                  ? 'text-danger'
                  : color === 'yellow'
                    ? 'text-[#EAB54F]'
                    : 'text-primary'
              }
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

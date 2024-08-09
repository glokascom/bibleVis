'use client'

import { useRef, useState } from 'react'

import { generatePassword } from '../utils'
import LoginData from './LoginData'

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const passwordInputRef = useRef(null)

  const handleGeneratePassword = () => {
    const generatedPassword = generatePassword()
    if (passwordInputRef.current) {
      passwordInputRef.current.value = generatedPassword
      setPassword(generatedPassword)
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 dark:bg-gray-800">
      <LoginData
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        toggleShowPassword={toggleShowPassword}
        passwordInputRef={passwordInputRef}
        handleGeneratePassword={handleGeneratePassword}
      />
    </div>
  )
}

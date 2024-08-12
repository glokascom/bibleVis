'use client'

export async function forgotPassword(formData) {
  const data = {
    email: formData.get('email'),
  }

  try {
    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      window.location.href = '/password-reset-sent'
    } else {
      const errorUrl = `/error?message=${encodeURIComponent(result.error || 'An unknown error occurred.')}`
      window.location.href = errorUrl
    }
  } catch (error) {
    console.error('Request error:', error)
    const errorUrl = `/error?message=${encodeURIComponent(error.message || 'An unknown error occurred.')}`
    window.location.href = errorUrl
  }
}

export async function login(formData) {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      window.location.href = '/private'
    } else {
      const errorUrl = `/error?message=${encodeURIComponent(result.error || 'An unknown error occurred.')}`
      window.location.href = errorUrl
    }
  } catch (error) {
    console.error('Request error:', error)
    const errorUrl = `/error?message=${encodeURIComponent(error.message || 'An unknown error occurred.')}`
    window.location.href = errorUrl
  }
}

export async function signup(formData) {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      window.location.href = '/check-email'
    } else {
      const errorUrl = `/error?message=${encodeURIComponent(result.error || 'An unknown error occurred.')}`
      window.location.href = errorUrl
    }
  } catch (error) {
    console.error('Request error:', error)
    const errorUrl = `/error?message=${encodeURIComponent(error.message || 'An unknown error occurred.')}`
    window.location.href = errorUrl
  }
}

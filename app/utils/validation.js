import { Filter } from 'bad-words'

const filter = new Filter()

const prohibitedBiblicalNames = ['Jesus', 'Moses', 'God', 'Lord']

export const validateLength = (username) => {
  if (username.length < 5 || username.length > 20) {
    return 'Username must be between 5 and 20 characters long.'
  }
  return null
}

export const validateCharacters = (username) => {
  const validUsernameRegex = /^[a-zA-Z][a-zA-Z0-9_-]*$/
  if (!validUsernameRegex.test(username)) {
    return 'Only letters A-Z, a-z, numbers, underscores, or hyphens are allowed. Username must start with a letter and cannot contain spaces or consecutive special characters.'
  }
  return null
}

export const validateContent = (username) => {
  if (
    filter.isProfane(username) ||
    prohibitedBiblicalNames.some((name) => new RegExp(name, 'i').test(username))
  ) {
    return 'This username contains inappropriate or prohibited language (e.g., biblical names). Please choose a different one.'
  }
  return null
}

export const checkUsernameAvailability = async (username, supabaseService) => {
  const { data: existingUsers, error: searchError } = await supabaseService
    .from('users')
    .select('*')
    .eq('username', username)

  if (searchError) {
    return { error: 'Error searching for existing username: ' + searchError.message }
  }

  if (existingUsers.length > 0) {
    return { error: 'This username is already taken.' }
  }
  return { error: null }
}

export const validateEmail = (email) => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Unsupported email format'
  }
  return null
}

export const validateUsername = (username) => {
  const errors = []

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.push(
      'Only letters A-Z, a-z, numbers or underscore please (no spaces or special characters).'
    )
  }

  if (username.length < 5 || username.length > 20) {
    errors.push('Username must be between 5 and 20 characters long.')
  }

  return errors.length ? errors : null
}

export const validatePassword = (password) => {
  const errors = []

  if (password.length < 6) {
    errors.push('The password must be at least 6 characters')
  }

  let validGroups = 0
  if (/\d/.test(password)) validGroups++
  if (/[a-z]/.test(password)) validGroups++
  if (/[A-Z]/.test(password)) validGroups++
  if (/[^\w]/.test(password)) validGroups++

  if (validGroups < 2) {
    errors.push(
      'The password must contain at least 2 groups: digits, lowercase letters, uppercase letters, special characters'
    )
  }

  return errors.length ? errors : null
}

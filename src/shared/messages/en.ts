export const fieldSizeMessage = (min: number | null, max?: number): string => {
  if (min != null && max != null) {
    return `Field needs to be between ${min} and ${max} characters long`
  }
  if (min != null) {
    return `Field needs to be at least ${min} characters long`
  }
  if (max != null) {
    return `Field needs to be less than ${max} characters long`
  }
  return ''
}

export const requiredMessage = 'Required field'

export const unauthenticatedUser = 'User not authenticated'
export const unauthorizedUser = 'User not authorized'
export const internalError = 'Internal error'

export const emailNotUnique = 'Email address already used.'
export const userCredsMatch = 'Email or password does not match.'
export const emailNotValid = 'Email provided is not valid'
export const weakPassword = 'Password is too weak'

export const notFound = (resource: string): String => `${resource} not found`

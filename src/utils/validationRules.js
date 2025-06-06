export const validationRules = {
  required: (value) => {
    if (!value || value.trim() === '') return 'This field is required.'
    return ''
  },
  minLength: (min) => (value) => {
    if (value.length < min) return `Minimum length is ${min} characters.`
    return ''
  },
  maxLength: (max) => (value) => {
    if (value.length > max) return `Maximum length is ${max} characters.`
    return ''
  },
  email: (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(value)) return 'Please enter a valid email address.'
    return ''
  },
  noNumbers: (value) => {
    if (/\d/.test(value)) return 'Numbers are not allowed.'
    return ''
  },
  noLetters: (value) => {
    if (/[a-zA-Z]/.test(value)) return 'Letters are not allowed.'
    return ''
  }
}

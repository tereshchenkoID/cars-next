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
}

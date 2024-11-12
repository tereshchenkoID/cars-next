export const getFormatNumber = (locale, data) => {
  return data.toLocaleString(locale || 'en-US').replace(/,/g, ' ')
}
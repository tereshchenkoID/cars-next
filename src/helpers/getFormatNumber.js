export const getFormatNumber = (locale, data) => {
  return Number(data).toLocaleString(locale || 'en-US').replace(/,/g, ' ')
}
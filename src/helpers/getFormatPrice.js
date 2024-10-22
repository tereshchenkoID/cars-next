export const getFormatPrice = (locale, currency, amount) => {
  return new Intl.NumberFormat(locale || 'en-IN', {
    style: 'currency',
    currency: currency || 'USD',
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0,
  }).format(amount)
}
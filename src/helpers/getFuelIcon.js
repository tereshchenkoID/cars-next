export const getFuelIcon = (data) => {
  switch (data) {
    case '3':
      return 'electric'
    case '6':
      return 'hybrid'    
    default:
      return 'petrol'
  }
}
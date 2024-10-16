import { TYPES, DEFAULT } from '@/constant/config'

export const getSearch = (data, type, key, value) => {  
  if (TYPES.includes(type)) {
    if (value === DEFAULT) {
      data[key].value = [DEFAULT]
    } else {
      if (data[key].value.includes(DEFAULT)) {
        data[key].value = []
      }

      if (data[key].value.includes(value)) {
        data[key].value = data[key].value.filter(item => item !== value)
      } else {
        data[key].value = [...data[key].value, value]
      }
    }

    if (data[key].value.length === 0) {
      data[key].value = [DEFAULT]
    }
  } else {
    const lastIndex = data[key].value.length - 1

    if (value.length === 0) {
      data[key].value[lastIndex] = DEFAULT
    } else {
      data[key].value[lastIndex] = value
    }
  }

  return data
}
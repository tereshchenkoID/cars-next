import { TYPES, DEFAULT } from 'constant/config'

export const getSearch = (data, type, key, value) => {
  const isDefaultValue = (arr) => arr.length === 0 || arr.includes(DEFAULT)

  if (TYPES.includes(type)) {
    let values = data[key].value

    if (value === DEFAULT) {
      data[key].value = [DEFAULT]
    }
    else {
      values = values.filter((item) => item !== value && item !== DEFAULT)
      if (!data[key].value.includes(value)) values.push(value)
      data[key].value = isDefaultValue(values) ? [DEFAULT] : values
    }
  }
  else {
    const lastIndex = data[key].value.length - 1
    data[key].value[lastIndex] = value.length === 0 ? DEFAULT : value
  }

  return data
}

import { PhoneInput } from 'react-international-phone'

import 'react-international-phone/style.css'
import Label from 'components/Label'

import style from './index.module.scss'

const Phone = ({
  data,
  onChange,
  isRequired = false,
  isLabel = false,
  label = null
}) => {
  return (
    <div className={style.block}>
      {
        isLabel &&
        <Label
          data={label}
          isRequired={isRequired}
        />
      }
      <PhoneInput
        defaultCountry="ua"
        value={data}
        onChange={value => {
          onChange(value)
        }}
        required={isRequired}
      />
    </div>
  )
}

export default Phone

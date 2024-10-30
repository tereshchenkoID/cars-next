import { PhoneInput } from 'react-international-phone'

import 'react-international-phone/style.css'

import style from './index.module.scss'

const Phone = ({ data, onChange }) => {
  return (
    <div className={style.block}>
      <PhoneInput
        defaultCountry="ua"
        value={data}
        onChange={value => {
          onChange(value)
        }}
      />
    </div>
  )
}

export default Phone
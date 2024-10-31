import { useTranslations } from 'next-intl'
import { useState } from 'react'

import Checkbox from '@/components/Checkbox'

import style from '../index.module.scss'

const Notification = () => {
  const t = useTranslations()
  const [filter, setFilter] = useState({
    favorite: '0',
    saved: '0'
  })

  const handleChange = (field, value) => {
    setFilter((prevData) => ({
      ...prevData,
      [field]: value,
    }))

    handleSubmit()
  }

  const handleSubmit = () => {
    alert("Send")
  }

  return (
    <div className={style.form}>
      {/* <pre className={style.pre}>{JSON.stringify(filter, null, 2)}</pre> */}
      <div className={style.group}>
        <div>
          <h6>Favourite vehicles</h6>
          <p>Send notifications about discounts on favourite vehicles</p>
        </div>
        <Checkbox
          data={filter.favorite}
          onChange={(value) => handleChange('favorite', value)}
        />
      </div>
      <div className={style.group}>
        <div>
          <h6>Saved searches</h6>
          <p>Send notifications of new offers based on saved search filters.</p>
        </div>
        <Checkbox
          data={filter.saved}
          onChange={(value) => handleChange('saved', value)}
        />
      </div>
    </div>
  )
}

export default Notification
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import classNames from 'classnames'

import Button from '@/components/Button'
import Password from '@/components/Password'

import style from '../index.module.scss'

const Security = () => {
  const t = useTranslations()
  const [filter, setFilter] = useState({
    old: '',
    new: '',
  })

  const handleChange = (field, value) => {
    setFilter((prevData) => ({
      ...prevData,
      [field]: value,
    }))
  }

  return (
    <form className={style.form}>
      {/* <pre className={style.pre}>{JSON.stringify(filter, null, 2)}</pre> */}
      <div className={style.grid}>
        <div>
          <span className={style.label}>{t('current_password')}</span>
          <Password
            placeholder={t('current_password')}
            data={filter.old}
            onChange={(value) => handleChange('old', value)}
          />
        </div>
        <div>
          <span className={style.label}>{t('new_password')}</span>
          <Password
            placeholder={t('new_password')}
            data={filter.new}
            onChange={(value) => handleChange('new', value)}
          />
        </div>
      </div>
      <div 
        className={
          classNames(
            style.grid,
            style.lg
          )
        }
      >
        <Button
          type="submit"
          classes={['primary', 'wide', style.submit]}
          placeholder={t('save')}
        />
      </div>
    </form>
  )
}

export default Security
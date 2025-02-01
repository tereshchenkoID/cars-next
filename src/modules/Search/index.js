"use client"

import { useTranslations } from 'next-intl'
import { useState } from 'react'

import Field from '@/components/Field'
import Button from '@/components/Button'

import style from './index.module.scss'

const Search = () => {
  const t = useTranslations()
  const [data, setData] = useState('')

  return (
    <form className={style.block}>
      <Field
        placeholder={t('search')}
        data={data}
        onChange={(e) => setData(e)}
      />
      <Button
        type={'submit'}
        classes={['primary', 'sm']}
        placeholder={t('actions.send')}
      />
    </form>
  )
}

export default Search

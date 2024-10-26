import { useTranslations } from 'next-intl'

import Button from '@/components/Button'

import style from './index.module.scss'

const Favorites = ({ data }) => {
  const t = useTranslations()

  return (
    <Button
      icon={'heart'}
      classes={['reference', 'sm', style.link]}
      placeholder={(t('favorites'))}
    />
  )
}

export default Favorites
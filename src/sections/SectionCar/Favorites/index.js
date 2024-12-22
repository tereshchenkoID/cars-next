import { useTranslations } from 'next-intl'

import Button from '@/components/Button'

import style from './index.module.scss'

const Favorites = ({ data }) => {
  const t = useTranslations()

  return (
    <Button
      icon={data.is_favorite === '0' ? 'heart' : 'heart-filled'}
      classes={['reference', 'sm', style.link]}
      placeholder={(t('favorites'))}
    />
  )
}

export default Favorites
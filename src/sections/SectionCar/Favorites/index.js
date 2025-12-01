import { useTranslations } from 'next-intl'

import { useFavourite } from 'hooks/useFavourite'

import Button from 'components/Button'

const Favorites = ({ data }) => {
  const t = useTranslations()
  const { favorites, toggleFavorite } = useFavourite(
    data.is_favorite,
    data.id,
  )

  return (
    <Button
      icon={favorites === '0' ? 'heart' : 'heart-filled'}
      classes={['reference', 'sm']}
      placeholder={t('favorites')}
      onChange={() => toggleFavorite(favorites === '0' ? '0' : '1')}
    />
  )
}

export default Favorites

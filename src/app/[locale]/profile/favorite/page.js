import { useTranslations } from 'next-intl'

import { ROUTES_USER } from '@/constant/config'

const Favorite = () => {
  const t = useTranslations()

  return (
    <div>
      {t(ROUTES_USER.favorite.text)}
    </div>
  )
}

export default Favorite
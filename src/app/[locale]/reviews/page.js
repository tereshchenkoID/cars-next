import { useTranslations } from 'next-intl'

import { NAVIGATION } from '@/constant/config'

const Reviews = () => {
  const t = useTranslations()

  return (
    <div>
      {t(NAVIGATION.reviews.text)}
    </div>
  )
}

export default Reviews
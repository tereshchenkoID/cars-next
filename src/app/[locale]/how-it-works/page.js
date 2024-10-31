import { useTranslations } from 'next-intl'

import { NAVIGATION } from '@/constant/config'

const HowItWorks = () => {
  const t = useTranslations()

  return (
    <div>
      {t(NAVIGATION.how_it_works.text)}
    </div>
  )
}

export default HowItWorks
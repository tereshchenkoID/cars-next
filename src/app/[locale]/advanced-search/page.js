import { useTranslations } from 'next-intl'

import { NAVIGATION } from '@/constant/config'

const AdvancedSearch = () => {
  const t = useTranslations()

  return (
    <div>
      {t(NAVIGATION.advanced_search.text)}
    </div>
  )
}

export default AdvancedSearch
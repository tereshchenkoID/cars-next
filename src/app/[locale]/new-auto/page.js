import { useTranslations } from 'next-intl'

import { NAVIGATION } from '@/constant/config'

const NewAuto = () => {
  const t = useTranslations()

  return (
    <div>
      {t(NAVIGATION.new_auto.text)}
    </div>
  )
}

export default NewAuto
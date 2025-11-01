import { useTranslations } from 'next-intl'

import { NAVIGATION } from 'constant/config'

const About = () => {
  const t = useTranslations()

  return (
    <div>
      {t(NAVIGATION.about_us.text)}
    </div>
  )
}

export default About

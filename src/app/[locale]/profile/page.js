import { useTranslations } from 'next-intl'

import { ROUTES_USER } from '@/constant/config'

const Profile = () => {
  const t = useTranslations()

  return (
    <div>
      {t(ROUTES_USER.profile.text)}
    </div>
  )
}

export default Profile
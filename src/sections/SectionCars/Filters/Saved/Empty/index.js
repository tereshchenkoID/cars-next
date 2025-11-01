import { useTranslations } from 'next-intl'

import Image from 'next/image'
import Button from 'components/Button'

import style from './index.module.scss'

const Empty = ({ isAuth, handleAction }) => {
  const t = useTranslations()

  return (
    <>
      <Image
        width={327}
        height={262}
        className={style.decor}
        src={`/images/saved-filters.svg`}
        priority={true}
        alt={'Saved filters'}
      />
      <p className={style.text}>{t('notification.saved_filters')}</p>
      {
        !isAuth &&
        <Button
          classes={['primary', 'wide', style.button]}
          placeholder={t('login')}
          onChange={handleAction}
        />
      }
    </>
  )
}

export default Empty

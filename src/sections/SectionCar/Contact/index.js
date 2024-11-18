import { useTranslations } from 'next-intl'

import { NAVIGATION } from '@/constant/config'

import { getDate } from '@/helpers/getDate'

import Link from 'next/link'
import Avatar from '@/modules/Avatar'
import Icon from '@/components/Icon'

import style from './index.module.scss'

const Contact = ({ data }) => {
  const t = useTranslations()

  return (
    <div className={style.block}>
      <Avatar
        size={'lg'}
        src={data.logo}
        alt={data.name}
      />
      <div className={style.content}>
        <h6>
          <Link
            href={`${NAVIGATION.home.link}`}
            rel="noreferrer"
            className={style.link}
            aria-label={data.name}
            title={data.name}
          >
            {data.name}
          </Link>
        </h6>
        <p>Rate: {data.rating}</p>
        <p>Offers: {data.offers}</p>
        <p className={style.date}>Registration: {getDate(data.registration, 3)}</p>
        <p className={style.date}>Last activity: {getDate(data.activity, 3)}</p>
        <div className={style.phones}>
          {
            data.phone.map((el, idx) =>
              <p key={idx}>{el}</p>
            )
          }
        </div>
        <div className={style.socials}>
          {
            data.social.map((el, idx) =>
              <Link
                key={idx}
                href={el.url}
                rel="noreferrer"
                className={style.social}
                aria-label={data.text}
                title={data.text}
              >
                <Icon 
                  iconName={el.text}
                  width={18}
                  height={18}
                />
              </Link>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Contact
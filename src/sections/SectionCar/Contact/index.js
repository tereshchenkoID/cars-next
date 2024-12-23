import { useTranslations } from 'next-intl'

import { NAVIGATION } from '@/constant/config'

import { getDate } from '@/helpers/getDate'

import Link from 'next/link'
import Avatar from '@/modules/Avatar'
import StarRating from '@/modules/StarRating'
import Icon from '@/components/Icon'
import Reference from '@/components/Reference'

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
            aria-label={data.name}
            title={data.name}
          >
            {data.name}
          </Link>
        </h6>
        <p className={style.date}>Registration: {getDate(data.registration, 3)}</p>
        <p className={style.date}>Last activity: {getDate(data.activity, 3)}</p>
        <div className={style.meta}>
          <StarRating data={data.rating} />
          <Reference
            link={'/'}
            classes={['reference', style.link]}
            placeholder={`${data.offers} ${t('offers')}`}
          />
        </div>
        <div className={style.phones}>
          <div className={style.social}>
            <Icon 
              iconName={'phone'}
              width={22}
              height={22}
            />
          </div>
          <div>
            {
              data.phone.map((el, idx) =>
                <Reference
                  key={idx}
                  link={`tel:${el}`}
                  classes={['reference', style.link]}
                  placeholder={el}
                />
              )
            }
          </div>
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
                  width={22}
                  height={22}
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
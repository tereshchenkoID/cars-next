import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { NAVIGATION } from 'constant/config'

import { getDate } from 'helpers/getDate'

import Link from 'next/link'
import Button from 'components/Button'
import Reference from 'components/Reference'
import StarRating from 'modules/StarRating'

import style from './index.module.scss'

const Contact = ({ data }) => {
  const t = useTranslations()
  const [toggle, setToggle] = useState(false)

  return (
    <div className={style.block}>
      <img
        className={style.image}
        src={data.logo}
        loading={'lazy'}
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
        <div className={style.meta}>
          <StarRating data={data.rating} />
          <Reference
            link={'/'}
            classes={['reference', style.link]}
            placeholder={`${data.offers} ${t('offers')}`}
          />
        </div>
        <p className={style.date}>{t('last_activity')}: <strong>{getDate(data.activity, 3)}</strong></p>
        {
          toggle
            ?
              <div className={style.dropdown}>
                {
                  data.phone.map((el, idx) =>
                    <Reference
                      key={idx}
                      link={`tel:${el.data}`}
                      classes={['primary', 'xs']}
                      placeholder={el.data}
                    />
                  )
                }
                {
                  Object.entries(data.messengers)
                    .filter(([_, value]) => value)
                    .map(([key, value], idx) =>
                      <Button
                        key={idx}
                        icon={key}
                        classes={['alt', 'xs']}
                        placeholder={key}
                      />
                    )
                }
                {
                  data.email.map((el, idx) =>
                    <Reference
                      key={idx}
                      link={`mailto:${el.data}`}
                      classes={['alt', 'xs']}
                      placeholder={el.data}
                    />
                  )
                }
              </div>
            :
              <Button
                classes={['primary', 'xs', style.toggle]}
                icon={'phone'}
                onChange={() => setToggle(!toggle)}
                placeholder={t('show_contacts')}
              />
        }
      </div>
    </div>
  )
}

export default Contact

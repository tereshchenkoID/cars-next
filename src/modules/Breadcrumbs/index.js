import React from 'react'

import { useTranslations } from 'next-intl'

import Reference from 'components/Reference'

import style from './index.module.scss'

const Breadcrumbs = ({ data, current = false }) => {
  const t = useTranslations()

  return (
    <div className={style.block}>
      {
        data.map((el, idx) =>
          <React.Fragment key={idx}>
            <Reference
              link={el.link}
              classes={['reference', 'sm', style.link]}
              placeholder={t(el.text)}
            />
            {
              data.length - 1 !== idx &&
              <span className={style.text}>/</span>
            }
          </React.Fragment>
        )
      }
      {
        current &&
        <>
          <p className={style.text}>/</p>
          <p className={style.text}>{t(current.text)}</p>
        </>
      }
    </div>
  )
}

export default Breadcrumbs

import { useTranslations } from 'next-intl'

import classNames from 'classnames'

import style from './index.module.scss'

const Switcher = ({ data, active, setActive }) => {
  const t = useTranslations()

  return (
    <div className={style.block}>
      {
        data.map((el, idx) =>
          <button
            key={idx}
            type="button"
            className={
              classNames(
                style.button,
                active === idx && style.active
              )
            }
            aria-label={t(el)}
            title={t(el)}
            onClick={() => setActive(idx)}
          >
            {t(el)}
          </button>
        )
      }
    </div>
  )
}

export default Switcher

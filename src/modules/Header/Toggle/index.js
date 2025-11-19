import { useTranslations } from 'next-intl'

import classNames from 'classnames'

import style from './index.module.scss'

const Toggle = ({ show, setShow }) => {
  const t = useTranslations()

  return (
    <div
      className={style.block}
      onClick={() => setShow(!show)}
    >
      <button
        type={'button'}
        className={
          classNames(
            style.toggle,
            show && style.active
          )
        }
        aria-label={"Toggle"}
      >
        <span className={style.line} />
        <span className={style.line} />
        <span className={style.line} />
      </button>
      <p className={style.text}>{t('menu')}</p>
    </div>
  )
}

export default Toggle

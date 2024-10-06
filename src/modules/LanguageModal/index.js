import { useSearchParams } from 'next/navigation'
import { usePathname, useRouter } from '@/i18n/routing'
import { useTransition } from 'react'
import { useSelector } from 'react-redux'

import style from './index.module.scss'

const LanguageModal = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const settings = useSelector(state => state.settings)
  const [isPending, startTransition] = useTransition()

  const handleLanguageChange = (newLocale) => {
    const url = searchParams.size > 0 ? `${pathname}?${searchParams}` : pathname

    startTransition(() => {
      router.replace(url, { locale: newLocale })
    })
  }

  return (
    <ul className={style.block}>
      {
        settings.languages.map((el, idx) =>
          <li
            key={idx}
            className={style.item}
          >
            <button
              type={'button'}
              className={style.option}
              aria-label={el.text}
              onClick={() => handleLanguageChange(el.code)}
              disabled={isPending}
            >
              <span className={style.icon}></span>
              <span className={style.text}>{el.text}</span>
            </button>
          </li>
        )
      }
    </ul>
  )
}

export default LanguageModal

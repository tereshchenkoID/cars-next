import { useParams, useSearchParams } from 'next/navigation'
import { usePathname, useRouter } from 'i18n/routing'
import { useTransition } from 'react'
import { useSelector } from 'react-redux'

import Image from 'next/image'

import style from './index.module.scss'

const LanguageModal = () => {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const searchParams = useSearchParams()
  const settings = useSelector(state => state.settings)
  const [isPending, startTransition] = useTransition()
  const active = params.locale

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
          active !== el.code &&
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
              <span className={style.icon}>
                <Image
                  width={24}
                  height={24}
                  className={style.image}
                  src={`/images/countries/${el.code}.svg`}
                  priority={true}
                  alt={el.code}
                />
              </span>
              <span className={style.text}>{el.text}</span>
            </button>
          </li>
        )
      }
    </ul>
  )
}

export default LanguageModal

"use client"

import { useState, useRef, useTransition } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { usePathname, useRouter } from 'i18n/routing'

import { useSettingsStore } from 'stores/settingsStore'

import { useOutsideClick } from 'hooks/useOutsideClick'

import Image from 'next/image'

import style from './index.module.scss'

const Language = () => {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const { settings } = useSettingsStore()
  const searchParams = useSearchParams()

  const [show, setShow] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [active, setActive] = useState(params.locale)

  const blockRef = useRef(null)
  const buttonRef = useRef(null)

  useOutsideClick(
    blockRef,
    () => setShow(false),
    { buttonRef }
  )

  const handleChange = (newLocale) => {
    const url = searchParams.size > 0 ? `${pathname}?${searchParams}` : pathname

    setShow(false)
    setActive(newLocale)

    startTransition(() => {
      router.replace(url, { locale: newLocale })
    })
  }

  return (
    <div
      ref={blockRef}
      className={style.block}
    >
      <button
        ref={buttonRef}
        type={'button'}
        aria-label={active}
        className={style.toggle}
        onClick={() => setShow(!show)}
        disabled={isPending}
      >
        <span className={style.icon}>
          <Image
            width={28}
            height={28}
            className={style.image}
            src={`/images/countries/${active}.svg`}
            priority={true}
            alt={active}
          />
        </span>
      </button>
      {
        (show && settings?.languages?.length > 1) &&
        <ul className={style.dropdown}>
          {
            settings?.languages?.map((el, idx) =>
              active !== el.code &&
              <li
                key={idx}
                onClick={() => handleChange(el.code)}
              >
                <button
                  type={'button'}
                  className={style.option}
                  aria-label={el.text}
                >
                  <span className={style.icon}>
                    <Image
                      width={28}
                      height={28}
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
      }
    </div>
  )
}

export default Language

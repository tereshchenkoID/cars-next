"use client"

import { useTranslations } from 'next-intl'
import classNames from 'classnames'

import { DEFAULT, NAVIGATION } from 'constant/config'

import { useBrandsStore } from 'stores/brandsStore'

import Image from 'next/image'
import Link from 'next/link'
import Container from 'components/Container'

import style from './index.module.scss'

const MENU = [
  {
    title: 'menu',
    submenu: [
      NAVIGATION.buy,
      // NAVIGATION.new_auto,
      // NAVIGATION.about_us,
    ]
  },
  // {
  //   title: 'services',
  //   submenu: [
  //     NAVIGATION.new_auto,
  //     NAVIGATION.how_it_works,
  //   ]
  // },
  {
    title: 'company',
    submenu: [
      // NAVIGATION.about_us,
      // NAVIGATION.how_it_works,
      NAVIGATION.reviews,
    ]
  }
]

const SectionSitemap = () => {
  const t = useTranslations()
  const { brands } = useBrandsStore()

  return (
    <>
      <section
        className={
          classNames(
            style.section,
            style.right
          )
        }
      >
        <Container classes={style.container}>
          <h1 className={style.title}>{t(NAVIGATION.sitemap.text)}</h1>
          <div className={style.grid}>
            {
              MENU.map((el, idx) =>
                <ul
                  key={idx}
                  className={style.submenu}
                >
                  <li className={style.item}>
                    <h5>{t(el.title)}</h5>
                  </li>
                  {
                    el.submenu.map((sublink, index) =>
                      <li
                        key={index}
                        className={style.item}
                      >
                        <Link
                          href={sublink.link}
                          rel="noreferrer"
                          className={style.link}
                        >
                          {t(sublink.text)}
                        </Link>
                      </li>
                    )
                  }
                </ul>
              )
            }
          </div>
        </Container>
      </section>
      <section className={style.section}>
        <Container classes={style.container}>
          <h5 className={style.title}>{t('all_brands')}</h5>
          <div className={style.grid}>
            {
              brands.map((el, idx) =>
                <Link
                  href={`${NAVIGATION.buy.link}?make_${el.id}=${DEFAULT}`}
                  key={idx}
                  className={style.brand}
                >
                  <Image
                    width={32}
                    height={32}
                    className={style.img}
                    src={`/images/brands/${el.id}.webp`}
                    // priority={true}
                    priority={false}
                    alt={el.name}
                  />
                  <span className={style.text}>{el.name}</span>
                </Link>
              )
            }
          </div>
        </Container>
      </section>
    </>
  )
}

export default SectionSitemap

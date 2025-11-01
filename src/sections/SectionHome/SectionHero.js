"use client"

import { useTranslations } from 'next-intl'

import Container from "components/Container"
import Filters from './Filters'

import style from './index.module.scss'

const SectionHero = () => {
  const t = useTranslations()

  return (
    <section className={style.header}>
      <Container>
        <div className={style.hero}>
          <h1 className={style.title}>{t('sections.hero')}</h1>
          <Filters />
        </div>
      </Container>
    </section>
  )
}

export default SectionHero

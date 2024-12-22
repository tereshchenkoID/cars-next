"use client"

import { useTranslations } from 'next-intl'

import Container from "@/components/Container"
import Filters from './Filters'
import SectionCategories from './SectionCategories'
import SectionReviews from './SectionReviews'
import SectionNew from './SectionNew'

import style from './index.module.scss'

const SectionHome = ({ initialData }) => {
  const t = useTranslations()
  const { reviews } = initialData

  return (
    <>
      <section className={style.header}>
        <Container>
          <div className={style.hero}>
            <h1 className={style.title}>{t('sections.hero')}</h1>
            <Filters />
          </div>
        </Container>
      </section>

      <SectionCategories />
      <SectionNew />
      <SectionReviews data={reviews} />
    </>
  )
}

export default SectionHome
"use client"

import { useTranslations } from 'next-intl'

import Container from "@/components/Container"

import style from './index.module.scss'

const SectionHome = () => {
  const t = useTranslations()

  return (
    <Container classes={style.block}>
      Home
    </Container>
  )
}

export default SectionHome
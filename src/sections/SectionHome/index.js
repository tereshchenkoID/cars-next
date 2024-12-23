"use client"

import SectionCategories from './SectionCategories'
import SectionReviews from './SectionReviews'
import SectionNew from './SectionNew'
import SectionHero from './SectionHero'
import SectionContact from '../SectionContact'

const SectionHome = ({ initialData }) => {
  const { reviews } = initialData

  return (
    <>
      <SectionHero />
      <SectionCategories />
      <SectionNew />
      <SectionReviews data={reviews} />
      <SectionContact />
    </>
  )
}

export default SectionHome
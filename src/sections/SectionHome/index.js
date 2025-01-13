"use client"

import SectionCategories from './SectionCategories'
import SectionReviews from './SectionReviews'
import SectionNew from './SectionNew'
import SectionHero from './SectionHero'
import SectionContact from '../SectionContact'

const SectionHome = ({ initialData }) => {
  const { reviews, cars } = initialData

  return (
    <>
      <SectionHero />
      <SectionCategories />
      <SectionNew data={cars} />
      <SectionReviews data={reviews} />
      <SectionContact />
    </>
  )
}

export default SectionHome
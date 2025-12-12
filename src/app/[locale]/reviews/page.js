import { NAVIGATION } from 'constant/config'
import { fetchMetaTags } from 'utils/fetchMetaTags'
import { apiRequest } from 'utils/apiRequest'

import SectionReviews from 'sections/SectionReviews'

export async function generateMetadata() {
  return await fetchMetaTags('reviews')
}

async function fetchInitialData() {
  return apiRequest('reviews', { method: 'GET' })
}

const Reviews = async () => {
  const [metaTags, data] = await Promise.all([
    fetchMetaTags('reviews'),
    fetchInitialData()
  ])

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": metaTags.title,
    "url": process.env.BASE_URL,
    "description": metaTags.description,
    "publisher": {
      "@type": "Organization",
      "name": process.env.ORGANIZATION_NAME,
      "logo": {
        "@type": "ImageObject",
        "url": process.env.ORGANIZATION_LOGO
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${process.env.API_BASE_URL}/${NAVIGATION.reviews.link}`,
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <>
      <SectionReviews initialData={data} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}

export default Reviews

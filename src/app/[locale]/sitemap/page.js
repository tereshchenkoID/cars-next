import { NAVIGATION } from 'constant/config'
import { fetchMetaTags } from 'utils/fetchMetaTags'

import SectionSitemap from 'sections/SectionSitemap'

const Reviews = async () => {
  const [metaTags] = await Promise.all([
    fetchMetaTags('sitemap')
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
      "target": `${process.env.API_BASE_URL}/${NAVIGATION.sitemap.link}`,
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <>
      <SectionSitemap />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}

export default Reviews

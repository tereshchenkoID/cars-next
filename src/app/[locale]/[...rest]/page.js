import { NAVIGATION } from 'constant/config'
import { fetchMetaTags } from 'utils/fetchMetaTags'

import SectionNotFound from 'sections/SectionNotFound'

export async function generateMetadata() {
  return await fetchMetaTags('not-found')
}

const NotFound  = async () => {
  const metaTags = fetchMetaTags('not-found')

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": metaTags.title,
    "url":  process.env.BASE_URL,
    "description": metaTags.description,
    "publisher": {
      "@type": "Organization",
      "name":  process.env.ORGANIZATION_NAME,
      "logo": {
        "@type": "ImageObject",
        "url":  process.env.ORGANIZATION_LOGO
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${process.env.API_BASE_URL}/${NAVIGATION.not_found.link}`,
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SectionNotFound />
    </>
  )
}

export default NotFound

import { NAVIGATION } from 'constant/config'
import { fetchData } from 'utils/fetchData'
import { fetchMetaTags } from 'utils/fetchMetaTags'

import SectionAdvancedSearch from 'sections/SectionAdvancedSearch'

export async function generateMetadata() {
  return await fetchMetaTags('home')
}

const AdvancedSearch = async () => {
  const [metaTags, options] = await Promise.all([
    fetchMetaTags('advanced-search'),
    fetchData('filters/options')
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
      "target": `${process.env.API_BASE_URL}/${NAVIGATION.advanced_search.link}`,
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <>
      <SectionAdvancedSearch 
        options={options}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}

export default AdvancedSearch

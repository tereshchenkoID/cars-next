import { NAVIGATION } from '@/constant/config'
import { fetchMetaTags } from '@/utils/fetchMetaTags'
import { fetchData } from '@/utils/fetchData'

import SectionHome from '@/sections/SectionHome'

export async function generateMetadata() {
  return await fetchMetaTags('home')
}

async function fetchInitialData() {
  try {
    const [reviews] = await Promise.all([
      fetchData('review/'),
      // fetchData('filters/'),
      // fetchData('filters/brands/')
    ])

    return { reviews }
  } catch (error) {
    console.error('Error fetching initial data:', error)
    return { settings: null, filters: null, brands: null }
  }
}

const Home = async () => {
  const [metaTags] = await Promise.all([
    fetchMetaTags('home')
  ])
  const initialData = await fetchInitialData()

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
      "target": `${process.env.API_BASE_URL}/${NAVIGATION.home.link}`,
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <>
      <SectionHome initialData={initialData} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}

export default Home

import { NAVIGATION } from 'constant/config'
import { fetchMetaTags } from 'utils/fetchMetaTags'
import { fetchData } from 'utils/fetchData'

import SectionHome from 'sections/SectionHome'

export async function generateMetadata() {
  return await fetchMetaTags('home')
}

async function postInitialData(endpoint) {
  const formData = new FormData()
  formData.append('data', JSON.stringify({"sort":{"value":["3"]}}))
  formData.append('page', Number(1))

  try {
    const res = await fetch(`${process.env.API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      body: formData,
      cache: 'no-cache'
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch data from ${endpoint}: ${res.statusText}`)
    }

    const data = await res.json()

    return data
  } catch (error) {
    console.error('Error posting data:', error)
    return null
  }
}

async function fetchInitialData() {
  try {
    const [reviews, cars] = await Promise.all([
      fetchData('reviews/'),
      postInitialData('filters/search/')
    ])

    return { reviews, cars }
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

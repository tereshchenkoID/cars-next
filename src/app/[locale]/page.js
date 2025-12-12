import { NAVIGATION } from 'constant/config'
import { fetchMetaTags } from 'utils/fetchMetaTags'
import { apiRequest } from 'utils/apiRequest'

import SectionHome from 'sections/SectionHome'

export async function generateMetadata() {
  return await fetchMetaTags('home')
}

async function fetchInitialData(cookies) {
  const reviewsReq = apiRequest('reviews/', {
    method: 'GET',
    cookies
  })

  const carsReq = apiRequest('filters/search/', {
    method: 'POST',
    params: {
      data: JSON.stringify({ sort: { value: ['3'] } }),
      page: 1
    },
    cookies
  })

  const [reviews, cars] = await Promise.all([reviewsReq, carsReq])

  return { reviews, cars }
}

const Home = async () => {
  const metaTags = await fetchMetaTags('home')
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

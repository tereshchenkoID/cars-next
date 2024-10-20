import { 
  API_BASE_URL, 
  BASE_URL, 
  NAVIGATION, 
  ORGANIZATION 
} from '@/constant/config'

import { fetchMetaTags } from '@/utils/fetchMetaTags'

export async function generateMetadata() {
  return await fetchMetaTags('home')
}

const Home = async () => {
  const [metaTags] = await Promise.all([
    fetchMetaTags('home')
  ])

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": metaTags.title,
    "url": BASE_URL,
    "description": metaTags.description,
    "publisher": {
      "@type": "Organization",
      "name": ORGANIZATION.name,
      "logo": {
        "@type": "ImageObject",
        "url": ORGANIZATION.logo
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${API_BASE_URL}/${NAVIGATION.home.link}`,
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <>
      Home
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}

export default Home

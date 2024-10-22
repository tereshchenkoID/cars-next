import { 
  API_BASE_URL, 
  BASE_URL 
} from '@/constant/config'

import { fetchMetaTags } from '@/utils/fetchMetaTags'

import SectionsCars from "@/sections/SectionsCars"

function transformInput(input) {
  const result = {}

  for (const key in input) {
    if (input.hasOwnProperty(key)) {
      const valuesArray = input[key].split(';');

      result[key] = {
        value: valuesArray
      }
    }
  }

  return result
}

export async function generateMetadata() {
  return await fetchMetaTags('cars')
}

async function postData(endpoint, searchParams) {
  // console.log(JSON.stringify(transformInput(searchParams)))

  const formData = new FormData();
  formData.append('data', JSON.stringify(transformInput(searchParams)));
  formData.append('page', Number(searchParams.page) || 0);

  try {
    const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      body: formData,
    })

    console.log(res)

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

const Cars = async ({ searchParams }) => {
  const data = await postData('filters/search/', searchParams)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": data?.data.map((car, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": car.name,
        "description": car.description,
        "image": car.images[0] || null,
        "brand": {
          "@type": "Brand",
          "name": car.make,
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "USD",
          "price": car.price,
          "itemCondition": "https://schema.org/UsedCondition",
          "availability": "https://schema.org/InStock",
          "url": `${BASE_URL}/car/${car.id}`,
        },
      },
    }))
  }

  return (
    <>
      <SectionsCars initialData={data} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}

export default Cars

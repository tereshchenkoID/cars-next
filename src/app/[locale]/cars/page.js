import { fetchMetaTags } from 'utils/fetchMetaTags'
import { apiRequest } from 'utils/apiRequest'

import SectionCars from 'sections/SectionCars'

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

async function fetchCars(searchParams) {
  const params = {
    data: JSON.stringify(transformInput(searchParams)),
    page: Number(searchParams.page || 1)
  }

  return await apiRequest('filters/search/', {
    method: 'POST',
    params
  })
}

const Cars = async ({ searchParams }) => {
  const resolvedParams = await searchParams
  const data = await fetchCars(resolvedParams)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": data?.data?.map((car, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": car.name,
        "description": car.description,
        "image": car.images?.[0] || null,
        "brand": {
          "@type": "Brand",
          "name": car.make.name,
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "USD",
          "price": car.price_data.price,
          "itemCondition": "https://schema.org/UsedCondition",
          "availability": "https://schema.org/InStock",
          "url": `${process.env.BASE_URL}/car/${car.id}/${car.slug}`,
        },
      },
    }))
  }

  return (
    <>
      <SectionCars initialData={data} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}

export default Cars

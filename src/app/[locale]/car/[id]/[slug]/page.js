import { DEFAULT } from '@/constant/config'
import { fetchMetaTags } from '@/utils/fetchMetaTags'
import { fetchData } from '@/utils/fetchData'

import SectionCar from "@/sections/SectionCar"

export async function generateMetadata() {
  return await fetchMetaTags('car')
}

const Car = async ({ params: { id } }) => {
  const [data] = await Promise.all([
    fetchData(`item/${id}`),
  ])

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": data.name,
    "description": data.description,
    "image": data.images || [],
    "brand": {
      "@type": "Brand",
      "name": data.make || "N/A",
    },
    "model": data.model || "N/A",
    "vehicleModelDate": data.year || "N/A",
    "manufacturer": {
      "@type": "Organization",
      "name": data.make || "N/A",
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": data.price || DEFAULT,
      "price": data.price || DEFAULT,
      "itemCondition": "https://schema.org/UsedCondition",
      "availability": "https://schema.org/InStock",
      "url": `${process.env.BASE_URL}/car/${id}`,
      "seller": {
        "@type": "Organization",
        "name": process.env.ORGANIZATION_NAME,
        "url": process.env.BASE_URL,
      },
    },
    "mpn": data.id || "N/A",
    "sku": data.sku || "N/A", // TOYOTA-CAMRY-2021
    "vehicleConfiguration": data.configuration || "Unknown", // ?
    "vehicleEngine": {
      "@type": "EngineSpecification",
      "name": data.engine || DEFAULT,
      "fuelType": data.fuel || DEFAULT,
    },
    "mileageFromOdometer": {
      "@type": "QuantitativeValue",
      "value": data.mileage || DEFAULT,
      "unitCode": "KM",
    },
    "color": data.color || DEFAULT,
    "bodyType": data.body_type || DEFAULT,
    "fuelType": data.fuel || DEFAULT,
    "vehicleTransmission": data.transmission || DEFAULT,
    "numberOfDoors": data.doors_number || 4,
    "seatingCapacity": data.seating_capacity || 5,
  }

  return (
    <>
      <SectionCar data={data} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}

export default Car
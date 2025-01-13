import { NA } from '@/constant/config'
import { fetchMetaTags } from '@/utils/fetchMetaTags'
import { fetchData } from '@/utils/fetchData'

import SectionCar from "@/sections/SectionCar"

export async function generateMetadata() {
  return await fetchMetaTags('car')
}

const Car = async ({ params: { id } }) => {
  const data = await fetchData(`item/${id}`)
  const nextId = data.price_map?.find(option => option.selected)?.id
  const next = nextId ? await fetchData(`item/${nextId}`) : null

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": data.meta.name,
    "description": data.meta.description,
    "image": data.images || [],
    "brand": {
      "@type": "Brand",
      "name": data.make || NA,
    },
    "model": data.model.name || NA,
    "vehicleModelDate": data.date.manufacture || NA,
    "manufacturer": {
      "@type": "Organization",
      "name": data.make.name || NA,
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": data.currency.name || NA,
      "price": data.price_data.price || NA,
      "itemCondition": "https://schema.org/UsedCondition",
      "availability": "https://schema.org/InStock",
      "url": `${process.env.BASE_URL}/car/${id}`,
      "seller": {
        "@type": "Organization",
        "name": process.env.ORGANIZATION_NAME,
        "url": process.env.BASE_URL,
      },
    },
    "sku": data.meta.name || NA,
    "vehicleEngine": {
      "@type": "EngineSpecification",
      "name": data.power_data.power || NA,
      "fuelType": data.fuel_type.name || NA,
    },
    "mileageFromOdometer": {
      "@type": "QuantitativeValue",
      "value": data.mileage_data.mileage || NA,
      "unitCode": data.mileage_data.mileage_unit,
    },
    "color": data.color.name || NA,
    "bodyType": data.body.name || NA,
    "fuelType": data.fuel_type.name || NA,
    "vehicleTransmission": data.transmission.name || NA,
    "numberOfDoors": data.number_of_doors || NA,
    "seatingCapacity": data.number_of_seats || 5,
  }

  return (
    <>
      <SectionCar data={data} next={next} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}

export default Car
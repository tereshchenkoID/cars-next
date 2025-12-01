import { NA } from 'constant/config'
import { fetchMetaTags } from 'utils/fetchMetaTags'
import { fetchData } from 'utils/fetchData'

import SectionCar from "sections/SectionCar"

export async function generateMetadata() {
  return await fetchMetaTags('car')
}

const Car = async ({ params }) => {
  const { id } = await params
  const data = await fetchData(`item/${id}`)
  const nextId = data.price.price_map?.find(option => option.selected)?.id
  const next = nextId ? await fetchData(`item/${nextId}`) : null

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": data.details.meta.name,
    "description": data.details.meta.description,
    "image": data.images || [],
    "brand": {
      "@type": "Brand",
      "name": data.details.make || NA,
    },
    "model": data.details.model.name || NA,
    "vehicleModelDate": data.details.date.manufacture_registration || NA,
    "manufacturer": {
      "@type": "Organization",
      "name": data.details.make.name || NA,
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": data.price.currency.name || NA,
      "price": data.price.price_data.price || NA,
      "itemCondition": "https://schema.org/UsedCondition",
      "availability": "https://schema.org/InStock",
      "url": `${process.env.BASE_URL}/car/${id}`,
      "seller": {
        "@type": "Organization",
        "name": process.env.ORGANIZATION_NAME,
        "url": process.env.BASE_URL,
      },
    },
    "sku": data.details.meta.name || NA,
    "vehicleEngine": {
      "@type": "EngineSpecification",
      "name": data.details.power_data.power || NA,
      "fuelType": data.details.fuel_type.name || NA,
    },
    "mileageFromOdometer": {
      "@type": "QuantitativeValue",
      "value": data.details.mileage_data.mileage || NA,
      "unitCode": data.details.mileage_data.mileage_unit,
    },
    "color": data.equipment.color.name || NA,
    "bodyType": data.details.body.name || NA,
    "fuelType": data.details.fuel_type.name || NA,
    "vehicleTransmission": data.details.transmission.name || NA,
    "numberOfDoors": data.equipment.number_of_doors || NA,
    "seatingCapacity": data.equipment.number_of_seats || 5,
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

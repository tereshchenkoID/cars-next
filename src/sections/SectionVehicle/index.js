"use client"

import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslations } from 'next-intl'

import Container from '@/components/Container'

import Details from './Details'
import Photos from './Photos'
import Equipment from './Equipment'
import Price from './Price'
import Contact from './Contact'

import style from './index.module.scss'
// status
// 0 - not add
// 1 - not active
// 2 - active
// 3 - sold
// 4 - expired

// top
// 0 - not
// 1 - true

const DATA = {
  "id": "68837122", // need generate if add new car
  "status": "1", // тут надо проставить статус не активен
  "contact": {
    "id": "100",
    "name": "Tester",
    "surname": "Surname", // надо добавлять
    "phone": [
      "+380671234567",
      "+380671234568"
    ]
  },
  "make": {
    "id": "0",
    "name": null,
    "slug": "n-a"
  },
  "model": {
    "id": "0",
    "name": null,
    "slug": "n-a"
  },
  "meta": {
    "name": null,
    "slug": null,
    "vin": null,
    "description": null
  },
  // тут дефолтную дату надо проставлять желательно
  "date": {
    "manufacture": "1656633600000",
    "first_registration": "1656633600000"
  },
  "currency": {
    "id": "1",
    "name": "USD",
    "symbol": "$"
  },
  "images": [
    "https://storage.alpha-analytics.cz/get/5f457daa-7942-4d1e-9529-b531dca7a158?ts=1730376577",
    "https://storage.alpha-analytics.cz/get/56c5e562-768c-4530-a51f-00d8bcb7c0b5?ts=1730376033",
    "https://storage.alpha-analytics.cz/get/f312d2b2-2a39-49bf-aaac-f4a57c7f0dbb?ts=1730375886",
    "https://storage.alpha-analytics.cz/get/c4ee530d-262f-4f2a-b49c-d442f5260a38?ts=1730376522",
    "https://storage.alpha-analytics.cz/get/e2b9bf3a-0a0a-45d2-bf4b-9b18c602ee0b?ts=1730377218"
  ],
  "price_data": {
    "price": '32000',
    "vat_rate": "19.00",
    "price_without_vat": null,
    "price_recommended": '20000',
    "price_type": {
      "id": "1",
      "name": "fixed"
    }
  },
  "price_score": {
    "cars": 72,
    "counts": 102,
    "options": [
      "21755",
      "25241",
      "28727",
      "32213",
      "35699",
      "39184"
    ]
  },
  "category": {
    "id": "0",
    "name": "All"
  },
  "drive": {
    "id": "0",
    "name": "All"
  },
  "transmission": {
    "id": "0",
    "name": "All"
  },
  "body": {
    "id": "0",
    "name": "All",
  },
  "power_data": {
    "capacity": null,
    "power": null,
    "power_unit": {
      "id": "2",
      "name": "kw"
    }
  },
  "mileage_data": {
    "mileage": null,
    "mileage_unit": {
      "id": "1",
      "name": "km"
    }
  },
  "fuel_type": {
    "id": "0",
    "name": "All"
  },
  "color": {
    "id": "0",
    "name": "All"
  },
  "number_of_seats": null,
  "number_of_doors": null,
  "features": []
}

const SectionVehicle = ({ data, options }) => {
  const t = useTranslations()
  const [formData, setFormData] = useState(DATA)
  const [show, setShow] = useState({ 0: true })

  const handleToggle = (index) => {
    setShow((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const handleChange = (keyPath, newValue) => {
    setFormData((prevData) => {
      const keys = keyPath.split(".")
      const updatedData = { ...prevData }
      let current = updatedData

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]] = { ...current[keys[i]] }
      }

      current[keys[keys.length - 1]] = newValue
      return updatedData
    })
  }

  const isFeatureExist = (option) => {
    return formData.features.some(feature => feature.id === option.id && feature.parentId === option.parentId)
  }

  const handleFeature = (option) => {
    setFormData((prevData) => {
      const updatedFeatures = isFeatureExist(option)
        ? prevData.features.filter((feature) => feature.id !== option.id)
        : [...prevData.features, option]

      return {
        ...prevData,
        features: updatedFeatures,
      }
    })
  }

  return (
    <section className={style.block}>
      <pre className={style.pre}>{JSON.stringify(formData.color, null, 2)}</pre>
      <Container>
        <div className={style.container}>
          <h1>{t('add_vehicle')}</h1>
          <Photos
            data={formData}
            toggle={show}
            handleToggle={handleToggle}
          />

          <Details
            data={formData}
            toggle={show}
            handleChange={handleChange}
            handleToggle={handleToggle}
          />

          <Equipment
            options={options}
            data={formData}
            toggle={show}
            handleChange={handleChange}
            handleToggle={handleToggle}
            handleFeature={handleFeature}
            isFeatureExist={isFeatureExist}
          />

          <Price
            data={formData}
            toggle={show}
            handleChange={handleChange}
            handleToggle={handleToggle}
          />

          <Contact
            data={formData}
            toggle={show}
            handleChange={handleChange}
            handleToggle={handleToggle}
          />
        </div>
      </Container>
    </section>
  )
}

export default SectionVehicle
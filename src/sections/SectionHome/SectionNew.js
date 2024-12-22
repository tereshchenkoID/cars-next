"use client"

import { useTranslations } from 'next-intl'

import classNames from 'classnames'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Mousewheel } from 'swiper/modules'

import Container from "@/components/Container"
import Car from './Car'

import style from './index.module.scss'

const DATA = [
  {
    "id": "68946564",
    "is_favorite": "0",
    "status": "1",
    "make": {
      "id": "76",
      "name": "Volvo",
      "slug": "volvo"
    },
    "model": {
      "id": "2241",
      "name": "XC40",
      "slug": "xc40"
    },
    "name": "Volvo XC40 B4 Dark DKG Ultimate 145 kW",
    "slug": "volvo-xc40-b4-dark-dkg-ultimate-145-kw",
    "description": "Europe leading online marketplace for buying and selling used cars with warranty and delivery to your home",
    "manufacture_date": "1709251200000",
    "first_registration_date": "1709251200000",
    "currency": {
      "id": "1",
      "name": "USD",
      "symbol": "$"
    },
    "images": [
      "https://storage.alpha-analytics.cz/get/fb751e1d-e583-4885-9807-11d388365153?ts=1730783691",
      "https://storage.alpha-analytics.cz/get/829f7a89-149d-4f84-b47f-553558d4f715?ts=1730783931",
      "https://storage.alpha-analytics.cz/get/9b157d0a-61cd-4537-bebd-f2bfeed47f2e?ts=1730783858",
      "https://storage.alpha-analytics.cz/get/16780f7b-96de-4335-b19a-288d61135ffb?ts=1730783772",
      "https://storage.alpha-analytics.cz/get/ef271fe0-83c7-426a-8dad-924c8779ed0b?ts=1730783753",
      "https://storage.alpha-analytics.cz/get/73f79003-06b1-4608-b7ca-986d10fe5817?ts=1730783885",
      "https://storage.alpha-analytics.cz/get/23dbff53-64be-41b7-855f-0d8bb8bc7dc6?ts=1730783700",
      "https://storage.alpha-analytics.cz/get/e6af825c-9b29-4ff0-b9cc-a84c624d5a76?ts=1730783928",
      "https://storage.alpha-analytics.cz/get/38cc5703-bf5e-4de4-9dda-14d24326a6d4?ts=1730784199"
    ],
    "price_data": {
      "price": "44472.00",
      "vat_rate": "19.00",
      "price_without_vat": "36022.32",
      "discount": null
    },
    "category": {
      "id": "1",
      "name": "Passenger car",
      "slug": "passenger-car"
    },
    "drive": {
      "id": "4",
      "name": "4x2",
      "slug": "4x2"
    },
    "transmission": {
      "id": "1",
      "name": "Manual",
      "slug": "manual"
    },
    "body": {
      "id": "4",
      "name": "SUV / offroad",
      "slug": "suv-offroad"
    },
    "power_data": {
      "power": "145",
      "power_unit": "kW"
    },
    "mileage_data": {
      "mileage": "14214.00",
      "mileage_unit": "km"
    },
    "fuel_type": {
      "id": "1",
      "name": "Petrol",
      "slug": "petrol"
    },
    "featured_tags": [
      {
        "id": "37",
        "parentId": "2",
        "name": "Power assisted steering",
        "slug": "power-assisted-steering"
      },
      {
        "id": "12",
        "parentId": "2",
        "name": "ABS",
        "slug": "abs"
      },
      {
        "id": "13",
        "parentId": "2",
        "name": "ESP",
        "slug": "esp"
      },
      {
        "id": "41",
        "parentId": "2",
        "name": "Traction control (TC, ASR)",
        "slug": "traction-control-tc-asr"
      },
      {
        "id": "25",
        "parentId": "2",
        "name": "Emergency braking assist (EBA, ABS)",
        "slug": "emergency-braking-assist-eba-abs"
      },
      {
        "id": "24",
        "parentId": "2",
        "name": "Hill-start assist",
        "slug": "hill-start-assist"
      },
      {
        "id": "16",
        "parentId": "2",
        "name": "Front collision warning system",
        "slug": "front-collision-warning-system"
      },
      {
        "id": "42",
        "parentId": "2",
        "name": "Tyre pressure monitoring",
        "slug": "tyre-pressure-monitoring"
      },
      {
        "id": "35",
        "parentId": "2",
        "name": "Fatigue warning system",
        "slug": "fatigue-warning-system"
      }
    ]
  },
  {
    "id": "68946574",
    "is_favorite": "0",
    "status": "1",
    "make": {
      "id": "54",
      "name": "Mini",
      "slug": "mini"
    },
    "model": {
      "id": "0",
      "name": null,
      "slug": "n-a"
    },
    "name": "MINI Cooper S Countryman S All4 141 kW",
    "slug": "mini-cooper-s-countryman-s-all4-141-kw",
    "description": "Europe leading online marketplace for buying and selling used cars with warranty and delivery to your home",
    "manufacture_date": "1498867200000",
    "first_registration_date": "1498867200000",
    "currency": {
      "id": "1",
      "name": "USD",
      "symbol": "$"
    },
    "images": [
      "https://storage.alpha-analytics.cz/get/fc2d9f33-37d8-4eb9-9223-0256ef1d8d90?ts=1730783778",
      "https://storage.alpha-analytics.cz/get/9516d174-7cdc-4301-8faa-587dc64e11ab?ts=1730783878",
      "https://storage.alpha-analytics.cz/get/cc2b38a3-d75b-4a8e-bff5-7e00d4e2f9c1?ts=1730783755",
      "https://storage.alpha-analytics.cz/get/07e702c6-dce1-41da-85ec-dca8dca37601?ts=1730783773",
      "https://storage.alpha-analytics.cz/get/193c73b3-07ea-4d41-9ccb-9359eef3735b?ts=1730783930",
      "https://storage.alpha-analytics.cz/get/b9488b3b-1fba-420b-88af-8bfbc2346389?ts=1730783813",
      "https://storage.alpha-analytics.cz/get/4f6753a9-2bfb-41e6-8eb1-bb77c7eff125?ts=1730784181",
      "https://storage.alpha-analytics.cz/get/aed1ffcf-76b5-4202-b309-b99964e6c36e?ts=1730783843",
      "https://storage.alpha-analytics.cz/get/a40d6a71-d3b7-48a7-8600-a256a7968a4b?ts=1730783890",
      "https://storage.alpha-analytics.cz/get/49bf124f-60cd-497c-9f72-a73a0b6c6c67?ts=1730783689",
      "https://storage.alpha-analytics.cz/get/3b3d0548-9b31-4ca8-a22a-2e4410be7103?ts=1730783878",
      "https://storage.alpha-analytics.cz/get/bb12870d-7855-4220-8eef-d09292bf2bc9?ts=1730783906",
      "https://storage.alpha-analytics.cz/get/1ff26471-c95e-4d7f-ab1d-024effc7b4c4?ts=1730783884",
      "https://storage.alpha-analytics.cz/get/601d01b2-f26b-4478-b51e-fbdb0f425ea0?ts=1730783908",
      "https://storage.alpha-analytics.cz/get/224d998e-4919-4022-9939-4944545fddbe?ts=1730784164",
      "https://storage.alpha-analytics.cz/get/d4d3b4fa-a38f-4c16-baf8-615ccb09fae7?ts=1730784183",
      "https://storage.alpha-analytics.cz/get/ef827f13-c60b-4145-8b34-d72c2b8a317f?ts=1730784027"
    ],
    "price_data": {
      "price": "24755.00",
      "vat_rate": "0.00",
      "price_without_vat": null,
      "discount": null
    },
    "category": {
      "id": "1",
      "name": "Passenger car",
      "slug": "passenger-car"
    },
    "drive": {
      "id": "3",
      "name": "4x4",
      "slug": "4x4"
    },
    "transmission": {
      "id": "1",
      "name": "Manual",
      "slug": "manual"
    },
    "body": {
      "id": "4",
      "name": "SUV / offroad",
      "slug": "suv-offroad"
    },
    "power_data": {
      "power": "141",
      "power_unit": "kW"
    },
    "mileage_data": {
      "mileage": "42765.00",
      "mileage_unit": "km"
    },
    "fuel_type": {
      "id": "1",
      "name": "Petrol",
      "slug": "petrol"
    },
    "featured_tags": [
      {
        "id": "37",
        "parentId": "2",
        "name": "Power assisted steering",
        "slug": "power-assisted-steering"
      },
      {
        "id": "12",
        "parentId": "2",
        "name": "ABS",
        "slug": "abs"
      },
      {
        "id": "13",
        "parentId": "2",
        "name": "ESP",
        "slug": "esp"
      },
      {
        "id": "41",
        "parentId": "2",
        "name": "Traction control (TC, ASR)",
        "slug": "traction-control-tc-asr"
      },
      {
        "id": "25",
        "parentId": "2",
        "name": "Emergency braking assist (EBA, ABS)",
        "slug": "emergency-braking-assist-eba-abs"
      },
      {
        "id": "24",
        "parentId": "2",
        "name": "Hill-start assist",
        "slug": "hill-start-assist"
      },
      {
        "id": "16",
        "parentId": "2",
        "name": "Front collision warning system",
        "slug": "front-collision-warning-system"
      },
      {
        "id": "42",
        "parentId": "2",
        "name": "Tyre pressure monitoring",
        "slug": "tyre-pressure-monitoring"
      },
      {
        "id": "17",
        "parentId": "2",
        "name": "Parking assist system self-steering",
        "slug": "parking-assist-system-self-steering"
      }
    ]
  }
]

const SectionNew = () => {
  const t = useTranslations()

  return (
    <section
      className={
        classNames(
          style.section,
          style.white
        )
      }
    >
      <Container classes={[style.container]}>
        <div className={style.headline}>
          <h2 className={style.subtitle}>{t('sections.new_cars')}</h2>
        </div>
        <Swiper
          className={style.slider}
          slidesPerView={'auto'}
          // mousewheel={true}
          keyboard={{
            enabled: true,
          }}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          navigation={true}
          modules={[Mousewheel, Pagination, Navigation]}
        >
          {
            DATA.map((el, idx) =>
              <SwiperSlide key={idx}>
                <Car data={el} />
              </SwiperSlide>
            )
          }
        </Swiper>
      </Container>
    </section>
  )
}

export default SectionNew
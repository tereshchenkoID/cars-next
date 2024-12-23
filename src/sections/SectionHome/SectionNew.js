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
    "id": "68946890",
    "is_favorite": "0",
    "status": "1",
    "make": {
      "id": "76",
      "name": "Volvo",
      "slug": "volvo"
    },
    "model": {
      "id": "2229",
      "name": "EX30",
      "slug": "ex30"
    },
    "meta": {
      "name": "Volvo EX30 Single Motor Plus 200 kW",
      "slug": "volvo-ex30-single-motor-plus-200-kw",
      "description": "Europe leading online marketplace for buying and selling used cars with warranty and delivery to your home",
      "manufacture_date": "1722470400000",
      "first_registration_date": "1722470400000",
      "created_at": "1724371200000",
      "updated_at": "1730801921000"
    },
    "currency": {
      "id": "1",
      "name": "USD",
      "symbol": "$"
    },
    "images": [
      "https://storage.alpha-analytics.cz/get/b6efaab1-0f56-4510-b09a-3206779669c4?ts=1730784415",
      "https://storage.alpha-analytics.cz/get/0b9de958-6eb1-4348-af1e-cb6d7bf71862?ts=1730784414",
      "https://storage.alpha-analytics.cz/get/2e446b58-c6a3-40de-936c-f44b41321b8b?ts=1730784413",
      "https://storage.alpha-analytics.cz/get/c86f6b45-76bc-496f-9e9a-b026f4b2d875?ts=1730784068",
      "https://storage.alpha-analytics.cz/get/ee685d76-aa5a-4369-9a57-67d839ecf752?ts=1730784336",
      "https://storage.alpha-analytics.cz/get/8796905f-098b-40ac-9587-7ecfb6231566?ts=1730784121",
      "https://storage.alpha-analytics.cz/get/cf84382c-4569-4bc9-962d-f48b9be91735?ts=1730784082",
      "https://storage.alpha-analytics.cz/get/7915075e-76e2-4411-b813-5bb7e3e1eeff?ts=1730784088",
      "https://storage.alpha-analytics.cz/get/91333865-2fda-4948-a9b0-085fc657f943?ts=1730784110",
      "https://storage.alpha-analytics.cz/get/1b8a4467-64a1-4192-ae72-05aa28f66639?ts=1730784109",
      "https://storage.alpha-analytics.cz/get/74455c35-b81f-44f4-b0c3-0a9c9ee00b1b?ts=1730783877",
      "https://storage.alpha-analytics.cz/get/cf35239e-2806-4860-8085-35296f07a0f3?ts=1730784085",
      "https://storage.alpha-analytics.cz/get/5e2187e4-ddd4-4778-8c1b-8bf49f7552f6?ts=1730783992",
      "https://storage.alpha-analytics.cz/get/7c301301-9950-4f42-901d-98b0f2653d62?ts=1730784110",
      "https://storage.alpha-analytics.cz/get/c405a0b9-c70e-4c25-993d-4159d8186a96?ts=1730784086",
      "https://storage.alpha-analytics.cz/get/c5f9a999-61ee-4af0-8ebe-36eead084bb6?ts=1730784085",
      "https://storage.alpha-analytics.cz/get/7423bb80-5b7b-44ad-9424-58ebf9f6845a?ts=1730783993",
      "https://storage.alpha-analytics.cz/get/74869faf-df40-4409-b799-4c58e3fbd168?ts=1730784059",
      "https://storage.alpha-analytics.cz/get/f3e5ba2d-84a0-4f42-8204-bb0403d8b507?ts=1730784027",
      "https://storage.alpha-analytics.cz/get/8bf20aa7-8653-441d-953b-9ba274bd7688?ts=1730783877",
      "https://storage.alpha-analytics.cz/get/761df4a5-96d3-4c54-b678-2e63bd0c925a?ts=1730784001",
      "https://storage.alpha-analytics.cz/get/aadbdccd-4110-4ce5-a6d4-9169a87081f0?ts=1730784167",
      "https://storage.alpha-analytics.cz/get/4b0f4daa-46d3-4658-9512-39715aa7d6e4?ts=1730783996",
      "https://storage.alpha-analytics.cz/get/3e5be0b2-9c5b-4a2f-bffa-396cbc674b9a?ts=1730784125",
      "https://storage.alpha-analytics.cz/get/561c2ef5-3035-48d1-ae07-50ace10ed34b?ts=1730784029",
      "https://storage.alpha-analytics.cz/get/5059f4c2-2a3a-4082-aef9-9b8f7ade545c?ts=1730784088"
    ],
    "price_data": {
      "price": "36038.00",
      "vat_rate": "19.00",
      "price_without_vat": "29190.78",
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
      "power": "200",
      "power_unit": "kW"
    },
    "mileage_data": {
      "mileage": "9.00",
      "mileage_unit": "km"
    },
    "fuel_type": {
      "id": "3",
      "name": "Electric",
      "slug": "electric"
    },
    "featured_tags": [
      {
        "id": "66",
        "parentId": "3",
        "name": "MP3 interface",
        "slug": "mp3-interface"
      },
      {
        "id": "37",
        "parentId": "2",
        "name": "Power assisted steering",
        "slug": "power-assisted-steering"
      },
      {
        "id": "30",
        "parentId": "2",
        "name": "Passenger airbag deactivation ",
        "slug": "passenger-airbag-deactivation"
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
        "id": "14",
        "parentId": "2",
        "name": "EDS",
        "slug": "eds"
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
      }
    ]
  },
  {
    "id": "68946856",
    "is_favorite": "0",
    "status": "1",
    "make": {
      "id": "8",
      "name": "Audi",
      "slug": "audi"
    },
    "model": {
      "id": "1522",
      "name": "A6",
      "slug": "a6"
    },
    "meta": {
      "name": "Audi A6 150 kW",
      "slug": "audi-a6-150-kw",
      "description": "Europe leading online marketplace for buying and selling used cars with warranty and delivery to your home",
      "manufacture_date": "1672531200000",
      "first_registration_date": "1672531200000",
      "created_at": "1730419200000",
      "updated_at": "1730801921000"
    },
    "currency": {
      "id": "1",
      "name": "USD",
      "symbol": "$"
    },
    "images": [
      "https://storage.alpha-analytics.cz/get/2e7c0525-48ab-41fc-ac12-db91872654ed?ts=1730784382",
      "https://storage.alpha-analytics.cz/get/55e228a2-c29d-452d-897d-ed48f7221f09?ts=1730783986",
      "https://storage.alpha-analytics.cz/get/023e5f11-cb7e-4a6d-a3e3-ea1805344b19?ts=1730784006",
      "https://storage.alpha-analytics.cz/get/f43df844-d89e-4f1e-a94e-bbc0e4969d00?ts=1730784064",
      "https://storage.alpha-analytics.cz/get/cc20c4b9-b06d-4f30-abe3-170a1366b8d4?ts=1730784050",
      "https://storage.alpha-analytics.cz/get/0d65be63-edeb-42d1-a51d-6927cf42b4b0?ts=1730784073",
      "https://storage.alpha-analytics.cz/get/177ea482-7710-43cc-a663-c0c3667ace59?ts=1730784138",
      "https://storage.alpha-analytics.cz/get/5ce88195-40ec-44ca-95f0-8d7bd32019ba?ts=1730784007",
      "https://storage.alpha-analytics.cz/get/59be3d49-17da-4c3b-9324-44010e2e624f?ts=1730784045",
      "https://storage.alpha-analytics.cz/get/f6ad6010-a353-42d4-819c-a4676b2e963b?ts=1730783849",
      "https://storage.alpha-analytics.cz/get/5351ad8e-1343-4e3f-a270-136afdfcbf02?ts=1730783840",
      "https://storage.alpha-analytics.cz/get/ed207fd2-1402-40e5-9b1b-90099fa59361?ts=1730784353",
      "https://storage.alpha-analytics.cz/get/1431be1a-bba8-437b-9775-f6114fa85f55?ts=1730784008",
      "https://storage.alpha-analytics.cz/get/3d899466-28a3-4f7c-992e-9e265661ff67?ts=1730784139",
      "https://storage.alpha-analytics.cz/get/be5f41a5-ee26-4857-b01e-97aafef223b6?ts=1730783852",
      "https://storage.alpha-analytics.cz/get/ced00371-d98e-4ff4-af26-ed4341d37be2?ts=1730784088",
      "https://storage.alpha-analytics.cz/get/db30a0e2-8d35-4506-af62-b2fb34c92486?ts=1730784016",
      "https://storage.alpha-analytics.cz/get/07aaa8e9-7d16-4aba-af61-33efaf16d283?ts=1730784064",
      "https://storage.alpha-analytics.cz/get/2bb0c792-bea5-4634-bc1c-107c0114e7d1?ts=1730784045",
      "https://storage.alpha-analytics.cz/get/51c658eb-331d-40ec-8616-9738acdfab61?ts=1730783969",
      "https://storage.alpha-analytics.cz/get/54c40d38-dbc7-4b6d-b1f0-b4984d149bc6?ts=1730784138",
      "https://storage.alpha-analytics.cz/get/a8fcf162-bf4c-4581-8dfe-afdff4c85d7a?ts=1730784020",
      "https://storage.alpha-analytics.cz/get/5cc5f246-16bc-4a00-9fd6-604847407f6c?ts=1730783849",
      "https://storage.alpha-analytics.cz/get/26ef2980-8f4c-4ca6-bf59-404a85b4799c?ts=1730784007",
      "https://storage.alpha-analytics.cz/get/12beba94-f31d-43f9-879a-9cb5995ade6c?ts=1730784304",
      "https://storage.alpha-analytics.cz/get/7ac599ec-0e08-4b43-940e-834789ef2803?ts=1730784019",
      "https://storage.alpha-analytics.cz/get/4a00badb-726f-437e-a33f-02c6b05fc0fd?ts=1730783850",
      "https://storage.alpha-analytics.cz/get/b71eab5e-4954-4085-bd5e-c6e0f18a1d94?ts=1730783960",
      "https://storage.alpha-analytics.cz/get/de9c2f38-02a4-44de-8507-a01f6a9c54b1?ts=1730783959",
      "https://storage.alpha-analytics.cz/get/51636ce8-3833-4471-a3b2-1b93f4ae192c?ts=1730784082",
      "https://storage.alpha-analytics.cz/get/95f23975-b3fe-4f77-8868-7e4fa1c0a680?ts=1730783970",
      "https://storage.alpha-analytics.cz/get/cf5ce56a-a94f-4c39-a0d1-77a024434a1c?ts=1730783850",
      "https://storage.alpha-analytics.cz/get/76eaac78-fd43-45a4-b4e6-c6621835f8c8?ts=1730784080",
      "https://storage.alpha-analytics.cz/get/d452d82f-54d2-4744-bd3d-ae114cd71191?ts=1730783993",
      "https://storage.alpha-analytics.cz/get/ecd046cd-7464-4085-a9e0-37a1f3652274?ts=1730783872",
      "https://storage.alpha-analytics.cz/get/8657faee-9395-48e7-bf6a-4f1816b63bef?ts=1730783969",
      "https://storage.alpha-analytics.cz/get/69ccb0fb-72a0-473d-995b-4cbef8bfed45?ts=1730784045",
      "https://storage.alpha-analytics.cz/get/13e73536-7fa5-4766-8ead-350813f67adf?ts=1730784081",
      "https://storage.alpha-analytics.cz/get/94127a84-cb48-461f-af55-0e61725a39e0?ts=1730784280"
    ],
    "price_data": {
      "price": "62700.00",
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
      "id": "2",
      "name": "Sedans / saloons",
      "slug": "sedans-saloons"
    },
    "power_data": {
      "power": "150",
      "power_unit": "kW"
    },
    "mileage_data": {
      "mileage": "8751.00",
      "mileage_unit": "km"
    },
    "fuel_type": {
      "id": "2",
      "name": "Diesel",
      "slug": "diesel"
    },
    "featured_tags": [
      {
        "id": "66",
        "parentId": "3",
        "name": "MP3 interface",
        "slug": "mp3-interface"
      },
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
      },
      {
        "id": "39",
        "parentId": "2",
        "name": "Lane assist",
        "slug": "lane-assist"
      }
    ]
  },
  {
    "id": "68946731",
    "is_favorite": "0",
    "status": "1",
    "make": {
      "id": "68",
      "name": "Skoda",
      "slug": "skoda"
    },
    "model": {
      "id": "2108",
      "name": "Superb",
      "slug": "superb"
    },
    "meta": {
      "name": "Skoda Superb 2.0 TDI 110 kW",
      "slug": "skoda-superb-2-0-tdi-110-kw",
      "description": "Europe leading online marketplace for buying and selling used cars with warranty and delivery to your home",
      "manufacture_date": "1704067200000",
      "first_registration_date": "1713744000000",
      "created_at": "1730505600000",
      "updated_at": "1730801943000"
    },
    "currency": {
      "id": "1",
      "name": "USD",
      "symbol": "$"
    },
    "images": [
      "https://storage.alpha-analytics.cz/get/315517a0-2916-499b-abc4-dedc2de76058?ts=1730784038",
      "https://storage.alpha-analytics.cz/get/3c899294-95fa-403e-a37d-8d87320a44c8?ts=1730783927",
      "https://storage.alpha-analytics.cz/get/a0ff5ad6-7aec-4f43-a90a-1eb017e76d7a?ts=1730783970",
      "https://storage.alpha-analytics.cz/get/607c2eab-f3be-4860-8b14-aa99bb02a73b?ts=1730784030",
      "https://storage.alpha-analytics.cz/get/0c649265-f232-4101-a41d-427f3ed301b0?ts=1730784038",
      "https://storage.alpha-analytics.cz/get/5d39845e-4d02-4b7d-97a6-ba3cdaf0750c?ts=1730783767",
      "https://storage.alpha-analytics.cz/get/dc0d5c34-bdcb-4a1f-9352-20276e8d2711?ts=1730784006",
      "https://storage.alpha-analytics.cz/get/f7371c21-87cc-4b0a-a518-0fea50c3fe7f?ts=1730783965",
      "https://storage.alpha-analytics.cz/get/523d27ef-7f5d-4f1f-826e-45d634dd777d?ts=1730783998",
      "https://storage.alpha-analytics.cz/get/d30e9215-ba7e-432a-82bd-1664825a2d13?ts=1730783974",
      "https://storage.alpha-analytics.cz/get/ec5f1ac0-139b-4bfe-aa04-9a7e1c36e784?ts=1730783986",
      "https://storage.alpha-analytics.cz/get/770a4fbd-c12a-4ef1-adcc-508b1c73b888?ts=1730783999",
      "https://storage.alpha-analytics.cz/get/041730ea-7599-4d33-a1f0-88397315ccf7?ts=1730783999",
      "https://storage.alpha-analytics.cz/get/9004ec0f-fece-4af7-8b24-5c3f5af5b781?ts=1730783965",
      "https://storage.alpha-analytics.cz/get/a77e1316-4880-4067-9972-6f422660ef5d?ts=1730783889",
      "https://storage.alpha-analytics.cz/get/6b760579-07dc-4a36-b455-0148c6726cbc?ts=1730783991",
      "https://storage.alpha-analytics.cz/get/6078d61e-c4ea-4d0e-ad29-e1a28c2284c7?ts=1730783991",
      "https://storage.alpha-analytics.cz/get/5ed2ba82-6902-4529-ba9f-8b5279f5995e?ts=1730783874",
      "https://storage.alpha-analytics.cz/get/96cf23f4-035c-4fe5-8f52-988961f348a7?ts=1730784002",
      "https://storage.alpha-analytics.cz/get/110c7ce6-4426-48fe-a3e1-35cd55b9ba37?ts=1730783882",
      "https://storage.alpha-analytics.cz/get/20de34a0-ae47-47d5-83d3-479b04529b45?ts=1730783987",
      "https://storage.alpha-analytics.cz/get/6a2e3474-ac36-4a3b-87dd-8051eaba2129?ts=1730783961",
      "https://storage.alpha-analytics.cz/get/080b9728-f4fa-4734-bbc6-6a98f03789da?ts=1730783998",
      "https://storage.alpha-analytics.cz/get/b4d054b0-ae95-4ffe-9079-c16bf4256ae3?ts=1730783988",
      "https://storage.alpha-analytics.cz/get/e4176ab2-374c-4233-8d8e-0d20989452d6?ts=1730783974"
    ],
    "price_data": {
      "price": "46364.00",
      "vat_rate": "19.00",
      "price_without_vat": "37554.84",
      "price_start": "51000.40",
      "discount": "5100.04"
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
      "id": "3",
      "name": "Station Wagon",
      "slug": "station-wagon"
    },
    "power_data": {
      "power": "110",
      "power_unit": "kW"
    },
    "mileage_data": {
      "mileage": "4626.00",
      "mileage_unit": "km"
    },
    "fuel_type": {
      "id": "2",
      "name": "Diesel",
      "slug": "diesel"
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
        "id": "15",
        "parentId": "2",
        "name": "Trailer stability assist (TSA)",
        "slug": "trailer-stability-assist-tsa"
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
    "id": "68946749",
    "is_favorite": "0",
    "status": "1",
    "make": {
      "id": "52",
      "name": "Mercedes-Benz",
      "slug": "mercedes-benz"
    },
    "model": {
      "id": "0",
      "name": null,
      "slug": "n-a"
    },
    "meta": {
      "name": "Mercedes-Benz GLC 220 d 4Matic 143 kW",
      "slug": "mercedes-benz-glc-220-d-4matic-143-kw",
      "description": "Europe leading online marketplace for buying and selling used cars with warranty and delivery to your home",
      "manufacture_date": "1604188800000",
      "first_registration_date": "1604188800000",
      "created_at": "1727568000000",
      "updated_at": "1730801943000"
    },
    "currency": {
      "id": "1",
      "name": "USD",
      "symbol": "$"
    },
    "images": [
      "https://storage.alpha-analytics.cz/get/95494757-f553-4906-9335-cf906bdb5b1c?ts=1730783786",
      "https://storage.alpha-analytics.cz/get/24df688b-5121-497d-b102-5258ec8fcc09?ts=1730784231",
      "https://storage.alpha-analytics.cz/get/53332417-54c1-49a7-b1b1-fc07341f1fb6?ts=1730783881",
      "https://storage.alpha-analytics.cz/get/2810a8e7-5afc-4493-b786-955fc4e86f5d?ts=1730784226",
      "https://storage.alpha-analytics.cz/get/d4fa81ef-2870-49a1-97ff-2c0aaf3a5b00?ts=1730783788",
      "https://storage.alpha-analytics.cz/get/794af0a9-851a-4254-afd4-ae2dbc540664?ts=1730784002",
      "https://storage.alpha-analytics.cz/get/0c4a1520-1071-4190-a660-730e9c51f5b7?ts=1730783998",
      "https://storage.alpha-analytics.cz/get/8f26ccb7-90b9-405e-9964-1400e9d27241?ts=1730783985",
      "https://storage.alpha-analytics.cz/get/a61f231a-d6dc-4f52-8a14-8c21dede5557?ts=1730784000",
      "https://storage.alpha-analytics.cz/get/102055d0-8b12-4d75-907c-240fa27353cb?ts=1730783998",
      "https://storage.alpha-analytics.cz/get/42f4da1a-1c5e-4ee1-ad89-9a875b340927?ts=1730783986",
      "https://storage.alpha-analytics.cz/get/4eb90123-37b7-461d-90a0-862fb6c27163?ts=1730783927",
      "https://storage.alpha-analytics.cz/get/00a2034a-d766-4462-9007-133950e4ea15?ts=1730784307",
      "https://storage.alpha-analytics.cz/get/fd894787-707e-441c-9339-f93e329cd50c?ts=1730783938",
      "https://storage.alpha-analytics.cz/get/f7c0d6ca-31be-4f51-a14a-c1dbc8cd7588?ts=1730783938",
      "https://storage.alpha-analytics.cz/get/692d538f-6a41-4c19-aa4a-303de6e54654?ts=1730783874",
      "https://storage.alpha-analytics.cz/get/71eabb25-f546-4052-83e3-f9facbb5b333?ts=1730783936",
      "https://storage.alpha-analytics.cz/get/44a22ac6-1e7f-4a67-a239-f2f81f1ed626?ts=1730784042",
      "https://storage.alpha-analytics.cz/get/f0059e22-3d8f-41ae-9e80-f6ac7b24f6b0?ts=1730783886",
      "https://storage.alpha-analytics.cz/get/5beb1152-9e02-4894-8d3f-2f75939ab5db?ts=1730783999",
      "https://storage.alpha-analytics.cz/get/5169c89e-2821-47c8-8c4e-20bd13c471fa?ts=1730783938",
      "https://storage.alpha-analytics.cz/get/66e6d27a-0c9a-498d-b7d8-506ec492b56e?ts=1730783790",
      "https://storage.alpha-analytics.cz/get/a4baf35f-db20-48c8-99e7-a6f43b68c7b7?ts=1730783997",
      "https://storage.alpha-analytics.cz/get/c7b9dac0-08ae-45c5-9104-2ade1f550a66?ts=1730783940",
      "https://storage.alpha-analytics.cz/get/9ff2b64c-be49-41e5-ab4c-fd94c02e2069?ts=1730783888",
      "https://storage.alpha-analytics.cz/get/11d418a9-881e-4235-a9fe-e489ce2ddacd?ts=1730783937",
      "https://storage.alpha-analytics.cz/get/ff277086-a03b-4d47-a021-dc659c23d7d0?ts=1730783853",
      "https://storage.alpha-analytics.cz/get/92bbeda1-858e-4568-bec8-9a527d6ccc80?ts=1730783888"
    ],
    "price_data": {
      "price": "48144.00",
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
      "power": "143",
      "power_unit": "kW"
    },
    "mileage_data": {
      "mileage": "49658.00",
      "mileage_unit": "km"
    },
    "fuel_type": {
      "id": "2",
      "name": "Diesel",
      "slug": "diesel"
    },
    "featured_tags": [
      {
        "id": "13",
        "parentId": "2",
        "name": "ESP",
        "slug": "esp"
      },
      {
        "id": "25",
        "parentId": "2",
        "name": "Emergency braking assist (EBA, ABS)",
        "slug": "emergency-braking-assist-eba-abs"
      },
      {
        "id": "42",
        "parentId": "2",
        "name": "Tyre pressure monitoring",
        "slug": "tyre-pressure-monitoring"
      },
      {
        "id": "21",
        "parentId": "2",
        "name": "Keyless entry",
        "slug": "keyless-entry"
      },
      {
        "id": "34",
        "parentId": "2",
        "name": "Keyless ignition",
        "slug": "keyless-ignition"
      },
      {
        "id": "44",
        "parentId": "3",
        "name": "DAB radio",
        "slug": "dab-radio"
      },
      {
        "id": "48",
        "parentId": "3",
        "name": "USB",
        "slug": "usb"
      },
      {
        "id": "69",
        "parentId": "3",
        "name": "Radio",
        "slug": "radio"
      },
      {
        "id": "109",
        "parentId": "5",
        "name": "Multifunctional steering wheel",
        "slug": "multifunctional-steering-wheel"
      }
    ]
  },
  {
    "id": "68947039",
    "is_favorite": "0",
    "status": "1",
    "make": {
      "id": "42",
      "name": "Land Rover",
      "slug": "land-rover"
    },
    "model": {
      "id": "0",
      "name": null,
      "slug": "n-a"
    },
    "meta": {
      "name": "Land Rover Defender 110 2.0 D240 177 kW",
      "slug": "land-rover-defender-110-2-0-d240-177-kw",
      "description": "Europe leading online marketplace for buying and selling used cars with warranty and delivery to your home",
      "manufacture_date": "1606780800000",
      "first_registration_date": "1606780800000",
      "created_at": "1730505600000",
      "updated_at": "1730801904000"
    },
    "currency": {
      "id": "1",
      "name": "USD",
      "symbol": "$"
    },
    "images": [
      "https://storage.alpha-analytics.cz/get/d07f5a2c-905d-45be-85d3-9a38f0926d07?ts=1730784121",
      "https://storage.alpha-analytics.cz/get/cc33cae2-466c-43aa-b39b-e35968ea0b18?ts=1730784217",
      "https://storage.alpha-analytics.cz/get/f409bbad-1c5f-486e-bdf8-713b9d976873?ts=1730784184",
      "https://storage.alpha-analytics.cz/get/92b76ada-d0b3-4a06-925f-a3fce9e02994?ts=1730784142",
      "https://storage.alpha-analytics.cz/get/41ce316a-ca77-40c0-851e-42272c2fd58d?ts=1730784223",
      "https://storage.alpha-analytics.cz/get/5fc9010f-722a-4ef9-9cb4-7e850b6c8c41?ts=1730784226",
      "https://storage.alpha-analytics.cz/get/004ad08e-0287-486c-b411-209dcbab104d?ts=1730784126",
      "https://storage.alpha-analytics.cz/get/c501dc26-0b99-42c8-8c77-e6a4b5acd850?ts=1730784173",
      "https://storage.alpha-analytics.cz/get/c380924c-77e1-48e5-b354-068fddf415f5?ts=1730784170",
      "https://storage.alpha-analytics.cz/get/b0c48a57-089a-4490-9a79-60426654b4d6?ts=1730784134",
      "https://storage.alpha-analytics.cz/get/66a621a5-0772-4dfa-a9b8-6fd2d14b990f?ts=1730784171",
      "https://storage.alpha-analytics.cz/get/adc1108f-7dba-45ae-a4fb-7df3de3af296?ts=1730783984",
      "https://storage.alpha-analytics.cz/get/6ab4440a-4d96-400c-96db-91bf113357d8?ts=1730783985",
      "https://storage.alpha-analytics.cz/get/6b4e7d19-a151-41cc-9b07-ab053d66162e?ts=1730784171",
      "https://storage.alpha-analytics.cz/get/7e384d28-d577-46f7-9a47-92edc9c9fe46?ts=1730784155",
      "https://storage.alpha-analytics.cz/get/979f42f1-45d6-4f87-9092-5e1bef223ecf?ts=1730784225",
      "https://storage.alpha-analytics.cz/get/fb9d43e5-7d47-44ba-a892-742c84fed175?ts=1730784216",
      "https://storage.alpha-analytics.cz/get/1ecd15bb-841e-4e6b-891c-2bba146f8160?ts=1730784116",
      "https://storage.alpha-analytics.cz/get/4ba65fa3-c090-4743-afac-b8265740980b?ts=1730783989",
      "https://storage.alpha-analytics.cz/get/2dc08b1f-40dc-4606-8d0b-c23ea85056b5?ts=1730784171",
      "https://storage.alpha-analytics.cz/get/2e537fba-ceef-41cf-bb86-946d8f5b8a7b?ts=1730784077",
      "https://storage.alpha-analytics.cz/get/f47be12d-5ad6-4490-8a2b-92897909e253?ts=1730784219",
      "https://storage.alpha-analytics.cz/get/3c4fd5ab-b851-4dbe-92c5-d2bea839c36d?ts=1730783985",
      "https://storage.alpha-analytics.cz/get/345fce01-4d17-4a62-9ca6-9dc6795ce146?ts=1730784157",
      "https://storage.alpha-analytics.cz/get/eac33689-fa7e-4d9e-867a-fe9ab59fad7c?ts=1730784122",
      "https://storage.alpha-analytics.cz/get/652f4545-01f9-40a9-a35b-893087699518?ts=1730784293",
      "https://storage.alpha-analytics.cz/get/b39d0fab-0de8-4036-b0f3-5323391c554b?ts=1730784076",
      "https://storage.alpha-analytics.cz/get/d8b51c3c-424a-4299-aee2-80da6f9b439c?ts=1730784225",
      "https://storage.alpha-analytics.cz/get/e1de57ed-256d-46fc-b69b-e48db71f88f0?ts=1730784085",
      "https://storage.alpha-analytics.cz/get/94e0aa21-622e-45a9-810f-e3ead7cbede4?ts=1730783989",
      "https://storage.alpha-analytics.cz/get/688c2547-a7ba-498f-94c4-d8c9f8e463f9?ts=1730784226",
      "https://storage.alpha-analytics.cz/get/dc7d1d22-5033-468c-bad8-d28a2a7dbcaf?ts=1730784078",
      "https://storage.alpha-analytics.cz/get/868a442e-ff81-4e33-a9b0-9dea49a3d388?ts=1730784213",
      "https://storage.alpha-analytics.cz/get/cbc6a664-f292-4288-b661-4d9aa4fe5f00?ts=1730784171",
      "https://storage.alpha-analytics.cz/get/7750d28e-cc28-4309-8c32-2c74b5650eab?ts=1730784118",
      "https://storage.alpha-analytics.cz/get/10de20d1-cc38-4ad8-98e4-c7705e41334a?ts=1730784171",
      "https://storage.alpha-analytics.cz/get/6f20bff4-a926-475e-bfb2-87eb2e87d8f0?ts=1730784074",
      "https://storage.alpha-analytics.cz/get/7277ed0a-c1a8-4ec3-ac82-f0863cbd24dc?ts=1730784193",
      "https://storage.alpha-analytics.cz/get/47ac0669-4cac-485b-9f50-48bb08cdbe41?ts=1730784069",
      "https://storage.alpha-analytics.cz/get/e9cd00ee-2b0f-4b0d-bfcb-c68ab6c540b7?ts=1730784119",
      "https://storage.alpha-analytics.cz/get/b69cb42f-0edf-4490-950b-2331133dc09d?ts=1730784178",
      "https://storage.alpha-analytics.cz/get/49c09772-882f-4179-b59c-d75ebd86b91a?ts=1730784085",
      "https://storage.alpha-analytics.cz/get/85896121-6792-4583-baae-a4b9b91d12b4?ts=1730784154",
      "https://storage.alpha-analytics.cz/get/10b28bb3-d172-4c42-86e9-9b8a44d54f4c?ts=1730784074",
      "https://storage.alpha-analytics.cz/get/bb75b358-b8a8-473f-b221-70a1fa3a82b3?ts=1730784171",
      "https://storage.alpha-analytics.cz/get/de8a05e1-3322-4705-8390-23898e0b564f?ts=1730784229",
      "https://storage.alpha-analytics.cz/get/743695b5-228c-4ee5-a8dc-3f1b633451d4?ts=1730783989",
      "https://storage.alpha-analytics.cz/get/57a6edee-12bc-4ad5-af19-29de6efd11f7?ts=1730784347"
    ],
    "price_data": {
      "price": "53644.00",
      "vat_rate": "19.00",
      "price_without_vat": "43451.64",
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
      "power": "177",
      "power_unit": "kW"
    },
    "mileage_data": {
      "mileage": "52238.00",
      "mileage_unit": "km"
    },
    "fuel_type": {
      "id": "2",
      "name": "Diesel",
      "slug": "diesel"
    },
    "featured_tags": [
      {
        "id": "37",
        "parentId": "2",
        "name": "Power assisted steering",
        "slug": "power-assisted-steering"
      },
      {
        "id": "30",
        "parentId": "2",
        "name": "Passenger airbag deactivation ",
        "slug": "passenger-airbag-deactivation"
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
        "id": "15",
        "parentId": "2",
        "name": "Trailer stability assist (TSA)",
        "slug": "trailer-stability-assist-tsa"
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
        "id": "36",
        "parentId": "2",
        "name": "Hill descent assist",
        "slug": "hill-descent-assist"
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
      <Container classes={style.container}>
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
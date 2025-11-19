"use client"

import { useTranslations } from 'next-intl'
import { useFilterState } from 'hooks/useFilterState'
import { useDispatch } from 'react-redux'

import { postData } from 'helpers/api'
import { setToastify } from 'store/actions/toastifyAction'

import Container from 'components/Container'
import Debug from 'modules/Debug'
import Equipment from './Equipment'
import Details from './Details'
import Photos from './Photos'
import Price from './Price'
import Meta from './Meta'
import Contact from './Contact'

import style from './index.module.scss'

const INITIAL_FILTER = {
  images: [],
  details: {
    meta: {
      name: '',
      vin: '',
      description: '',
    },
    make: {
      id: "0",
      name: '',
      slug: "n-a"
    },
    model: {
      id: "0",
      name: '',
      slug: "n-a"
    },
    category: {
      id: "0",
      name: "All"
    },
    body: {
      id: "0",
      name: "All",
    },
    transmission: {
      id: "0",
      name: "All"
    },
    drive: {
      id: "0",
      name: "All"
    },
    fuel_type: {
      id: "0",
      name: "All"
    },
    date: {
      manufacture_registration: "",
      first_registration: ""
    },
    mileage_data: {
      mileage: '',
      mileage_unit: {
        id: "1",
        name: "km"
      }
    },
    power_data: {
      capacity: '',
      power: '',
      power_unit: {
        id: "2",
        name: "kw"
      }
    }
  },
  equipment: {
    color: {
      id: "0",
      name: "All"
    },
    number_of_seats: '',
    number_of_doors: '',
    features: []
  },
  contact: {
    name: '',
    surname: "",
    email: "",
    phone: [""],
    messengers: {
      whatsapp: "",
      telegram: ""
    }
  },
  price: {
    price_data: {
      price: '',
      vat_rate: "19.00",
      price_recommended: null,
      price_type: {
        id: "1",
        name: "fixed"
      }
    },
    // price_score: {
    //   cars: 72,
    //   counts: 102,
    //   options: [
    //     "21755",
    //     "25241",
    //     "28727",
    //     "32213",
    //     "35699",
    //     "39184"
    //   ]
    // },
    currency: {
      code: "USD",
      text: "US Dollar",
      symbol: "$"
    }
  },
  stats: {
    seen: {
      value: 459,
      visible: 1
    },
    favorites: {
      value: 17,
      visible: 1
    },
    bargaining: {
      value: 0,
      visible: 1
    },
    exchange: {
      value: 0,
      visible: 1
    },
    questions: {
      value: 0,
      visible: 1
    }
  }
}

const SectionVehicle = ({ id, data, options }) => {
  const t = useTranslations()
  const dispatch = useDispatch()
  const { filter, setFilter, handlePropsChange } = useFilterState(INITIAL_FILTER)

  console.log(data)

  const handleSave = () => {
    const formData = new FormData()
    formData.append('data', JSON.stringify(filter))

    postData('/', formData).then(json => {
      if (json) {
        dispatch(
          setToastify({
            type: 'success',
            text: t('saved'),
          })
        )
      }
    })
  }

  return (
    <section className={style.block}>
      <Container>
        <div className={style.container}>
          <h1>{t(id === '0' ? 'add_vehicle' : 'edit_vehicle')}</h1>
          <Debug data={filter} />
          <Photos
            filter={filter.images}
            handlePropsChange={handlePropsChange}
          />
          <Details
            filter={filter.details}
            handlePropsChange={handlePropsChange}
            handleSave={handleSave}
          />
          <Equipment
            options={options}
            filter={filter.equipment}
            setFilter={setFilter}
            handlePropsChange={handlePropsChange}
            handleSave={handleSave}
          />
          <Price
            filter={filter.price}
            handlePropsChange={handlePropsChange}
            isDisable={!filter.price.price_recommended}
            handleSave={handleSave}
          />
          <Contact
            filter={filter.contact}
            handlePropsChange={handlePropsChange}
            handleSave={handleSave}
          />
          <Meta
            filter={filter.stats}
            handlePropsChange={handlePropsChange}
            handleSave={handleSave}
          />
        </div>
      </Container>
    </section>
  )
}

export default SectionVehicle

import { useEffect } from 'react'

import { ACTIVE, DEFAULT } from 'constant/config'

import { useBrandsStore } from 'stores/brandsStore'
import { useSearchStore } from 'stores/searchStore'

import Label from 'components/Label'
import Toggle from './Toggle'
import List from './List'

import style from './index.module.scss'

const Brands = ({
  show,
  setShow,
  isWide = false,
  isLabel = false,
  label = null
}) => {
  const { brands } = useBrandsStore()
  const { search, setSearch } = useSearchStore()

  useEffect(() => {
    const updatedFilters = JSON.parse(JSON.stringify(search))

    Object.keys(updatedFilters).forEach((key) => {
      if (key.includes('make_')) {
        delete updatedFilters[key]
      }
    });

    brands.forEach((brand) => {
      let selectedOptions = brand.options
        .filter(option => option.selected === ACTIVE)
        .map(option => option.id)

      if (selectedOptions.includes(DEFAULT)) {
        selectedOptions = [DEFAULT]
      }

      if (selectedOptions.length > 0) {
        updatedFilters[`make_${brand.id}`] = {
          value: selectedOptions
        }
      }
    })

    setSearch(updatedFilters)
  }, [brands])

  return (
    <div className={style.block}>
      {
        isLabel &&
        <Label
          data={label}
        />
      }
      <List
        show={show}
        setShow={setShow}
        isWide={isWide}
      />
      <Toggle
        show={show}
        setShow={setShow}
        isWide={isWide}
      />
    </div>
  )
}

export default Brands

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ACTIVE, DEFAULT } from 'constant/config'

import { setSearch } from 'store/actions/searchAction'

import Toggle from './Toggle'
import List from './List'

import style from './index.module.scss'

const Brands = ({ show, setShow, isWide = false }) => {
  const dispatch = useDispatch()
  const brands = useSelector((state) => state.brands)
  const search = useSelector((state) => state.search)

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

    dispatch(setSearch(updatedFilters))
  }, [brands])

  return (
    <div className={style.block}>
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

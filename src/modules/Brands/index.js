import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ACTIVE, DEFAULT } from '@/constant/config'

import { overflowBody } from '@/helpers/overflowBody'
import { setSearch } from '@/store/actions/searchAction'

import Toggle from './Toggle'
import Modal from './Modal'
import List from './List'

import style from './index.module.scss'

const Brands = ({ isWide = false }) => {
  const dispatch = useDispatch()
  const brands = useSelector((state) => state.brands)
  const search = useSelector((state) => state.search)
  const [show, setShow] = useState(false)

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
        selectedOptions = [ACTIVE]
      }

      if (selectedOptions.length > 0) {
        updatedFilters[`make_${brand.id}`] = {
          value: selectedOptions
        }
      }
    })

    dispatch(setSearch(updatedFilters))
  }, [brands])

  useEffect(() => {
    overflowBody(show)
  }, [show])

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
      {
        show &&
        <Modal
          show={show}
          setShow={setShow}
        />
      }
    </div>
  )
}

export default Brands

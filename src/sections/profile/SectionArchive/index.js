"use client"

import { useTranslations } from 'next-intl'
import { useState } from 'react'

import useData from './useData'

import { ROUTES_USER } from 'constant/config'

import Container from 'components/Container'
import Button from 'components/Button'
import Select from 'components/Select'
import Checkbox from 'components/Checkbox'
import Card from 'modules/Card'
import Skeleton from 'modules/Skeleton'
import Pagination from 'modules/Pagination'
import Sort from 'modules/Sort'
import EmptyCars from 'modules/EmptyCars'
import Search from 'modules/Search'

import style from './index.module.scss'

const ACTIONS = [
  'select_action',
  'restore',
  'delete',
]

const SectionArchive = ({ initialData }) => {
  const t = useTranslations()
  const favoriteProps = useData(initialData)
  const [action, setAction] = useState(0)
  const [all, setAll] = useState('0')
  const [selected, setSelected] = useState([])

  const {
    handleChange,
    data,
    loading,
    pagination,
    search,
  } = favoriteProps

  const handleSelect = (id) => {
    setSelected((prev) => {
      const newSelected = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]

      setAll(newSelected.length === data?.data?.length ? '1' : '0')
      return newSelected
    })
  }

  const handleSelectAll = (value) => {
    setAll(value)
    setSelected(value === '1' ? data?.data?.map((el) => el.id) : [])
  }

  return (
    <section className={style.block}>
      <Container classes={style.container}>
        <h1>{t(ROUTES_USER.archive.text)}</h1>
        {
          data?.data?.length > 0
            ?
            <>
              <div className={style.meta}>
                <Sort
                  results={pagination.results}
                  search={search}
                  handleChange={handleChange}
                />
                <div className={style.wrapper}>
                  <Search />
                  <div className={style.actions}>
                    <Checkbox
                      placeholder={t('actions.select_all')}
                      data={all}
                      onChange={(value) => handleSelectAll(value)}
                    />
                    <div className={style.form}>
                      <Select
                        id="select_action"
                        placeholder={t(`actions.${ACTIONS[0]}`)}
                        options={
                          ACTIONS.map((action, idx) => ({
                            value: idx,
                            label: t(`actions.${action}`),
                          }))
                        }
                        data={action}
                        onChange={(value) => setAction(value)}
                      />
                      <Button
                        classes={['primary', 'sm']}
                        placeholder={t('actions.apply')}
                        isDisabled={action === 0}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={style.cards}>
                {
                  pagination.pages > 1 &&
                  <Pagination filtersProps={favoriteProps} />
                }
                {
                  data?.data?.map((el, idx) =>
                    loading
                      ?
                        <Skeleton key={idx} />
                      :
                        <div
                          key={idx}
                          className={style.card}
                        >
                          <Card
                            data={el}
                            isProfile={true}
                          />
                          <label className={style.checkbox}>
                            <input
                              type={"checkbox"}
                              className={style.input}
                              checked={selected.includes(el.id)}
                              onChange={() => handleSelect(el.id)}
                            />
                            <span className={style.toggle} />
                          </label>
                        </div>
                  )
                }
                {
                  pagination.pages > 1 &&
                  <Pagination filtersProps={favoriteProps} />
                }
              </div>
            </>
            :
            <EmptyCars />
        }
      </Container>
    </section>
  )
}

export default SectionArchive

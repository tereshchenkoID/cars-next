import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { NAVIGATION } from 'constant/config'

import classNames from 'classnames'

import Button from 'components/Button'
import Icon from 'components/Icon'
import Reference from 'components/Reference'
import Backdrop from 'modules/Modals/Backdrop'
import History from './History'
import Saved from './Saved'
import All from './All'

import style from './index.module.scss'

const TABS = [
  { icon: "sliders", text: "all" },
  { icon: "bookmark", text: "saved" },
  { icon: "history", text: "history" }
]

const Filters = ({
  show,
  setShow,
  showBrand,
  setShowBrands,
  filtersProps,
  loading
}) => {
  const t = useTranslations()
  const [active, setActive] = useState(0)
  const {
    handleLoad,
    handleReset,
    searchParams,
  } = filtersProps

  return (
    <>
      <Backdrop
        data={show}
        onChange={() => setShow(false)}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setShow(false)
          handleLoad(0)
        }}
        className={
          classNames(
            style.block,
            show && style.active
          )
        }
      >
        <div className={style.header}>
          <div className={style.title}>
            <h6>{t('filter')}</h6>
            {
              (searchParams.size > 0 && active === 0) &&
              <Button
                icon={'trash'}
                classes={['secondary', 'square', 'sm']}
                onChange={handleReset}
                title={t('remove')}
              />
            }
          </div>
          <div className={style.tab}>
            {
              TABS.map((el, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={t(el.text)}
                  title={t(el.text)}
                  className={
                    classNames(
                      style.option,
                      active === idx && style.active
                    )
                  }
                  onClick={() => setActive(idx)}
                >
                  <Icon
                    iconName={el.icon}
                    width={24}
                    height={24}
                  />
                  <span className={style.label}>{t(el.text)}</span>
                </button>
              ))
            }
          </div>
        </div>
        <div className={style.content}>
          {
            active === 0 &&
            <All
              filtersProps={filtersProps}
              showBrand={showBrand}
              setShowBrands={setShowBrands}
            />
          }

          {
            active === 1 &&
            <Saved
              filtersProps={filtersProps}
              setActive={setActive}
              setShow={setShow}
            />
          }

          {
            active === 2 &&
            <History
              filtersProps={filtersProps}
              setActive={setActive}
              setShow={setShow}
            />
          }
        </div>
        {
          active === 0 &&
          <div className={style.footer}>
            <Button
              type={"submit"}
              classes={['primary', 'md', 'wide']}
              placeholder={t('search')}
              isLoading={loading}
            />
            <Reference
              link={NAVIGATION.advanced_search.link}
              classes={['alt', 'md', 'wide']}
              placeholder={t(NAVIGATION.advanced_search.text)}
            />
          </div>
        }
      </form>
    </>
  )
}

export default Filters

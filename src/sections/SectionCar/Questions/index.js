"use client"

import { useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'
import { Fragment, useState, useMemo } from 'react'
import { useModal } from 'context/ModalContext'

import classNames from 'classnames'

import { validationRules } from 'utils/validationRules'

import { getDate } from 'helpers/getDate'

import Textarea from 'components/Textarea'
import Button from 'components/Button'
import Avatar from 'modules/Avatar'
import LoginModal from 'modules/LoginModal'
import InputGroup from 'modules/InputGroup'

import style from './index.module.scss'

const DATA = [
  {
    "data": "1731154393000",
    "url": "https://lh3.googleusercontent.com/a/ACg8ocJom5-CoLFgU1LqOH_o070GgzIkuVtZUyyE36p5iT2jDuoJFm0L=s96-c",
    "name": "Friedrich M.",
    "text": "CarAudit is an important part of this service. The first car I wanted to buy had a major defect discovered that I would not have found during the inspection myself, which I am very happy about. You saved me from a bad buy. The second car has meanwhile passed the inspection without losing a single point and runs excellently. I'm glad I tried this new thing.",
    "answer": {
      "data": "1729814400000",
      "url": "https://lh3.googleusercontent.com/a/ACg8ocJom5-CoLFgU1LqOH_o070GgzIkuVtZUyyE36p5iT2jDuoJFm0L=s96-c",
      "name": "Tester",
      "text": "CarAudit is an important part of this service.",
    }
  },
]

const Questions = ({ data }) => {
  const t = useTranslations()
  const auth = useSelector((state) => state.auth)
  const isAuth = auth?.id
  const { showModal } = useModal()
  const [filter, setFilter] = useState({
    question: {
      value: '',
      isValid: false
    }
  })

  const handleChange = (field, { value, isValid }) => {
    setFilter((prevData) => ({
      ...prevData,
      [field]: { value, isValid },
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    isAuth
      ?
        alert("Work")
      :
        showModal(
          <LoginModal />
        )
  }

  const isFormValid = useMemo(() => {
    return Object.values(filter).every((field) => field.isValid)
  }, [filter])

  return (
    <div className={style.block}>
      {/* <pre className={style.pre}>{JSON.stringify(filter, null, 2)}</pre> */}

      <ul className={style.badges}>
        {
          Array.from({ length: 5 }, (_, idx) =>
            <li
              key={idx}
              className={style.badge}
              onClick={() => handleChange('question', { value: `${t(`rules.questions.${idx}`)}?`, isValid: true })}
            >
              {t(`rules.questions.${idx}`)}?
            </li>
          )
        }
      </ul>

      <form
        className={style.form}
        onSubmit={handleSubmit}
      >
         <InputGroup
          value={filter.question.value}
          rules={[
            validationRules.required,
            validationRules.minLength(5)
          ]}
          onValidationChange={(isValid) =>
            handleChange('question', { value: filter.question.value, isValid })
          }
        >
          <Textarea
            placeholder={t('question')}
            data={filter.question.value}
            onChange={(value) => handleChange('question', { value, isValid: filter.question.isValid })}
          />
        </InputGroup>

        {/* <Textarea
          placeholder={t('question')}
          data={search}
          onChange={(value) => setSearch(value)}
        /> */}
        <Button
          type={'submit'}
          placeholder={t('actions.send')}
          classes={['primary', style.button]}
          isDisabled={!isFormValid}
        />
      </form>
      <hr className={style.hr} />
      <h6 className={style.title}>{t('questions')} ({DATA.length})</h6>
      <div>
        <ul className={style.list}>
          {
            DATA.map((el, idx) =>
              <Fragment key={idx}>
                <li className={style.question}>
                  <div className={style.head}>
                    <Avatar
                      src={el.url}
                      alt={el.name}
                    />
                    <div className={style.content}>
                      <p className={style.date}>{getDate(el.data, 3)}</p>
                      <h6 className={style.name}>{el.name}</h6>
                      <p className={style.text}>{el.text}</p>
                    </div>
                  </div>
                </li>
                {
                  el.answer &&
                  <li
                    className={
                      classNames(
                        style.question,
                        style.alt
                      )
                    }
                  >
                    <div className={style.head}>
                      <Avatar
                        src={el.answer.url}
                        alt={el.answer.name}
                      />
                      <div className={style.content}>
                        <p className={style.date}>{getDate(el.answer.data, 3)}</p>
                        <h6 className={style.name}>{el.answer.name}</h6>
                        <p className={style.text}>{el.answer.text}</p>
                      </div>
                    </div>
                  </li>
                }
              </Fragment>
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default Questions

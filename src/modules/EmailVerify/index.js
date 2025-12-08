import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { DOCUMENTS_VERIFICATIONS } from 'constant/config'

import { useToastifyStore } from 'stores/toastifyStore'
import { postData } from 'helpers/api'

import Button from 'components/Button'
import Field from 'components/Field'
import Status from 'modules/Status'

import style from './index.module.scss'

const EmailVerify = ({ name, filter, handlePropsChange }) => {
  const t = useTranslations()
  const showToast = useToastifyStore(state => state.showToast)
  const [code, setCode] = useState('')
  const action = filter.status === 0 ? 'getCode' : 'verify'

  const handleSubmit = (repeat) => {
    const formData = new FormData()
    formData.append('action', repeat ? 'getCode' : action)

    if (filter.status !== '0') (
      formData.append('code', code)
    )

    postData('profile/email/', formData).then(json => {
      if (json.code === "0") {
        showToast(
          'success',
          json.message
        )
        handlePropsChange(json.status || '2')
        setCode('')
      }
      else {
        showToast(
          'error',
          json.error_message
        )
      }
    })
  }

  return (
    <div className={style.block}>
      <div className={style.left}>
        <Field
          type={'email'}
          placeholder={t('email')}
          data={filter.data}
          classes={[style.field]}
          onChange={(value) => handlePropsChange(`${name}.data`, value)}
          isRequired={true}
          isLabel={true}
          isDisabled={filter.status === 1}
        />
      </div>
      <div className={style.right}>
        {
          filter.status === '2' &&
          <Field
            type={'text'}
            placeholder={t('code')}
            data={code}
            classes={[style.field]}
            onChange={value => setCode(value)}
            isRequired={true}
          />
        }
        {
          (filter.status === '1' ||  filter.status === '3') &&
          <Status
            type={DOCUMENTS_VERIFICATIONS[filter.status]}
            data={t(`verification.${DOCUMENTS_VERIFICATIONS[filter.status]}`)}
          />
        }
        {
          (filter.status === '0' ||  filter.status === '2') &&
          <Button
            classes={['primary', 'sm']}
            placeholder={t(filter.status === '0' ? 'verify' : 'send')}
            onChange={() => handleSubmit(false)}
          />
        }
        {
          filter.status === '2' &&
          <Button
            classes={['primary', 'square', 'sm']}
            onChange={() => handleSubmit(true)}
            icon={'reload'}
          />
        }
      </div>
    </div>
  )
}

export default EmailVerify

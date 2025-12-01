import {useEffect, useState} from 'react'
import { useTranslations } from 'next-intl'

import { DOCUMENTS_TYPE, DOCUMENTS_VERIFICATIONS } from 'constant/config'

import Image from 'next/image'
import Button from 'components/Button'
import Accordion from 'modules/Accordion'
import PhotoEditor from 'modules/PhotoEditor'
import ImageUploader from 'modules/ImageUploader'
import Switcher from 'modules/Switcher'
import Status from 'modules/Status'

import style from '../index.module.scss'

const Verified = ({ type, filter, handlePropsChange, handleSave }) => {
  const t = useTranslations()
  const [toggle, setToggle] = useState(false)
  const [active, setActive] = useState(0)

  const [file, setFile] = useState()
  const [showEditor, setShowEditor] = useState(false)

  const urlToFile = async (url, filename) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], 'editor', { type: blob.type })
  }

  const handleDelete = (idx) => {
    const updatedImages = filter[active].data.filter((_, index) => index !== idx)
    handlePropsChange(`documents.${active}.data`, updatedImages)
  }

  const openEditor = async (image) => {
    const blob = await urlToFile(image)
    setFile(blob)
    setShowEditor(true)
  }

  const hideEditor = () => {
    setShowEditor(false)
  }

  useEffect(() => {
    setActive(0)
  }, [type])

  return (
    <Accordion
      data={toggle}
      action={() => setToggle(!toggle)}
      icon={'certificated'}
      placeholder={t('verified')}
    >
      <div className={style.form}>
        <div className={style.list}>
          <Switcher
            data={filter.map((el, _) => `documents.${DOCUMENTS_TYPE[el.type]}`)}
            active={active}
            setActive={setActive}
            disabled={type === 0 ? [2, 3] : []}
          />
          <div className={style.document}>
            <Status
              type={DOCUMENTS_VERIFICATIONS[filter[active].status]}
              data={t(`verification.${DOCUMENTS_VERIFICATIONS[filter[active].status]}`)}
            />
            <ImageUploader
              uploaded={filter[active].uploaded}
              handlePropsChange={(images) => handlePropsChange(`documents.${active}.uploaded`, images)}
            />
            <hr />
            <div className={style.images}>
              {
                filter[active].data.map((el, idx) =>
                  <div
                    key={idx}
                    className={style.picture}
                  >
                    <Image
                      src={el}
                      width={200}
                      height={200}
                      className={style.image}
                      priority={false}
                      alt={`${t('image')} ${idx}`}
                    />
                    <div className={style.toggle}>
                      <Button
                        icon={'edit'}
                        classes={['primary', 'square', 'xs']}
                        onChange={() => openEditor(el)}
                      />
                      <Button
                        icon={'trash'}
                        classes={['primary', 'square', 'xs']}
                        onChange={() => handleDelete(idx)}
                      />
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <div className={style.footer}>
          <Button
            classes={['primary', 'md']}
            placeholder={t('actions.save')}
          />
        </div>
      </div>
      {
        showEditor &&
        <PhotoEditor
          blob={file}
          onClose={hideEditor}
        />
      }
    </Accordion>
  )
}

export default Verified

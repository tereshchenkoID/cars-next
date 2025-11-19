import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { useModal } from 'context/ModalContext'

import Image from 'next/image'
import Button from 'components/Button';
import Accordion from 'modules/Accordion'
import ImageUploader from './ImageUploader'
import RulesModal from './RulesModal'
import PhotoEditor from './PhotoEditor'

import style from '../index.module.scss'

const COUNTS = 15

const Photos = ({ filter, handlePropsChange }) => {
  const t = useTranslations()
  const { showModal, closeModal } = useModal()

  const [toggle, setToggle] = useState(true)
  const [file, setFile] = useState()
  const [showEditor, setShowEditor] = useState(false)

  const urlToFile = async (url, filename) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], 'editor', { type: blob.type })
  }

  const openEditor = async (image) => {
    const blob = await urlToFile(image)
    setFile(blob)
    setShowEditor(true)
  }

  const hideEditor = () => {
    setShowEditor(false)
  }

  const handleSave = async (editedDataURL) => {
    if (!file) return

    const editedBlob = await fetch(editedDataURL).then((res) => res.blob())

    console.log(editedBlob, editedDataURL)
  }

  const handleDelete = (idx) => {
    const updatedImages = filter.filter((_, index) => index !== idx)
    handlePropsChange('images', updatedImages)
  }

  return (
    <Accordion
      data={toggle}
      action={() => setToggle(!toggle)}
      icon={'user'}
      placeholder={t('photos')}
    >
      <div className={style.head}>
        <div>{filter.length || 0} - {COUNTS} {t('rules.upload_photo.title')}</div>
        <Button
          classes={['reference']}
          placeholder={t('rules.upload_photo.text')}
          onChange={() => showModal(<RulesModal />)}
        />
      </div>
      <ImageUploader />
      {
        filter.length > 0 &&
        <>
          <hr className={style.hr} />
          <div className={style.images}>
            {
              filter.map((el, idx) =>
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
          <div className={style.footer}>
            <Button
              classes={['primary', 'md']}
              placeholder={t('actions.next')}
            />
          </div>
        </>
      }
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

export default Photos

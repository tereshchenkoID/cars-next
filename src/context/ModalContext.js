import { createContext, useState, useContext } from 'react'

import Modal from 'components/Modal'

const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null)
  const [modalTitle, setModalTitle] = useState('');
  const [isOpen, setIsOpen] = useState(false)

  const showModal = (content, title) => {
    setModalContent(content)
    setModalTitle(title)
    setIsOpen(true)
  }

  const closeModal = () => {
    setModalContent(null)
    setModalTitle('')
    setIsOpen(false)
  }

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      {isOpen && (
        <Modal onClose={closeModal} title={modalTitle}>
          {modalContent}
        </Modal>
      )}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  return useContext(ModalContext)
}

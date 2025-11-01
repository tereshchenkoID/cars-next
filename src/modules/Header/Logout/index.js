import { signOut } from 'next-auth/react'
import { useDispatch } from 'react-redux'

import { setAuth } from 'store/actions/authAction'

import Button from 'components/Button'

const Logout = ({ setShow }) => {
  const dispatch = useDispatch()

  const handleLogout = async () => {
    await signOut({ redirect: window.location.href })
    setShow(false)
    dispatch(setAuth(null))
  }

  return (
    <Button
      icon={'arrow-right-from-bracket'}
      classes={['secondary', 'square']}
      onChange={handleLogout}
    />
  )
}

export default Logout

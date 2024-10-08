import { useDispatch } from 'react-redux'

import { setAuth } from '@/store/actions/authAction'
import { getData } from '@/helpers/api'

import Button from '@/components/Button'

const Logout = ({ setShow }) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    getData('logout/').then(json => {
      dispatch(setAuth(json))
      setShow(false)
    })
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
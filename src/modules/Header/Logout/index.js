import { useDispatch } from 'react-redux'
import { useRouter } from 'nextjs-toploader/app';

import { setAuth } from '@/store/actions/authAction'
import { getData } from '@/helpers/api'

import Button from '@/components/Button'

const Logout = ({ setShow }) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLogout = () => {
    getData('logout/').then(json => {
      dispatch(setAuth(json))
      setShow(false)
      router.push('/')
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
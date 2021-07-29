import React, { useEffect } from 'react'
import { logoutIcon} from '../../images/index'
import { useHistory } from 'react-router-dom'
import { logout } from '../../tools/account'

export default function Logout(props) {
  const history = useHistory()

  useEffect(() => {
    if (!props.isLoggedIn) {
      history.push('/login')
    }
  }, [props.isLoggedIn, history])

  function handleLogout() {
    logout(() => {
      props.setLoggedIn(false)
    })
  }

  return (
    <img alt='log out' src={logoutIcon} onClick={handleLogout}/>
  )
}

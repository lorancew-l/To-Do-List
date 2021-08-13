import React, { useEffect } from 'react'
import { logoutIcon} from '../../images/index'
import { useHistory } from 'react-router-dom'
import { logout } from '../../tools/api/rest/authorization'

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
    <button onClick={handleLogout}>
      <img alt='log out' src={logoutIcon}/>
    </button>
  )
}

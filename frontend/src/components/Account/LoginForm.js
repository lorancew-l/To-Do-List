import React, { useEffect } from 'react'
import AccountForm from './AccountForm'
import StandalonePage from '../StandalonePage/StandalonePage'
import { login } from '../../tools/account'
import { useHistory, Link } from 'react-router-dom' 
import useInput from '../../hooks/useInput'


export default function LoginForm(props) {
  const email = useInput('')
  const password = useInput('')
  const history = useHistory()

  useEffect(() => {
    if (props.isLoggedIn) {
      history.push('/')
    }
  }, [history, props.isLoggedIn])

  function handleSubmit(event) {
    event.preventDefault()
    login(email.value, password.value, () => {
      props.setLoggedIn(true)
    })
  }

  const registerLink = <div className="signup-link">Нет аккаунта? <Link to="/signup/">Регистрация</Link></div>
  
  return (
    <StandalonePage>
      <AccountForm onSubmit={handleSubmit} email={email} password={password} title="Вход"
                   submitButtonLabel="Войти" bottomContent={registerLink}/>
    </StandalonePage>
  )
}

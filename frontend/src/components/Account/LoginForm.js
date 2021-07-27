import React from 'react'
import AccountForm from './AccountForm'
import StandalonePage from '../StandalonePage/StandalonePage'
import { login } from '../../tools/account'
import { useHistory, Link } from 'react-router-dom' 
import useInput from '../../hooks/useInput'


export default function LoginForm() {
  const email = useInput('')
  const password = useInput('')
  const history = useHistory()

  function handleSubmit(event) {
    event.preventDefault()
    login(email, password).then(() => {
      history.push('/')
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

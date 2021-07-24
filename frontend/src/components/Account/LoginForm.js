import React, { useState } from 'react'
import AccountForm from './AccountForm'
import StandalonePage from '../StandalonePage/StandalonePage'
import { login } from '../../tools/account'
import { useHistory, Link } from 'react-router-dom' 


export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault()
    login(email, password).then(() => {
  
      history.push('/')
    })
  }

  const registerLink = <div className="signup-link">Нет аккаунта? <Link to="/signup/">Регистрация</Link></div>
  
  return (
    <StandalonePage>
      <AccountForm onSubmit={handleSubmit} email={email} password={password} setEmail={setEmail} setPassword={setPassword} title="Вход"
                   submitButtonLabel="Войти" bottomContent={registerLink}/>
    </StandalonePage>
  )
}

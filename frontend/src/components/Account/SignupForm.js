import React, { useState } from 'react'
import { signup } from '../../tools/account'
import AccountForm from './AccountForm'
import StandalonePage from '../StandalonePage/StandalonePage'
import { useHistory } from 'react-router-dom' 


export default function SignupForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  function handleSubmit(event) {
    event.preventDefault()
    signup(email, password).then(() => {
      history.push('/login/')
    })
  }

  return (
    <StandalonePage>
      <AccountForm onSubmit={handleSubmit} email={email} password={password} setEmail={setEmail} setPassword={setPassword} title="Регистрация"
                   submitButtonLabel="Зарегистрироваться"/>
    </StandalonePage>
  )
}

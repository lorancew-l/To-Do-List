import React from 'react'
import { signup } from '../../tools/account'
import AccountForm from './AccountForm'
import StandalonePage from '../StandalonePage/StandalonePage'
import { useHistory } from 'react-router-dom' 
import useInput from '../../hooks/useInput'


export default function SignupForm() {
  const email = useInput('')
  const password= useInput('')
  const history = useHistory()

  function handleSubmit(event) {
    event.preventDefault()
    signup(email.value, password.value).then(() => {
      history.push('/login/')
    })
  }

  return (
    <StandalonePage>
      <AccountForm onSubmit={handleSubmit} email={email} password={password} title="Регистрация"
                   submitButtonLabel="Зарегистрироваться"/>
    </StandalonePage>
  )
}

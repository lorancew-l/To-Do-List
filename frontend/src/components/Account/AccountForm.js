import React from 'react'

export default function AccountForm(props) {
  return (
    <div className="account-form">
      <h1>{props.title}</h1>
      <form onSubmit={props.onSubmit}>
        <div className="account-form-field">
          <label htmlFor="email">Email</label>
          <input name="email" type="email" value={props.email} onChange={event => props.setEmail(event.target.value)}></input>
        </div>
        <div className="account-form-field">
          <label htmlFor="password">Пароль</label>
          <input name="password" type="password" value={props.password} onChange={event => props.setPassword(event.target.value)}></input>
        </div>
        <button className="account-form-submit" type="submit">{props.submitButtonLabel}</button>
        {props.bottomContent}
      </form>
    </div>
  )
}

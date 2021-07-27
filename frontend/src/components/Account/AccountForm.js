import React from 'react'

export default function AccountForm(props) {
  const requiredFieldEmptyError = <div className="required-field-empty-error">Это поле обязательно для заполнения</div>
  const [email, password] = [props.email, props.password]
  const disabled = email.requiredEmpty || password.requiredEmpty

  return (
    <div className="account-form">
      <h1>{props.title}</h1>
      <form onSubmit={props.onSubmit}>
        <div className="account-form-field">
          <label htmlFor="email">Email</label>
          <input name="email" type="email" value={email.value} {...email.bind}></input>
          {email.requiredEmpty && requiredFieldEmptyError}
        </div>
        <div className="account-form-field">
          <label htmlFor="password">Пароль</label>
          <input name="password" type="password" value={password.value} {...password.bind}></input>
          {password.requiredEmpty && requiredFieldEmptyError}
        </div>
        <button disabled={disabled} className={disabled ? "account-form-submit disabled" : "account-form-submit"}
                type="submit">{props.submitButtonLabel}</button>
        {props.bottomContent}
      </form>
    </div>
  )
}

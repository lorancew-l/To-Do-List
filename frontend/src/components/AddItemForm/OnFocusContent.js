import React, { useRef, useEffect } from 'react'

export default function OnFocusContent(props) {
  const inputRef = useRef(null)
  
  const input = props.input

  useEffect(() => {
    inputRef.current.focus()
  }, [input.value])

  return (
    <form onSubmit={props.onSubmit}>
      <li className={props.className}>
        <div className="left-side">
          <input type="text" autoFocus ref={inputRef} value={input.value} maxLength={input.maxLength} {...input.bind}></input>
        </div>
        <div className="right-side">
          <button type="submit" className={(props.isSubmitDisabled) ?  "submit disabled" : "submit"} 
                  disabled={props.isSubmitDisabled}>
            Сохранить
          </button>
          <button className="cancel" type="button" onClick={props.onCancelClick}>
            Отменить
          </button>
        </div>
      </li>
    </form>
  )
}

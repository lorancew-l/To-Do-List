import React, { useRef, useEffect } from 'react'

export default function OnFocusContent(props) {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [props.inputValue])

  return (
    <li className={props.className}>
      <div className="left-side">
        <input type="text" autoFocus ref={inputRef} value={props.inputValue} onChange={(e) => props.setInputValue(e.target.value)}></input>
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
  )
}

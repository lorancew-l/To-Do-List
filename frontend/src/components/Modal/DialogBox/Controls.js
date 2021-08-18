import React from 'react'

export default function Controls(props) {
  return (
    <div className="dialog-controls">
      <button type="submit" disabled={props.submitDisabled} className={props.submitDisabled ? "disabled" : ""}>
        {props.submitButtonTitle}
      </button>
      <button type="button" onClick={props.cancel}>
        {props.cancelButtonTitle}
      </button>
    </div>
  )
}

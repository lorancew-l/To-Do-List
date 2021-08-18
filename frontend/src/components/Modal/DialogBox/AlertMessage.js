import React from 'react'

export default function AlertMessage(props) {
  return (
    <div className="dialog-alert">
      {props.text}
    </div>
  )
}

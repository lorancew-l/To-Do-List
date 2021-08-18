import React from 'react'

export default function AlertMessage(props) {
  return (
    <div className="dialog-body text">
      {props.text}
    </div>
  )
}

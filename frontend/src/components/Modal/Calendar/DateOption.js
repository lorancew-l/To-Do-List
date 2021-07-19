import React from 'react'

export default function DateOption(props) {
  return (
    <button className="date-option" onClick={props.onClick}>
      <img className="date-option-icon" src={props.icon} alt=""></img>
      <div className="date-option-label">{props.label}</div>
      <div className="date-option-weekday">
        {props.weekdayLabel}
      </div>
    </button>
  )
}

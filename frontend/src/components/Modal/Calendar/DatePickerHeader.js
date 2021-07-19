import React from 'react'

export default function DatePickerHeader(props) {
  return (
    <div className="date-picker-header">
      <div>
        <span className="date-picker-year">{props.date.getFullYear()}</span>
        <select value={props.date.getMonth()} onChange={(event) => props.handleSelectValueChange(event.target.value)}>
          {props.monthNamesList.map((monthName, index) => {
            return <option key={monthName} value={index}>{monthName}</option>
          })}
        </select>
      </div>
      <div>
        <button className="control-button" onClick={props.onPrevMonthClick}>{'<'}</button>
        <button className="control-button" onClick={props.onResetClick}>
          <div className="to-today-button"></div>
          </button>
        <button className="control-button" onClick={props.onNextMonthClick}>{'>'}</button>
      </div>
   </div>
  )
}

import React from 'react'
import {  getCalendarPage } from '../../../tools/dateTools'
import CalendarRow from './DatePickerDaysTabelRow'

export default function DatePickerDaysTabel(props) {
  function handleScoll(event) {
    if (event.deltaY > 0) {
      props.onNextMonthScroll()
    }
    else {
      props.onPrevMonthScroll()
    }
  }

  return (
    <table className="calendar-table" onWheel={(event) => handleScoll(event)}>
      <thead>
        <tr>
          {props.weekdayNamesList.map(weekday => {
            return <td key={weekday}>{weekday}</td>
          })}
        </tr>
      </thead>
      <tbody>
        {getCalendarPage(42, props.date.getFullYear(), props.date.getMonth()).map((weekdays, index) => {
          return <CalendarRow selected={props.selectedDate} today={props.today} month={props.date.getMonth()}
                              key={index} rowData={weekdays} onClick={props.handleDayClick}></CalendarRow>
        })}
      </tbody>
    </table>
  )
}

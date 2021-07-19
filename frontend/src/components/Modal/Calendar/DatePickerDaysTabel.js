import React from 'react'
import {  getCalendarPage } from '../../../tools/dateTools'
import CalendarRow from './DatePickerDaysTabelRow'

export default function DatePickerDaysTabel(props) {
  return (
    <table className="calendar-table">
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

import React, { useEffect, useState } from 'react'
import { getCalendarPage } from '../../../tools/dateTools'
import CalendarRow from './DatePickerDaysTabelRow'

export default function DatePickerDaysTabel(props) {
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
 
  function handleScoll(event) {
    if (event.deltaY > 0) {
      props.onNextMonthScroll()
    }
    else {
      props.onPrevMonthScroll()
    }
  }

  useEffect(() => {
    if (touchEnd > touchStart) {
      props.onPrevMonthScroll()
    }
    else {
      props.onNextMonthScroll()
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [touchEnd])

  return (
    <table className="calendar-table" onWheel={(event) => handleScoll(event)} onTouchStart={(event) => setTouchStart(event.changedTouches[0].screenY)}
           onTouchEnd={(event) => setTouchEnd(event.changedTouches[0].screenY)}>
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

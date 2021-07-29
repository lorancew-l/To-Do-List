import React, { useEffect, useRef, useState } from 'react'
import { getCalendarPage } from '../../../tools/dateTools'
import TabelRow from './DatePickerDaysTabelRow'

export default function DatePickerDaysTabel(props) {
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const isFirstRun = useRef(true)
 
  function handleScoll(event) {
    if (event.deltaY > 0) {
      props.onNextMonthScroll()
    }
    else {
      props.onPrevMonthScroll()
    }
  }

  useEffect(() => {
    if (!isFirstRun.current) {
      if (touchEnd > touchStart) {
        props.onPrevMonthScroll()
      }
      else {
        props.onNextMonthScroll()
      }
    }
    else {
      isFirstRun.current = false
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
        {getCalendarPage(props.currentDate, 42).map((weekdays, index) => {
          return <TabelRow key={index} selectedDate={props.selectedDate} currentMonth={props.currentDate.getMonth()}
                           rowData={weekdays} onClick={props.handleDayClick}></TabelRow>
        })}
      </tbody>
    </table>
  )
}

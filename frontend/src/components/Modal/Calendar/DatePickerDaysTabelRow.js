import { isToday } from 'date-fns';
import React from 'react'
import { compareCalendarDates } from '../../../tools/dateTools';

export default function TabelRow(props) {
  const rowData = props.rowData.map((cellDate, index) => {
    let className

    if (isToday(cellDate)) {
      className = "today"
    }
    else if(cellDate.getMonth() !== props.currentMonth) {
      className = "other-month"
    }
    else {
      className = null
    }

    if (props.selectedDate && compareCalendarDates(cellDate, props.selectedDate) === 0){
      className = "selected"
    } 

    return <td className={className} key={index} onClick={() => props.onClick(cellDate)}>{cellDate.getDate()}</td>
  })
  return (
    <tr>
      {rowData}
    </tr>
  )
}

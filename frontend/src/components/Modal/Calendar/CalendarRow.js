import React from 'react'

export default function CalendarRow(props) {
  const rowData = props.rowData.map((cellData, index) => {
    let className
    
    if (cellData.getDate() === props.today.getDate() & cellData.getMonth() === props.today.getMonth()) {
      className = "today"
    }
    else if(cellData.getMonth() !== props.month) {
      className = "other-month"
    }
    else {
      className = null
    }

    if(props.selected) {
      if (cellData.getDate() === props.selected.getDate() & cellData.getMonth() === props.selected.getMonth()) {
        className = "selected"
      }
    }

    return <td className={className} key={index} onClick={() => props.onClick(cellData)}>{cellData.getDate()}</td>
  })
  return (
    <tr>
      {rowData}
    </tr>
  )
}

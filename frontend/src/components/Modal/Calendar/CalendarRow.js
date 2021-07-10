import React from 'react'

export default function CalendarRow(props) {
  const rowData = props.rowData.map((cellData, index) => {
    let className
    
    if (cellData.getDate() === props.today.getDate() & cellData.getMonth() === props.today.getMonth()) {
      className = "today"
    }
    else if(props.selected) {
      if (cellData.getDate() === props.selected.getDate() & cellData.getMonth() === props.selected.getMonth()) {
        className = "selected"
      }
    }
    else {
      className = null
    }

    return <td className={className} key={index} onClick={() => props.onClick(cellData)}>{cellData.getDate()}</td>
  })
  return (
    <tr>
      {rowData}
    </tr>
  )
}

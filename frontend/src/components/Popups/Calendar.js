import React from 'react'

export default function Calendar(props) {
  return (
    <div className="calendar-popup" style={{transform: `translate(${props.pos.left}px, ${props.pos.bottom}px)`}}
                                    onClick={(event) => event.stopPropagation()}>
      Календарь
    </div>
  )
}
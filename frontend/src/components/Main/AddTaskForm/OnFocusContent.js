import React, { useRef, useEffect, useState, useCallback } from 'react'
import { calendar } from '../../../images/index'
import Calendar from '../../Modal/Calendar/Calendar'


export default function OnFocusContent(props) {
  const calendarButtonRef = useRef()
  const liRef = useRef()

  const [isCalendarOpen, setCalendarOpen] = useState(false)
  const calendarHeight = 476

  function handleCalendarClick() {
    updateCalendarPos()
    setCalendarOpen(true)
  }

  function calculateCalendarPos() {
    const pos = {bottom: liRef.current.getBoundingClientRect().bottom,
                 top: liRef.current.getBoundingClientRect().top,
                 left: calendarButtonRef.current.getBoundingClientRect().left}

    const bottomOffset = 30
    let y

    if (calendarHeight + pos.bottom < window.innerHeight) {
      y = pos.bottom
    }
    else if ((calendarHeight + pos.top + pos.bottom) / 2 + bottomOffset < window.innerHeight) {
      y = (pos.top + pos.bottom - calendarHeight) / 2
    }
    else {
      y = pos.top - calendarHeight
    }
    
    return {x: pos.left - 2, y: y}
  }

  const updateCalendarPos = useCallback(() => {
    props.updatePopperPos(calculateCalendarPos())
  }, [props])

  useEffect(() => {
    if (isCalendarOpen) {
      const currentPos = calculateCalendarPos()
      if (props.popperPos.x === currentPos.x & props.popperPos.y === currentPos.y) {
        props.showPopper(<Calendar onDateClick={props.onDateClick} onWindowResize={updateCalendarPos} 
                                   onClose={() => setCalendarOpen(false)}></Calendar>)
      }
    }
  }, [isCalendarOpen, props, updateCalendarPos])

  return (
    <li className='task-list-add-item no-hover' ref={liRef}>
      <div className="left-side">
        <input type="text" autoFocus value={props.taskName} onChange={(e) => props.setTaskName(e.target.value)}></input>
      </div>
      <div className="right-side">
        <button className="button-with-icon" type="button" onClick={handleCalendarClick} ref={calendarButtonRef}>
          <img src={calendar} alt="date"></img>
          <div>{props.deadline}</div>
        </button>
        <button className={props.taskName ? "submit" : "submit disabled"} type="submit" disabled={!props.taskName}>
          Добавить
        </button>
        <button className="cancel" type="button" onClick={props.onCancelClick}>
          Отменить
        </button>
      </div>
    </li>
  ) 
}

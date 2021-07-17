import React, { useRef, useEffect, useState, Fragment } from 'react'
import { calendar } from '../../../images/index'
import Calendar from '../../Modal/Calendar/Calendar'
import PopperOverlay from '../../Modal/PopperOverlay'


export default function OnFocusContent(props) {
  const calendarButtonRef = useRef(null)
  const liRef = useRef(null)
  const inputRef = useRef(null)

  const isFirstRun = useRef(true);

  const calendarHeight = 472
  const [isCalendarOpen, setCalendarOpen] = useState(false)
  const [calendarPos, setCalendarPos] = useState({x: 0, y: 0})

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

  useEffect(() => {
    if (!isFirstRun.current) {
      if (!isCalendarOpen) {
        setCalendarOpen(true)
      }
    }
    else {
      isFirstRun.current = false
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarPos])

  useEffect(() => {
    inputRef.current.focus()
  }, [props.taskName])

  return (
    <Fragment>
      <form onSubmit={props.onSubmit}>
        <li className='task-list-add-item no-hover' ref={liRef}>
          <div className="left-side">
            <input ref={inputRef} type="text" value={props.taskName} autoFocus
                  onChange={(e) => props.setTaskName(e.target.value)}></input>
          </div>
          <div className="right-side">
            <button className="show-calendar" type="button" onClick={() => setCalendarPos(calculateCalendarPos())} ref={calendarButtonRef}>
              <img src={calendar} alt="date"></img>
              <div>{props.deadlineStringRepresentation}</div>
            </button>
            <button className={props.taskName ? "submit" : "submit disabled"} type="submit" disabled={!props.taskName}>
              Добавить
            </button>
            <button className="cancel" type="button" onClick={props.onCancelClick}>
              Отменить
            </button>
          </div>
        </li>
      </form>
      {isCalendarOpen ? 
      <PopperOverlay closePopper={() => setCalendarOpen(false)}>
        <Calendar onDateClick={props.onDateClick} pos={calendarPos} onWindowResize={() => setCalendarPos(calculateCalendarPos())}
                  selectedDate={props.deadline} closePopper={() => setCalendarOpen(false)}/>
        </PopperOverlay>
      : null}
    </Fragment>
  ) 
}

import React, { useRef, useState, Fragment } from 'react'
import { calendar } from '../../../images/index'
import { useTaskContext } from '../../../store/TaskStore/TaskContext'
import Calendar from '../Calendar/Calendar'
import PopperOverlay from '../PopperOverlay'


export default function Deadline(props) {
  const taskStore = useTaskContext()

  const buttonRef = useRef(null)
  const [isCalendarOpen, setCalendarOpen] = useState(false)

  function calculateCalendarPos(calendarRect) {
    const calendarWidth = calendarRect.width
    const calendarHeight = calendarRect.height
    const buttonRect = buttonRef.current.getBoundingClientRect()
    const bottomOffset = 20

    let x, y
    if (calendarWidth + buttonRect.right < window.innerWidth) {
      x = buttonRect.right
    }
    else {
      x = (window.innerWidth - calendarWidth) / 2
    }

    if ((buttonRect.top + buttonRect.bottom + calendarHeight) / 2 + bottomOffset < window.innerHeight) {
      y = (buttonRect.top + buttonRect.bottom - calendarHeight) / 2
    }
    else {
      y = (buttonRect.top + buttonRect.bottom - calendarHeight) / 2 - bottomOffset
    }

    return {x: x, y: y}
  }

  function setDeadline(date) {
    taskStore.updateTask(props.taskId, {deadline: date})
  }

  return (
    <Fragment>
      <div className="detail-holder hover" ref={buttonRef}>
        <div className="deadline" onClick={() => setCalendarOpen(true)}> 
          <img className="noselect nodrag standart_icon" alt="calendar" src={calendar}/>
          <div>{props.deadline ? new Date(props.deadline).toLocaleDateString('ru-Ru') : "Добавить дату выполнения"}</div>
        </div>
      </div>
      {isCalendarOpen ? 
        <PopperOverlay closePopper={() => setCalendarOpen(false)}>
          <Calendar selectedDate={props.deadline ? new Date(props.deadline) : null} calculatePos={calculateCalendarPos}
                    onDateClick={setDeadline} closePopper={() => setCalendarOpen(false)}/>
        </PopperOverlay>
        : null}
    </Fragment>
  )
}

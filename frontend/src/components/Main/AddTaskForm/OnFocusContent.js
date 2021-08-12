import React, { useRef, useEffect, useState, Fragment } from 'react'
import { calendar } from '../../../images/index'
import Calendar from '../../Modal/Calendar/Calendar'
import PopperOverlay from '../../Modal/PopperOverlay'
import { motion } from 'framer-motion'
import { taskItemAnimation } from '../../../animations/animations'


export default function OnFocusContent(props) {
  const taskName = props.taskName

  const calendarButtonRef = useRef(null)
  const addTaskRef = useRef(null)
  const inputRef = useRef(null)

  const isFirstRun = useRef(true);

  const calendarHeight = 472
  const calendarWidth = 265

  const [isCalendarOpen, setCalendarOpen] = useState(false)
  const [calendarPos, setCalendarPos] = useState({x: 0, y: 0})

  function calculateCalendarPos() {
    const windowHeight = window.innerHeight
    const windowWidth = window.innerWidth

    const calendarButtonRect = calendarButtonRef.current.getBoundingClientRect()
    const addTaskRect = addTaskRef.current.getBoundingClientRect()

    const bottomOffset = 50
    const topOffset = 50

    const isScreenSmall = windowWidth < 768 ? true : false
    const smallDeviceTopOffset = 8

    let [x, y] = [calendarButtonRect.left, 0]

    if (calendarHeight + addTaskRect.bottom < windowHeight) {
      y = addTaskRect.bottom
    }
    else if (((calendarHeight + addTaskRect.top + addTaskRect.bottom) / 2 + bottomOffset < windowHeight) &
             ((addTaskRect.top + addTaskRect.bottom - calendarHeight) / 2) > topOffset) {
      x = isScreenSmall ? (windowWidth - calendarWidth) / 2 : calendarButtonRect.left - calendarWidth
      y = (addTaskRect.top + addTaskRect.bottom - calendarHeight) / 2
    }
    else {
      if (addTaskRect.top - smallDeviceTopOffset - calendarHeight > topOffset) {
        y = isScreenSmall ? calendarButtonRect.top - calendarHeight - smallDeviceTopOffset: addTaskRect.top - calendarHeight
      }
      else {
        x = isScreenSmall ? (windowWidth - calendarWidth) / 2 : calendarButtonRect.left
        y = (windowHeight - calendarHeight) / 2
      }
    }
    
    return {x: x, y: y}
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
  }, [taskName.value])

  return (
    <Fragment>
      <motion.form layout className="add-task-form" onSubmit={props.onSubmit} transition={taskItemAnimation.transition}>
        <li className='task-list-add-item no-hover' ref={addTaskRef}>
          <div className="left-side">
            <input ref={inputRef} type="text" autoFocus value={taskName.value} maxLength={taskName.maxLength} {...taskName.bind}></input>
          </div>
          <div className="right-side">
            <button className="show-calendar" type="button" onClick={() => setCalendarPos(calculateCalendarPos())} ref={calendarButtonRef}>
              <img src={calendar} alt="date"></img>
              <div className="date-string">{props.deadlineStringRepresentation}</div>
            </button>
            <button className={taskName.empty ? "submit disabled" : "submit"} type="submit" disabled={taskName.empty}>
              Добавить
            </button>
            <button className="cancel" type="button" onClick={props.onCancelClick}>
              Отменить
            </button>
          </div>
        </li>
      </motion.form>
      {isCalendarOpen ? 
      <PopperOverlay closePopper={() => setCalendarOpen(false)}>
        <Calendar onDateClick={props.onDateClick} pos={calendarPos} onWindowResize={() => setCalendarPos(calculateCalendarPos())}
                  selectedDate={props.deadline} closePopper={() => setCalendarOpen(false)}/>
        </PopperOverlay>
      : null}
    </Fragment>
  ) 
}

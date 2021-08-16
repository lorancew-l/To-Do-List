import React, { useRef, useState, useEffect, Fragment } from 'react'
import { calendar } from '../../../images/index'
import { useTaskContext } from '../../../store/TaskStore/TaskContext'
import Calendar from '../Calendar/Calendar'
import PopperOverlay from '../PopperOverlay'


export default function Deadline(props) {
  const taskStore = useTaskContext()

  const ref = useRef(null)
  const isFirstRun = useRef(true);

  const calendarHeight = 478 
  const calendarWidth = 265

  const [isCalendarOpen, setCalendarOpen] = useState(false)
  const [calendarPos, setCalendarPos] = useState({x: 0, y: 0})

  function calculateCalendarPos() {
    const pos = {bottom: ref.current.getBoundingClientRect().bottom,
                 top: ref.current.getBoundingClientRect().top,
                 left: ref.current.getBoundingClientRect().left,
                 right: ref.current.getBoundingClientRect().right}
    const bottomOffset = 20

    let x, y
    if (calendarWidth + pos.right < window.innerWidth) {
      x = pos.right
    }
    else {
      x = (window.innerWidth - calendarWidth) / 2
    }

    if ((pos.top + pos.bottom + calendarHeight) / 2 + bottomOffset < window.innerHeight) {
      y = (pos.top + pos.bottom - calendarHeight) / 2
    }
    else {
      y = (pos.top + pos.bottom - calendarHeight) / 2 - bottomOffset
    }

    setCalendarPos({x: x, y: y})
  }

  function setDeadline(date) {
    taskStore.updateTaskItem(props.taskId, {deadline: date})
  }
  
  useEffect (() => {
    if (!isFirstRun.current) {
      if (!isCalendarOpen) {
        setCalendarOpen(true)
      }
    }
    else {
      isFirstRun.current = false;
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarPos])

  return (
    <Fragment>
      <div className="detail-holder hover" ref={ref}>
        <div className="deadline" onClick={() => calculateCalendarPos()}> 
          <img className="noselect nodrag standart_icon" alt="calendar" src={calendar}/>
          <div>{props.deadline ? new Date(props.deadline).toLocaleDateString('ru-Ru') : "Добавить дату выполнения"}</div>
        </div>
      </div>
      {isCalendarOpen ? 
        <PopperOverlay closePopper={() => setCalendarOpen(false)}>
          <Calendar selectedDate={props.deadline ? new Date(props.deadline) : null} pos={calendarPos} onWindowResize={() => calculateCalendarPos()}
                    onDateClick={setDeadline} closePopper={() => setCalendarOpen(false)}/>
        </PopperOverlay>
        : null}
    </Fragment>
  )
}

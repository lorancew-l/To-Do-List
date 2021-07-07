import React, { useRef, useEffect } from 'react'
import { calendar } from '../../../images/index'
import Calendar from '../../Popups/Calendar/Calendar'


export default function OnFocusContent(props) {
  const calendarButtonRef = useRef()
  const liRef= useRef()

  function handleCalendarClick() {
    props.updateModalPos({
      bottom: liRef.current.getBoundingClientRect().bottom,
      top: liRef.current.getBoundingClientRect().top,
      left: calendarButtonRef.current.getBoundingClientRect().left,
      right: calendarButtonRef.current.getBoundingClientRect().right
    })

    props.showModal(<Calendar onDateClick={props.onDateClick}></Calendar>, false)
  }

  useEffect(() => {
    function onWindowResize() {
      if (calendarButtonRef.current) {
        props.updateModalPos({
          bottom: liRef.current.getBoundingClientRect().bottom,
          top: liRef.current.getBoundingClientRect().top,
          left: calendarButtonRef.current.getBoundingClientRect().left,
          right: calendarButtonRef.current.getBoundingClientRect().right
        })
      }
    }

    window.addEventListener('resize', onWindowResize)
 
    return () => {
      window.removeEventListener('resize', onWindowResize)
    }
  })

  return (
    <li className='task-list-add-item no-hover' ref={liRef}>
      <div className="left-side">
        <input type="text" autoFocus value={props.taskName} onChange={(e) => props.setTaskName(e.target.value)}></input>
      </div>
      <div className="right-side">
        <button className="button-with-icon" type="button" onClick={handleCalendarClick} ref={calendarButtonRef}>
          <img src={calendar} alt="date"></img>
          <span>{props.deadline}</span>
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

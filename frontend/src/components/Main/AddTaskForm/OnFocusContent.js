import React, { useRef, useEffect } from 'react'
import { calendar } from '../../../images/index'
import Calendar from '../../Popups/Calendar'


export default function OnFocusContent(props) {
  const calendarButtonRef = useRef()
  const liRef = useRef()

  function handleCalendarClick() {
    console.log();
    props.updatePopupPos({left: calendarButtonRef.current.getBoundingClientRect().left,
                          bottom: liRef.current.getBoundingClientRect().bottom})
    props.showPopup(<Calendar></Calendar>)
  }

  useEffect(() => {
    function onWindowResize() {
      if (calendarButtonRef.current) {
        props.updatePopupPos({left: calendarButtonRef.current.getBoundingClientRect().left,
                              bottom: liRef.current.getBoundingClientRect().bottom})
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
        <input type="text" autoFocus></input>
      </div>
      <div className="right-side">
        <button className="button-with-icon" type="button" onClick={handleCalendarClick} ref={calendarButtonRef}>
          <img src={calendar} alt="date"></img>
        </button>
        <button className="submit" type="submit">
          Добавить
        </button>
        <button className="cancel" type="button" onClick={props.onCancelClick}>
          Отменить
        </button>
      </div>
    </li>
  ) 
}

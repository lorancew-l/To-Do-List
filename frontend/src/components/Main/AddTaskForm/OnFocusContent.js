import React, { useRef, useEffect } from 'react'
import { calendar } from '../../../images/index'
import Calendar from '../../Popups/Calendar'


export default function OnFocusContent(props) {
  const calendarButton = useRef()

  function handleCalendarClick() {
    const rect = calendarButton.current.getBoundingClientRect()

    props.updatePopupPos({left: rect.left, bottom: rect.bottom})
    props.showPopup(<Calendar></Calendar>)
  }

  useEffect(() => {
    function onWindowResize() {
      if (calendarButton.current) {
        const rect = calendarButton.current.getBoundingClientRect()
        props.updatePopupPos({left: rect.left, bottom: rect.bottom})
      }
    }

    window.addEventListener('resize', onWindowResize)
 
    return () => {
      window.removeEventListener('resize', onWindowResize)
    }
  })

  return (
    <li className='task-list-add-item no-hover'>
      <div className="left-side">
        <input type="text" autoFocus></input>
      </div>
      <div className="right-side">
        <button className="button-with-icon" type="button" onClick={handleCalendarClick} ref={calendarButton}>
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

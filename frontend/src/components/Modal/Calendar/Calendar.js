import React, { useEffect, useState } from 'react'
import { calendarToday, calendarTomorrow, calendarNextWeek, calendarNoDeadline } from '../../../images/index'
import { getMonthNames, getWeekdayNames, getCalendarPage } from '../../../tools/dateTools'
import CalendarRow from './CalendarRow'


export default function Calendar(props) {
  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)

  const tommorowDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1)
  const nextWeekDate =  new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7)

  const monthNamesList = getMonthNames()
  const weekdayNamesList = getWeekdayNames()
  
  const [selectedDate, setSelectedDate] = useState(props.selectedDate || new Date())

  useEffect(() => {
    window.addEventListener('resize', props.onWindowResize)
 
    return () => {
      window.removeEventListener('resize', props.onWindowResize)
    }
  }, [props])

  function submitDate(date, dateStringRepresentation) {
    props.onDateClick(date, dateStringRepresentation)
    props.closePopper()
  }

  function handleSelectValueChange (newMonthValue) {
    if (newMonthValue < currentDate.getMonth() & selectedDate.getFullYear() === currentDate.getFullYear()) {
      setSelectedDate(new Date(currentDate.getFullYear() + 1, newMonthValue, selectedDate.getDate()))
    }
    else {
      setSelectedDate(new Date(selectedDate.getFullYear(), newMonthValue, selectedDate.getDate()))
    }
  }

  function handleControlButtonClick (newMonthValue) {
    if (selectedDate.getFullYear() <= currentDate.getFullYear()) {
      if (newMonthValue < currentDate.getMonth()) return
    }

    setSelectedDate(new Date(selectedDate.getFullYear(), newMonthValue, selectedDate.getDate()))
  }

  function handleCellClick(date) {
    date.setHours(0, 0, 0, 0)
    let dateStringRepresentation

    if (date.getTime() === currentDate.getTime()) {
      dateStringRepresentation = 'Сегодня'
    }
    else if (date.getTime() === tommorowDate.getTime()) {
      dateStringRepresentation = 'Завтра'
    }
    else {
      dateStringRepresentation = date.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric'})
    }

    submitDate(date, dateStringRepresentation)
  }

  function resetSelectedDate() {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()))
  }

  return (
    <div className="calendar-popup" style={{transform: `translate(${props.pos.x}px, ${props.pos.y}px)`}} onClick={(event) => event.stopPropagation()}>
      <div className="current-date">
        {currentDate.toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' })}
      </div>
      <div className="date-options">
        <button className="date-option" onClick={() => submitDate(currentDate, "Сегодня")}>
          <img className="date-option-icon" src={ calendarToday } alt=""></img>
          <div className="date-option-label">Сегодня</div>
          <div className="date-option-weekday">
            {currentDate.toLocaleDateString('ru-RU', { weekday: 'short' })}
          </div>
        </button>
        <button className="date-option" onClick={() => submitDate(tommorowDate, "Завтра")}>
          <img className="date-option-icon" src={ calendarTomorrow} alt=""></img>
          <div className="date-option-label">Завтра</div>
          <div className="date-option-weekday">
            {tommorowDate.toLocaleDateString('ru-RU', { weekday: 'short' })}
          </div>
        </button>
        <button className="date-option" onClick={() => submitDate(nextWeekDate,
                                                       nextWeekDate.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric'}))}>
          <img className="date-option-icon" src={ calendarNextWeek } alt=""></img>
          <div className="date-option-label">Следующая неделя</div>
          <div className="date-option-weekday">
            {nextWeekDate.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric'})}
          </div>
        </button>
        <button className="date-option" onClick={() => submitDate(null, null)}>
          <img className="date-option-icon" src={ calendarNoDeadline } alt=""></img>
          <div className="date-option-label">Нет срока</div>
        </button>
      </div>
      <div className="date-picker">
        <div className="date-picker-header">
          <div>
            <span className="date-picker-year">{selectedDate.getFullYear()}</span>
            <select value={selectedDate.getMonth()} onChange={(event) => handleSelectValueChange(event.target.value)}>
              {monthNamesList.map((monthName, index) => {
                return <option key={monthName} value={index}>{monthName}</option>
              })}
            </select>
          </div>
          <div>
            <button className="control-button" onClick={() => {handleControlButtonClick(selectedDate.getMonth() - 1)}}>{'<'}</button>
            <button className="control-button" onClick={resetSelectedDate}>
              <div className="to-today-button"></div>
              </button>
            <button className="control-button" onClick={() => {handleControlButtonClick(selectedDate.getMonth() + 1)}}>{'>'}</button>
          </div>
        </div>
        <table className="calendar-table">
          <thead>
            <tr>
              {weekdayNamesList.map(weekday => {
                return <td key={weekday}>{weekday}</td>
              })}
            </tr>
          </thead>
          <tbody>
            {getCalendarPage(42, selectedDate.getFullYear(), selectedDate.getMonth()).map((weekdays, index) => {
              return <CalendarRow selected={props.selectedDate} today={currentDate} month={selectedDate.getMonth()}
                                  key={index} rowData={weekdays} onClick={handleCellClick}></CalendarRow>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
} 
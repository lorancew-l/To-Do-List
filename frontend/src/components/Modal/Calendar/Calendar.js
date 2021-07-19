import React, { useEffect, useState } from 'react'
import { calendarToday, calendarTomorrow, calendarNextWeek, calendarNoDeadline } from '../../../images/index'
import { getMonthNames, getWeekdayNames } from '../../../tools/dateTools'
import DateOption from './DateOption'
import DatePickerHeader from './DatePickerHeader'
import DatePickerDaysTabel from './DatePickerDaysTabel'


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

  function handleDayClick(date) {
    date.setHours(0, 0, 0, 0)

    if (date.getTime() < currentDate.getTime()) {
      return
    }

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
        <DateOption icon={calendarToday} label="Сегодня" weekdayLabel={currentDate.toLocaleDateString('ru-RU', { weekday: 'short' })}
                    onClick={() => submitDate(currentDate, "Сегодня")}/>
        <DateOption icon={calendarTomorrow} label="Завтра" weekdayLabel={tommorowDate.toLocaleDateString('ru-RU', { weekday: 'short' })}
                    onClick={() => submitDate(tommorowDate, "Завтра")}/>

        <DateOption icon={calendarNextWeek} label="Следующая неделя"
                    weekdayLabel={nextWeekDate.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric'})}
                    onClick={() => submitDate(nextWeekDate, nextWeekDate.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric'}))}/>

        <DateOption icon={calendarNoDeadline} label="Нет срока" weekdayLabel=""
                    onClick={() => submitDate(null, 'Срок')}/>
      </div>
      <div className="date-picker">
        <DatePickerHeader date={selectedDate} handleSelectValueChange={handleSelectValueChange}
                          monthNamesList={monthNamesList} onPrevMonthClick={() => {handleControlButtonClick(selectedDate.getMonth() - 1)}}
                          onResetClick={resetSelectedDate} onNextMonthClick={() => handleControlButtonClick(selectedDate.getMonth() + 1)}/>
        <DatePickerDaysTabel date={selectedDate} today={currentDate} weekdayNamesList={weekdayNamesList} handleDayClick={handleDayClick}
                             onPrevMonthScroll={() => {handleControlButtonClick(selectedDate.getMonth() - 1)}}
                             onNextMonthScroll={() => handleControlButtonClick(selectedDate.getMonth() + 1)}/>
      </div>
    </div>
  )
} 
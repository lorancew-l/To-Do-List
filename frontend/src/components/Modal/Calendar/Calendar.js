import React, { useEffect, useState } from 'react'
import { calendarToday, calendarTomorrow, calendarNextWeek, calendarNoDeadline } from '../../../images/index'
import { compareCalendarDates, getMonthNames, getWeekdayNames } from '../../../tools/dateTools'
import DateOption from './DateOption'
import DatePickerHeader from './DatePickerHeader'
import DatePickerDaysTabel from './DatePickerDaysTabel'
import { addDays, isToday, isTomorrow, set } from 'date-fns'


export default function Calendar(props) {
  const todayDate = new Date()
  const tommorowDate = addDays(todayDate, 1)
  const nextWeekDate = addDays(todayDate, 7)

  const monthNamesList = getMonthNames()
  const weekdayNamesList = getWeekdayNames()
  
  const [currentDate, setCurrentDate] = useState(props.selectedDate || new Date(todayDate))

  useEffect(() => {
    window.addEventListener('resize', props.onWindowResize)
 
    return () => {
      window.removeEventListener('resize', props.onWindowResize)
    }
  }, [props.onWindowResize])

  function submitDate(date, dateStringRepresentation) {
    props.onDateClick(date, dateStringRepresentation)
    props.closePopper()
  }

  function handleMonthValueChange (newMonthValue) {
    let newDate = new Date(currentDate)

    if (newMonthValue < todayDate.getMonth() && currentDate.getFullYear() === todayDate.getFullYear()) {
      newDate = set(newDate, {year: todayDate.getFullYear() + 1, month: newMonthValue})
    }
    else {
      newDate = set(newDate, {month: newMonthValue})
    }

    setCurrentDate(newDate)
  }

  function handleControlButtonClick (newMonthValue) {
    if (currentDate.getFullYear() <= todayDate.getFullYear() && newMonthValue < todayDate.getMonth()) {
      return
    }

    setCurrentDate(set(currentDate, {month: newMonthValue}))
  }

  function handleDayClick(date) {
    if (compareCalendarDates(date, todayDate) < 0) {
      return
    } 
    
    let dateStringRepresentation
    
    if (isToday(date)) {
      dateStringRepresentation = 'Сегодня'
    }
    else if (isTomorrow(date)) {
      dateStringRepresentation = 'Завтра'
    }
    else {
      dateStringRepresentation = date.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric'})
    }
    
    date.setHours(currentDate.getHours(), currentDate.getMinutes(), currentDate.getMilliseconds())
    submitDate(date, dateStringRepresentation)
  }

  function resetCurrentDate() {
    setCurrentDate(todayDate)
  }

  return (
    <div className="calendar-popup" style={{transform: `translate(${props.pos.x}px, ${props.pos.y}px)`}} onClick={(event) => event.stopPropagation()}>
      <div className="current-date">
        {todayDate.toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' })}
      </div>
      <div className="date-options">
        <DateOption icon={calendarToday} label="Сегодня" weekdayLabel={todayDate.toLocaleDateString('ru-RU', { weekday: 'short' })}
                    onClick={() => submitDate(todayDate, "Сегодня")}/>
        <DateOption icon={calendarTomorrow} label="Завтра" weekdayLabel={tommorowDate.toLocaleDateString('ru-RU', { weekday: 'short' })}
                    onClick={() => submitDate(tommorowDate, "Завтра")}/>

        <DateOption icon={calendarNextWeek} label="Следующая неделя"
                    weekdayLabel={nextWeekDate.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric'})}
                    onClick={() => submitDate(nextWeekDate, nextWeekDate.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric'}))}/>

        <DateOption icon={calendarNoDeadline} label="Нет срока" weekdayLabel=""
                    onClick={() => submitDate(null, 'Срок')}/>
      </div>
      <div className="date-picker">
        <DatePickerHeader date={currentDate} handleMonthValueChange={handleMonthValueChange}
                          monthNamesList={monthNamesList} onPrevMonthClick={() => {handleControlButtonClick(currentDate.getMonth() - 1)}}
                          onResetClick={resetCurrentDate} onNextMonthClick={() => handleControlButtonClick(currentDate.getMonth() + 1)}/>
        <DatePickerDaysTabel currentDate={currentDate} selectedDate={props.selectedDate} 
                             weekdayNamesList={weekdayNamesList} handleDayClick={handleDayClick}
                             onPrevMonthScroll={() => {handleControlButtonClick(currentDate.getMonth() - 1)}}
                             onNextMonthScroll={() => handleControlButtonClick(currentDate.getMonth() + 1)}/>
      </div>
    </div>
  )
} 
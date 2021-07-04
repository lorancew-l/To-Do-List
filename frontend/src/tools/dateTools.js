import { eachMonthOfInterval, eachDayOfInterval, addDays, subDays } from 'date-fns'

export function getMonthNames () {
  const date = new Date()
  
  let monthNames = eachMonthOfInterval({start: new Date(date.getFullYear(), 0, 1),
                                        end: new Date(date.getFullYear(), 11, 1)})

  let monthName
  monthNames = monthNames.map(date => {
    monthName = date.toLocaleDateString('ru-RU', { month: 'long'})
    return monthName[0].toUpperCase() + monthName.slice(1)
  })
  return monthNames
}

export function getWeekdayNames () {
  let weekdayNames = eachDayOfInterval({start: new Date(0, 0, 1),
                                        end: new Date(0, 0, 7)})

  let weekdayName
  weekdayNames = weekdayNames.map(date => {
    weekdayName = date.toLocaleDateString('ru-RU', { weekday: 'short'})
    return weekdayName[0].toUpperCase() + weekdayName.slice(1)
  })
  return weekdayNames
}

export function getCalendarPage(datesPerPage, year, month) {
  const date = new Date(year, month, 1)
  const leftDate = subDays(date, date.getDay() - 1) 
  const rightDate = addDays(date, datesPerPage - date.getDay())

  let days = eachDayOfInterval({start: leftDate, end: rightDate})

  let dayList = []
  const rowNumber = datesPerPage / 7
  for (let i=0; i<rowNumber; i++) {
    dayList.push(days.splice(0, 7))
  }

  return dayList
}
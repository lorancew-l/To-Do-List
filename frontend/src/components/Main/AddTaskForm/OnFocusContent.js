import React, { useRef, useEffect, useState, Fragment } from 'react'
import { calendar } from '../../../images/index'
import { ReactComponent as FilterIcon } from '../../../images/icons/filter.svg'
import Calendar from '../../Modal/Calendar/Calendar'
import PopperOverlay from '../../Modal/PopperOverlay'
import PopupMenu from '../../Modal/PopupMenu/PopupMenu'
import PopupMenuItem from '../../Modal/PopupMenu/PopupMenuItem'
import { motion } from 'framer-motion'
import { taskItemAnimation } from '../../../animations/animations'
import { useTaskContext } from '../../../store/TaskStore/TaskContext'
import { observer } from 'mobx-react'

function OnFocusContent(props) {
  const taskName = props.taskName

  const calendarButtonRef = useRef()
  const addTaskRef = useRef()
  const inputRef = useRef()
  const showFiltersMenuButtonRef = useRef()

  const [isCalendarOpen, setCalendarOpen] = useState(false)

  const [showFiltersMenu, setShowFiltersMenu] = useState(false)

  const taskStore = useTaskContext()

  //refactor
  function calculateCalendarPos(calendarRect) {
    const windowHeight = window.innerHeight
    const windowWidth = window.innerWidth

    const calendarHeight = calendarRect.height
    const calendarWidth = calendarRect.width
    
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

  function calculateFiltersMenuPos(menuRect) {
    const buttonRect = showFiltersMenuButtonRef.current.getBoundingClientRect()
    const bottomOffset = 20
    
    let y

    if (buttonRect.bottom + menuRect.height + bottomOffset < window.innerHeight ) {
      y = buttonRect.bottom
    }
    else {
      y = buttonRect.top - menuRect.height
    }
    
    return {x: (buttonRect.right + buttonRect.left - menuRect.width) / 2, y}
  }

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
            <button type="button" onClick={() => setShowFiltersMenu(true)} ref={showFiltersMenuButtonRef}>
              <FilterIcon className="filter"
               style={props.taskFilterId
                ? {fill: taskStore.getFilterById(props.taskFilterId).color} 
                : {fill: "transparent", stroke: "#888888", strokeWidth: "80px"}} />
            </button>
            <button className="show-calendar" type="button" onClick={() => setCalendarOpen(true)} ref={calendarButtonRef}>
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
      {isCalendarOpen && (
        <PopperOverlay closePopper={() => setCalendarOpen(false)}>
          <Calendar onDateClick={props.onDateClick} calculatePos={calculateCalendarPos}
                    selectedDate={props.deadline} closePopper={() => setCalendarOpen(false)}/>
        </PopperOverlay>)
      }
      {showFiltersMenu && (
        <PopperOverlay closePopper={() => setShowFiltersMenu(false)}>
          <PopupMenu calculatePos={calculateFiltersMenuPos}>
            {taskStore.favoriteFilters.map(filter => {
              return <PopupMenuItem key={filter.id} icon={<FilterIcon style={{fill: filter.color}}/>} title={filter.title}
                                    onClick={() => {props.setTaskFilterId(filter.id); setShowFiltersMenu(false)}}/>
            })
            }
            <PopupMenuItem icon={<FilterIcon className="filter" style={{fill: "transparent", stroke: "#888888", strokeWidth: "80px"}}/>} title="Нет фильтра"
                                  onClick={() => {props.setTaskFilterId(null); setShowFiltersMenu(false)}}/>
          </PopupMenu>
        </PopperOverlay>)
      }
    </Fragment>
  ) 
}

export default observer(OnFocusContent)
import React, { useRef, useState } from 'react'
import { useTaskContext } from '../../../../store/TaskStore/TaskContext'
import { ReactComponent as FilterIcon } from '../../../../images/icons/filter.svg'
import PopupMenu from '../../PopupMenu/PopupMenu'
import PopupMenuItem from '../../PopupMenu/PopupMenuItem'
import PopperOverlay from '../../PopperOverlay'
import { observer } from 'mobx-react'
import { fi } from 'date-fns/locale'

function Filters({ task }) {
  const [showFiltersMenu, setShowFiltersMenu] = useState(false)
  const taskStore = useTaskContext()

  const buttonRef = useRef()

  const NoFilterIcon = (
    <FilterIcon className="filter"
                style={{fill: "transparent", stroke: "#888888", strokeWidth: "80px"}}
    />
  )

  function calculatePopupMenuPos() { 
    const buttonRect = buttonRef.current.getBoundingClientRect()

    return {x: buttonRect.left, y: buttonRect.bottom}
  }
  
  function selectFilter(filterId) {
    taskStore.updateTask(task.id, {task_filter: filterId})
    setShowFiltersMenu(false)
  }

  return (
    <div className="detail-holder hover" ref={buttonRef}>
      <div className="select-filter" onClick={() => setShowFiltersMenu(true)}>
        <FilterIcon className="filter-icon"
                    style={task.task_filter
                    ? {fill: taskStore.getFilterById(task.task_filter).color} 
                    : {fill: "transparent", stroke: "#888888", strokeWidth: "80px"}}
         />
        <span>
          {task.task_filter ? taskStore.getFilterById(task.task_filter).title : "Добавить фильтр"}
        </span> 
      </div>
      {showFiltersMenu && (
        <PopperOverlay closePopper={() => setShowFiltersMenu(false)}>
          <PopupMenu calculatePos={calculatePopupMenuPos}>
            {taskStore.favoriteFilters.map(filter => (
              <PopupMenuItem key={filter.id} 
                             icon={<FilterIcon style={{fill: filter.color}}/>}
                             title={filter.title}
                             onClick={() => selectFilter(filter.id)}
              />
            ))}
            <PopupMenuItem title="Нет фильтра"
                           onClick={() => selectFilter(null)}
                           icon={NoFilterIcon}
            />
          </PopupMenu>
        </PopperOverlay>
      )}
    </div>
  )
}

export default observer(Filters)
import React from 'react'
import { useTaskContext } from '../../../store/TaskStore/TaskContext'
import { ReactComponent as FilterIcon } from '../../../images/icons/filter.svg'
import { ReactComponent as CheckboxIcon } from '../../../images/icons/checkbox.svg'

export default function TaskSearchItem(props) {
  const taskStore = useTaskContext()

  const taskFilter = taskStore.getFilterById(props.task.task_filter)

  return (
    <li className="search-results-item" onMouseDown={event => event.preventDefault()} onClick={props.onClick}>
      <div className="left-side">
        <div className="search-results-item-icon">
          <CheckboxIcon className="task-icon" />
        </div>
        <span>{props.task.title}</span>
      </div>
      {taskFilter &&
        <div className="search-results-item-icon">
          <FilterIcon className="filter-icon" style={{fill: taskFilter.color}}/>
        </div>
      }
    </li>
  )
}
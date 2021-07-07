import React, { useState } from 'react'
import { checkboxUnchecked , checkboxChecked, importantTaskInactive, importantTaskActive } from '../../images/index'
import { completeTask } from '../../tools/api'

export default function TaskListItem(props) {
  const [checkboxIcon, setCheckboxIcon] = useState(checkboxUnchecked)
  const [importantIcon, setImportantIcon] = useState(importantTaskInactive)
  const [style, setStyle] = useState('task-list-task')

  function onClickHandler () {
    setStyle('task-list-task clicked')
    setTimeout(() => setStyle('task-list-task'), 400)
    props.onClick()
  }
  
  function completeTaskClickHandler (event) {
    event.stopPropagation()
    completeTask(props.taskData.id).then(response => {
      if (response.ok) {
        props.updateTaskList()
      }
    })
  }

  return (
    <li className={style} onClick={onClickHandler}>
      <div className="left-side">
        <button onClick={completeTaskClickHandler}> 
          <img alt="checkbox" src={checkboxIcon}
            onMouseEnter={() => setCheckboxIcon(checkboxChecked)}
            onMouseLeave={() => setCheckboxIcon(checkboxUnchecked)}/>
        </button>
        <span>
          {props.taskData.title}
        </span>
      </div>
      <img onClick={event => event.stopPropagation()} alt='to favorite' src={importantIcon}
        onMouseEnter={() => setImportantIcon(importantTaskActive)}
        onMouseLeave={() => setImportantIcon(importantTaskInactive)}/>
    </li>
  )
}
  
import React, { useState } from 'react'
import { checkboxUnchecked , checkboxChecked, importantTaskInactive, importantTaskActive } from '../../images/index'
import { updateTask } from '../../tools/api'

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
    updateTask(props.taskData.id, {completed: true}).then(response => {
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
        <div>{props.taskData.title}</div>
      </div>
      <button onClick={event => event.stopPropagation()} onMouseEnter={() => setImportantIcon(importantTaskActive)}
              onMouseLeave={() => setImportantIcon(importantTaskInactive)}>
        <img alt='to favorite' src={importantIcon}/>
      </button>
    </li>
  )
}
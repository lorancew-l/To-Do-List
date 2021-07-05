import React, { useState } from 'react'
import { checkboxUnchecked , checkboxChecked, importantTaskInactive, importantTaskActive } from '../../images/index'
import { completeTask } from '../../tools/api'

export default function TaskListItem(props) {
  const [checkboxImg, setCheckboxImg] = useState(checkboxUnchecked)
  const [importantImg, setImportantImg] = useState(importantTaskInactive)
  const [style, setStyle] = useState('task-list-task')

  function checkboxOnMouseEnterHandler () {
    setCheckboxImg(checkboxChecked)
  }

  function checkboxOnMouseLeaveHandler () {
    setCheckboxImg(checkboxUnchecked)
  }

  function importantOnMouseEnterHandler () {
    setImportantImg(importantTaskActive)
  }

  function importantOnMouseLeaveHandler () {
    setImportantImg(importantTaskInactive)
  }

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
          <img alt="checkbox" src={checkboxImg}
            onMouseEnter={checkboxOnMouseEnterHandler}
            onMouseLeave={checkboxOnMouseLeaveHandler}/>
        </button>
        <span>
          {props.taskData.title}
        </span>
      </div>
      <img onClick={event => event.stopPropagation()} alt='to favorite' src={importantImg}
        onMouseEnter={importantOnMouseEnterHandler}
        onMouseLeave={importantOnMouseLeaveHandler}/>
    </li>
  )
}
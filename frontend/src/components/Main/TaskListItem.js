import React, { Fragment, useState, useEffect } from 'react'
import { checkboxUnchecked , checkboxHover, importantTaskInactive, importantTaskActive } from '../../images/index'
import { updateTask, getSubtaskList } from '../../tools/api'
import TaskDetail from '../Modal/TaskDetail/TaskDetail'
import ModalOverlay from '../Modal/ModalOverlay'

export default function TaskListItem(props) {
  const [checkboxIcon, setCheckboxIcon] = useState(checkboxUnchecked)
  const [importantIcon, setImportantIcon] = useState(importantTaskInactive)
  const [style, setStyle] = useState('task-list-task')
  const [showModal, setShowModal] = useState(false)
  const [subtaskList, setSubtaskList] = useState([])

  useEffect(() => {
    getSubtaskList(props.taskData.id).then(async response => {
      if (response.ok) {
        const data = await response.json()
        setSubtaskList(data)
      } 
    })
  }, [props])  

  function onClickHandler () {
    setStyle('task-list-task clicked')
    setTimeout(() => setStyle('task-list-task'), 400)
    setShowModal(true)
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
    <Fragment>
      <li className={style} onClick={onClickHandler}>
        <div className="left-side">
          <button onClick={completeTaskClickHandler}> 
            <img alt="checkbox" src={checkboxIcon}
              onMouseEnter={() => setCheckboxIcon(checkboxHover)}
              onMouseLeave={() => setCheckboxIcon(checkboxUnchecked)}/>
          </button>
          <div>
            <div>{props.taskData.title}</div>
            <div className="subtask-progress">
              {subtaskList.length ?
                  subtaskList.filter(subtask => subtask.completed === true).length + " из " + subtaskList.length
              : null}
            </div>
          </div>
        </div>
        <button onClick={event => event.stopPropagation()} onMouseEnter={() => setImportantIcon(importantTaskActive)}
                onMouseLeave={() => setImportantIcon(importantTaskInactive)}>
          <img alt='to favorite' src={importantIcon}/>
        </button>
      </li>
      {showModal?
        <ModalOverlay closeModal={() => setShowModal(false)}>
          <TaskDetail closeModal={() => setShowModal(false)} taskData={props.taskData} showPopper={props.showPopper} updateTaskList={props.updateTaskList}
                      updatePopperPos={props.updatePopperPos} popperPos={props.popperPos}/>
      </ModalOverlay>
      : null}
    </Fragment>
  )
}
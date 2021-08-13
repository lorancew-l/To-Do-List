import React, { Fragment, useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { checkboxUnchecked , checkboxHover, importantTaskInactive, importantTaskActive } from '../../images/index'
import { updateTask } from '../../tools/api/rest/tasks'
import TaskDetail from '../Modal/TaskDetail/TaskDetail'
import ModalOverlay from '../Modal/ModalOverlay'
import { taskItemAnimation } from '../../animations/animations'

export default function TaskListItem(props) {
  const [checkboxIcon, setCheckboxIcon] = useState(checkboxUnchecked)
  const [importantIcon, setImportantIcon] = useState(props.taskData.is_important ? importantTaskActive : importantTaskInactive)
  const [style, setStyle] = useState('task-list-task')
  const [showModal, setShowModal] = useState(false)


  useEffect(() => {
    setImportantIcon(props.taskData.is_important ? importantTaskActive : importantTaskInactive)
  }, [props.taskData.is_important])

  function onClickHandler() {
    setStyle('task-list-task clicked')
    setTimeout(() => setStyle('task-list-task'), 400)
    setShowModal(true)
  }
  
  function completeTaskClickHandler(event) {
    event.stopPropagation()
    updateTask(props.taskData.id, {completed: true}).then(response => {
      if (response.ok) {
        props.updateTaskList()
      }
    })
  }
  function toImportantTaskClickHandler(event) {
    event.stopPropagation()
    updateTask(props.taskData.id, {is_important: !props.taskData.is_important}).then(response => {
      if (response.ok) {
        props.updateTaskList()
      }
    })
  }
  
  return (
    <Fragment>
      <motion.li layout className={style} onClick={onClickHandler} custom={props.custom} {...taskItemAnimation}>
        <div className="left-side">
          <button onClick={completeTaskClickHandler}> 
            <img alt="checkbox" src={checkboxIcon}
              onMouseEnter={() => setCheckboxIcon(checkboxHover)}
              onMouseLeave={() => setCheckboxIcon(checkboxUnchecked)}/>
          </button>
          <div className="task-info">
            <div className="title">{props.taskData.title}</div>
            <div className="subtask-progress">
              {props.taskData.subtask_list.length ?
                  props.taskData.subtask_list.filter(subtask => subtask.completed === true).length + " из " + props.taskData.subtask_list.length
              : null}
            </div>
          </div>
        </div>
        <button onClick={event => toImportantTaskClickHandler(event)} 
                onMouseEnter={() => {if (!props.taskData.is_important) setImportantIcon(importantTaskActive)}}
                onMouseLeave={() => {if (!props.taskData.is_important) setImportantIcon(importantTaskInactive)}}>
          <img alt='to important' src={importantIcon}/>
        </button>
      </motion.li>
      <AnimatePresence>
        {showModal?
          <ModalOverlay closeModal={() => setShowModal(false)}>
            <TaskDetail closeModal={() => setShowModal(false)} taskData={props.taskData} showPopper={props.showPopper} updateTaskList={props.updateTaskList}
                        updatePopperPos={props.updatePopperPos} popperPos={props.popperPos}/>
          </ModalOverlay>
          : null
        }
      </AnimatePresence>
    </Fragment>
  )
}
import React, { Fragment, useState, useEffect } from 'react'
import { motion } from "framer-motion"
import { checkboxUnchecked , checkboxHover, importantTaskInactive, importantTaskActive } from '../../images/index'
import { taskItemAnimation } from '../../animations/animations'
import { useTaskContext } from '../../store/TaskStore/TaskContext'
import { observer } from 'mobx-react'

function TaskListItem(props) {
  const [checkboxIcon, setCheckboxIcon] = useState(checkboxUnchecked)
  const [importantIcon, setImportantIcon] = useState(props.taskData.is_important ? importantTaskActive : importantTaskInactive)
  const taskStore = useTaskContext()

  useEffect(() => {
    setImportantIcon(props.taskData.is_important ? importantTaskActive : importantTaskInactive)
  }, [props.taskData.is_important])
  
  function completeTask(event) {
    event.stopPropagation()
    taskStore.updateTask(props.taskData.id, {completed: !props.taskData.completed})
  }

  function taskToImportant(event) {
    event.stopPropagation()
    taskStore.updateTask(props.taskData.id, {is_important: !props.taskData.is_important})
  }

  return (
    <Fragment>
      <motion.li layout className="task-list-task" onClick={() => props.setEditedTaskId(props.taskData.id)} custom={props.custom} {...taskItemAnimation}>
        <div className="left-side">
          <button onClick={completeTask}> 
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
        <button onClick={event => taskToImportant(event)} 
                onMouseEnter={() => {if (!props.taskData.is_important) setImportantIcon(importantTaskActive)}}
                onMouseLeave={() => {if (!props.taskData.is_important) setImportantIcon(importantTaskInactive)}}>
          <img alt='to important' src={importantIcon}/>
        </button>
      </motion.li>
    </Fragment>
  )
}

export default observer(TaskListItem)
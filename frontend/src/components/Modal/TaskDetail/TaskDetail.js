import React, { useState, useEffect } from 'react'
import Heading from './Heading'
import Task from './Task/Task'
import Subtask from './Subtask/Subtask'
import AddSubtaskForm from './AddSubtaskForm'
import Deadline from './Deadline'
import Note from './Note'
import { getSubtaskList } from '../../../tools/api/rest/subtasks'
import useFetch from '../../../hooks/useFetch'
import { getTaskDetailAnimation } from '../../../animations/animations'
import { motion } from 'framer-motion'


export default function TaskDetail(props) {
  const [deadline, setDeadline] = useState(props.taskData.deadline)
  const [title, setTitle] = useState(props.taskData.title)
  const [note, setNote] = useState(props.taskData.note)
  const [completed, setCompleted] = useState(props.taskData.completed)
  const [isImportant, setImportant] = useState(props.taskData.is_important)

  const subtaskList = useFetch(getSubtaskList, [props.taskData.id])

  useEffect(() => {
    return () => props.updateTaskList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!subtaskList.isLoaded) {
    return null
  }

  return (
    <motion.div className="task-detail" onClick={event => event.stopPropagation()} {...getTaskDetailAnimation(window.innerWidth)}>
      <Heading onClose={props.closeModal} creationDate={props.taskData.creation_date}/>
      <div className="detail-holder">
        <ul className="subtask-list">
          <Task title={title} setTitle={setTitle} id={props.taskData.id} completed={completed} setCompleted={setCompleted}
                isImportant={isImportant} setImportant={setImportant}/>
          {subtaskList.value.map(subtask => {
              return <Subtask key={subtask.id} id={subtask.id} taskId={props.taskData.id} title={subtask.title}
                              completed={subtask.completed} updateSubtaskList={subtaskList.update}/>})
          }
          <AddSubtaskForm taskId={props.taskData.id} updateSubtaskList={subtaskList.update}/>
        </ul>
      </div>
      <Deadline deadline={deadline} taskId={props.taskData.id} showPopper={props.showPopper} updatePopperPos={props.updatePopperPos}
                popperPos={props.popperPos} setDeadline={setDeadline}/>
      <Note note={note} setNote={setNote} taskId={props.taskData.id}/>
    </motion.div>
  )
}

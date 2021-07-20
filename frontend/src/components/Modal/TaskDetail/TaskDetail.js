import React, { useState, useEffect, Fragment, useRef } from 'react'
import Heading from './Heading'
import Task from './Task/Task'
import Subtask from './Subtask/Subtask'
import AddSubtaskForm from './AddSubtaskForm'
import Deadline from './Deadline'
import Note from './Note'
import { getSubtaskList } from '../../../tools/api'



export default function TaskDetail(props) {
  const [deadline, setDeadline] = useState(props.taskData.deadline)
  const [title, setTitle] = useState(props.taskData.title)
  const [note, setNote] = useState(props.taskData.note)
  const [completed, setCompleted] = useState(props.taskData.completed)

  const [subtaskList, setSubtaskList] = useState([])
  const [isLoaded, setLoaded] = useState(false)

  const isFirstRun = useRef(true)

  function updateSubtaskList() {
    getSubtaskList(props.taskData.id).then(async response => {
      if (response.ok) {
        const data = await response.json()
        setSubtaskList(data)
      } 
    })
  }
  
  useEffect(() => {
    if (isFirstRun) {
      updateSubtaskList()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) 

  useEffect(() => {
    if (!isLoaded) {
      if (!isFirstRun.current) {
        setLoaded(true)
      }
      else {
        isFirstRun.current = false
      }
    }
  }, [subtaskList, isLoaded])

  useEffect(() => {
    return () => props.updateTaskList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Fragment>
      {isLoaded ?
        <div className="task-detail" onClick={event => event.stopPropagation()}>
          <Heading onClose={props.closeModal} creationDate={props.taskData.creation_date}/>
          <div className="detail-holder">
            <ul className="subtask-list">
              <Task title={title} setTitle={setTitle} id={props.taskData.id} completed={completed} setCompleted={setCompleted}/>
              {subtaskList.map(subtask => {
                  return <Subtask key={subtask.id} id={subtask.id} taskId={props.taskData.id} title={subtask.title}
                                  completed={subtask.completed} updateSubtaskList={updateSubtaskList}/>})
              }
              <AddSubtaskForm taskId={props.taskData.id} updateSubtaskList={updateSubtaskList}/>
            </ul>
          </div>
          <Deadline deadline={deadline} taskId={props.taskData.id} showPopper={props.showPopper} updatePopperPos={props.updatePopperPos}
                    popperPos={props.popperPos} setDeadline={setDeadline}/>
          <Note note={note} setNote={setNote} taskId={props.taskData.id}/>
        </div>
        : null}
    </Fragment>
  )
}

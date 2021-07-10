import React, { useState } from 'react'
import NoFocusContent from './NoFocusContent'
import OnFocusContent from './OnFocusContent'

import { addTask } from '../../../tools/api'


export default function AddTaskForm(props) {
  const [onFocus, setOnFocus] = useState(false)
  const [taskName, setTaskName] = useState('')
  const [deadline, setDeadline] = useState(null)
  const [deadlineStringRepresentation, setDeadlineStringRepresentation] = useState(null)

  function addTaskClickHandler() {setOnFocus(true)}

  function cancelClickHandler() {
    setOnFocus(false)
    setTaskName('')
    setDeadline(null)
    setDeadlineStringRepresentation(null)
  }

  function onSubmitHandler(event) {
    event.preventDefault()
    addTask({'title': taskName, 'deadline': deadline}).then(response => {
      if (response.ok) {
        props.updateTaskList()
      }
    })
  }

  function deadlineChangeHandler(newDate, stringRepresentation) {
    setDeadline(newDate)
    setDeadlineStringRepresentation(stringRepresentation)
  }

  return (
    <form onSubmit={onSubmitHandler}>
      {onFocus? <OnFocusContent onCancelClick={cancelClickHandler} showPopper={props.showPopper} taskName={taskName}
                                popperPos={props.popperPos} updatePopperPos={props.updatePopperPos} deadline={deadlineStringRepresentation}
                                onDateClick={deadlineChangeHandler} setTaskName={setTaskName}></OnFocusContent>
              : <NoFocusContent onClick={addTaskClickHandler}></NoFocusContent>}
    </form>
  )
}

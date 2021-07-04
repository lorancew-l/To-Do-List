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
    console.log(addTask({'title': taskName, 'deadline': deadline}))
  }

  function deadlineChangeHandler(newDate, stringRepresentation) {
    setDeadline(newDate)
    setDeadlineStringRepresentation(stringRepresentation)
  }

  return (
    <form onSubmit={onSubmitHandler}>
      {onFocus? <OnFocusContent onCancelClick={cancelClickHandler} showPopup={props.showPopup} taskName={taskName}
                                updatePopupPos={props.updatePopupPos} deadline={deadlineStringRepresentation}
                                onDateClick={deadlineChangeHandler} setTaskName={setTaskName}></OnFocusContent>
              : <NoFocusContent onClick={addTaskClickHandler}></NoFocusContent>}
    </form>
  )
}

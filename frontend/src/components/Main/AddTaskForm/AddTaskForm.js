import React, { Fragment, useState } from 'react'
import NoFocusContent from '../../AddItemForm/NoFocusContent'
import OnFocusContent from './OnFocusContent'
import { quickTask } from '../../../images/index'
import { addTask } from '../../../tools/api'


export default function AddTaskForm(props) {
  const [onFocus, setOnFocus] = useState(false)
  const [taskName, setTaskName] = useState('')
  const [deadline, setDeadline] = useState(null)
  const [deadlineStringRepresentation, setDeadlineStringRepresentation] = useState(null)

  function cancelClickHandler() {
    setOnFocus(false)
    setTaskName('')
    setDeadline(null)
    setDeadlineStringRepresentation(null)
  }

  function submitHandler(event) {
    event.preventDefault()
    addTask({'title': taskName, 'deadline': deadline}).then(response => {
      if (response.ok) {
        setTaskName('')
        props.updateTaskList()
      }
    })
  }

  function deadlineChangeHandler(newDate, stringRepresentation) {
    setDeadline(newDate)
    setDeadlineStringRepresentation(stringRepresentation)
  }

  return (
    <Fragment>
      {onFocus? <OnFocusContent onSubmit={submitHandler} onCancelClick={cancelClickHandler} taskName={taskName} deadline={deadline}
                                deadlineStringRepresentation={deadlineStringRepresentation}
                                onDateClick={deadlineChangeHandler} setTaskName={setTaskName}></OnFocusContent>
              : <NoFocusContent className="task-list-add-item" text="Добавить задачу" icon={quickTask} iconAlt="add task"
                                onClick={() => setOnFocus(true)}></NoFocusContent>}
    </Fragment>
  )
}

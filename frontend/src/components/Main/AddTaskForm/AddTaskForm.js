import React, { Fragment, useState } from 'react'
import NoFocusContent from '../../AddItemForm/NoFocusContent'
import OnFocusContent from './OnFocusContent'
import { quickTask } from '../../../images/index'
import { addTask } from '../../../tools/api'
import useInput from '../../../hooks/useInput'


export default function AddTaskForm(props) {
  const [onFocus, setOnFocus] = useState(false)
  const taskName = useInput('')
  const [deadline, setDeadline] = useState(null)
  const [deadlineStringRepresentation, setDeadlineStringRepresentation] = useState('Срок')

  function cancelClickHandler() {
    setOnFocus(false)
    taskName.clear()
    setDeadline(null)
    setDeadlineStringRepresentation('Срок')
  }

  function submitHandler(event) {
    event.preventDefault()
    addTask({'title': taskName.value, 'deadline': deadline}).then(response => {
      if (response.ok) {
        taskName.clear()
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
                                onDateClick={deadlineChangeHandler}></OnFocusContent>
              : <NoFocusContent className="task-list-add-item" text="Добавить задачу" icon={quickTask} iconAlt="add task"
                                onClick={() => setOnFocus(true)}></NoFocusContent>}
    </Fragment>
  )
}

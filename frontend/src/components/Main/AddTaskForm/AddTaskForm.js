import React, { Fragment, useState } from 'react'
import NoFocusContent from '../../AddItemForm/NoFocusContent'
import OnFocusContent from './OnFocusContent'
import { quickTask } from '../../../images/index'
import { addTask } from '../../../tools/api/rest/tasks'
import useInput from '../../../hooks/useInput'
import { taskItemAnimation } from '../../../animations/animations'
import { useTaskContext } from '../../../store/TaskStore/TaskContext'


export default function AddTaskForm(props) {
  const [onFocus, setOnFocus] = useState(false)
  const taskName = useInput('', 64)
  const [deadline, setDeadline] = useState(null)
  const [deadlineStringRepresentation, setDeadlineStringRepresentation] = useState('Срок')
  const taskStore = useTaskContext()

  function cancelClickHandler() {
    setOnFocus(false)
    taskName.clear()
    setDeadline(null)
    setDeadlineStringRepresentation('Срок')
  }

  function submitHandler(event) {
    event.preventDefault()
    addTask({'title': taskName.value, 'deadline': deadline, 'task_filter': props.taskFilterId})
    .then(response => {
      if (response.ok) {
        taskName.clear()
        return response.json()
      }
    })
    .then(task => {console.log('handler', task);taskStore.addTask(task)})
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
                                animation={{transition: taskItemAnimation.transition}}
                                onClick={() => setOnFocus(true)}></NoFocusContent>}
    </Fragment>
  )
}

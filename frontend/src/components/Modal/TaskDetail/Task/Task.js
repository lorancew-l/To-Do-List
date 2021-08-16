import React, { useState, Fragment } from 'react'
import NoFocusContent from './NoFocusContent'
import OnFocusContent from '../../../AddItemForm/OnFocusContent'
import useInput from '../../../../hooks/useInput'
import { useTaskContext } from '../../../../store/TaskStore/TaskContext'

export default function Task(props) {
  const [onFocus, setOnFocus] = useState(false)
  const taskNewTitle = useInput(props.title, 64)
  const taskStore = useTaskContext()
  
  function cancelTitleEdit() {
    setOnFocus(false)
    taskNewTitle.clear()
  }

  function updateTitle(event) {
    event.preventDefault()
    taskStore.updateTaskItem(props.id, {title: taskNewTitle.value})
      .then(() => setOnFocus(false))
      .catch((error) => console.log('Task', error))
  }

  function completeTask(event) {
    event.stopPropagation()
    taskStore.updateTaskItem(props.id, {completed: !props.completed})
      .catch((error) => console.log('Task', error))
  }

  function taskToImportant(event) {
    event.stopPropagation()
    taskStore.updateTaskItem(props.id, {is_important: !props.isImportant})
      .catch((error) => console.log('Task', error))
  }
  
  return (
    <Fragment>
      {onFocus? <OnFocusContent className="task edit no-hover" input={taskNewTitle} onCancelClick={cancelTitleEdit}
                                isSubmitDisabled={!taskNewTitle.value | taskNewTitle.value === props.title} onSubmit={updateTitle}/>
              : <NoFocusContent completed={props.completed} title={props.title} onClick={() => setOnFocus(true)} isImportant={props.isImportant}
                                onComplete={event => completeTask(event)} onImportantClick={taskToImportant}/>}
    </Fragment>
  )
}

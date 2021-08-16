import React, { useState, Fragment } from 'react'
import NoFocusContent from './NoFocusContent'
import OnFocusContent from '../../../AddItemForm/OnFocusContent'
import useInput from '../../../../hooks/useInput'
import { useTaskContext } from '../../../../store/TaskStore/TaskContext'

export default function Subtask(props) {
  const [onFocus, setOnFocus] = useState(false)
  const subtaskNewTitle = useInput(props.title, 64)
  const taskStore = useTaskContext()
  
  function cancelSubtaskEdit() {
    setOnFocus(false)
    subtaskNewTitle.clear()
  }

  function updateSubtaskTitle(event) {
    event.preventDefault()
    taskStore.updateSubtask(props.taskId, props.id, {title: subtaskNewTitle.value})
      .then(() => {setOnFocus(false)})
  }

  function completeSubtask(event) {
    event.stopPropagation()
    taskStore.updateSubtask(props.taskId, props.id, {completed: !props.completed})
      .then(() => {setOnFocus(false)})
  }

  function removeSubtask(event) {
    event.stopPropagation()
    taskStore.deleteSubtask(props.taskId, props.id)
  }
  
  return (
    <Fragment>
      {onFocus? <OnFocusContent className="subtask edit no-hover" input={subtaskNewTitle} onCancelClick={cancelSubtaskEdit}
                                isSubmitDisabled={!subtaskNewTitle.value | subtaskNewTitle.value === props.title} onSubmit={updateSubtaskTitle}/>
              : <NoFocusContent onComplete={event => completeSubtask(event)} onDelete={removeSubtask}
                                onClick={() => setOnFocus(true)} title={props.title} completed={props.completed}/>}
    </Fragment>
  )
}

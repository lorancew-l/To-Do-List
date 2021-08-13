import React, { useState, Fragment } from 'react'
import { updateSubtask, deleteSubtask } from '../../../../tools/api/rest/subtasks'
import NoFocusContent from './NoFocusContent'
import OnFocusContent from '../../../AddItemForm/OnFocusContent'
import useInput from '../../../../hooks/useInput'

export default function Subtask(props) {
  const [onFocus, setOnFocus] = useState(false)
  const subtaskNewTitle = useInput(props.title, 64)
  
  function cancelClickHandler() {
    setOnFocus(false)
    subtaskNewTitle.clear()
  }

  function submitHandler(event) {
    event.preventDefault()
    updateSubtask(props.taskId, props.id, {title: subtaskNewTitle.value}).then(response => {
      if (response.ok) {
        props.updateSubtaskList()
        setOnFocus(false)
      }
    })  
  }

  function completeHandler(event) {
    event.stopPropagation()
    updateSubtask(props.taskId, props.id, {completed: !props.completed}).then(response => {
      if (response.ok) {
        props.updateSubtaskList()
      }
    })
  }

  function deleteHandler(event) {
    event.stopPropagation()
    deleteSubtask(props.taskId, props.id).then(response => {
      if (response.ok) {
        props.updateSubtaskList()
      }
    })
  }
  
  return (
    <Fragment>
      {onFocus? <OnFocusContent className="subtask edit no-hover" input={subtaskNewTitle} onCancelClick={cancelClickHandler}
                                isSubmitDisabled={!subtaskNewTitle.value | subtaskNewTitle.value === props.title} onSubmit={submitHandler}/>
              : <NoFocusContent onComplete={event => completeHandler(event)} onDelete={deleteHandler}
                                onClick={() => setOnFocus(true)} title={props.title} completed={props.completed}/>}
    </Fragment>
  )
}

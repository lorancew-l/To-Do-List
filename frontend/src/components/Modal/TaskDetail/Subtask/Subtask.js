import React, { useState, useRef, useEffect, Fragment } from 'react'
import { updateSubtask, deleteSubtask } from '../../../../tools/api'
import NoFocusContent from './NoFocusContent'
import OnFocusContent from '../../../AddItemForm/OnFocusContent'

export default function Subtask(props) {
  const [onFocus, setOnFocus] = useState(false)
  const [subtaskNewTitle, setSubtaskNewTitle] = useState(props.title)

  const isFirstRun = useRef(true);
  
  function cancelClickHandler() {
    setOnFocus(false)
    setSubtaskNewTitle(props.title)
  }

  function submitHandler(event) {
    event.preventDefault()
    updateSubtask(props.taskId, props.id, {title: subtaskNewTitle}).then(response => {
      if (response.ok) {
        props.updateSubtaskList()
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

  useEffect(() => {
    if (!isFirstRun.current) {
      setOnFocus(false)
      setSubtaskNewTitle(props.title)
    }
    else {
      isFirstRun.current = false;
    }
  }, [props.title])
  
  return (
    <Fragment>
      {onFocus? <OnFocusContent className="subtask edit no-hover" inputValue={subtaskNewTitle} setInputValue={setSubtaskNewTitle} onCancelClick={cancelClickHandler}
                                isSubmitDisabled={!subtaskNewTitle | subtaskNewTitle === props.title} onSubmit={submitHandler}/>
              : <NoFocusContent onComplete={event => completeHandler(event)} onDelete={deleteHandler}
                                onClick={() => setOnFocus(true)} title={props.title} completed={props.completed}/>}
    </Fragment>
  )
}

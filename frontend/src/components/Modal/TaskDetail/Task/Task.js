import React, { useState, Fragment } from 'react'
import NoFocusContent from './NoFocusContent'
import OnFocusContent from '../../../AddItemForm/OnFocusContent'
import { updateTask } from '../../../../tools/api/rest/tasks'
import useInput from '../../../../hooks/useInput'

export default function Task(props) {
  const [onFocus, setOnFocus] = useState(false)
  const taskNewTitle = useInput(props.title, 64)
  
  function cancelClickHandler() {
    setOnFocus(false)
    taskNewTitle.clear()
  }

  function submitHandler(event) {
    event.preventDefault()
    updateTask(props.id, {title: taskNewTitle.value}).then(response => {
      if (response.ok) {
        response.json().then(responseData => {
          props.setTitle(responseData.title)
          setOnFocus(false)
        })
      }
    })
  }

  function completeHandler(event) {
    event.stopPropagation()
    updateTask(props.id, {completed: !props.completed}).then(response => {
      if (response.ok) {
        response.json().then(responseData => {
          props.setCompleted(responseData.completed)
        })
      }
    })
  }

  function toImportantTaskClickHandler(event) {
    event.stopPropagation()
    updateTask(props.id, {is_important: !props.isImportant}).then(response => {
      if (response.ok) {
        props.setImportant(!props.isImportant)
      }
    })
  }
  
  return (
    <Fragment>
      {onFocus? <OnFocusContent className="task edit no-hover" input={taskNewTitle} onCancelClick={cancelClickHandler}
                                isSubmitDisabled={!taskNewTitle.value | taskNewTitle.value === props.title} onSubmit={submitHandler}/>
              : <NoFocusContent completed={props.completed} title={props.title} onClick={() => setOnFocus(true)} isImportant={props.isImportant}
                                onComplete={event => completeHandler(event)} onImportantClick={toImportantTaskClickHandler}/>}
    </Fragment>
  )
}

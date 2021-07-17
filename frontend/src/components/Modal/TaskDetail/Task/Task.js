import React, { useEffect, useState, useRef, Fragment } from 'react'
import NoFocusContent from './NoFocusContent'
import OnFocusContent from '../../../AddItemForm/OnFocusContent'
import { updateTask } from '../../../../tools/api'

export default function Task(props) {
  const [onFocus, setOnFocus] = useState(false)
  const [taskNewTitle, setTaskNewTitle] = useState(props.title)

  const isFirstRun = useRef(true);
  
  function cancelClickHandler() {
    setOnFocus(false)
    setTaskNewTitle(props.title)
  }

  function submitHandler(event) {
    event.preventDefault()
    updateTask(props.id, {title: taskNewTitle}).then(response => {
      if (response.ok) {
        response.json().then(responseData => {
          props.setTitle(responseData.title)
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

  useEffect(() => {
    if (!isFirstRun.current) {
      setOnFocus(false)
      setTaskNewTitle(props.title)
    }
    else {
      isFirstRun.current = false;
    }
  }, [props.title])
  
  return (
    <Fragment>
      {onFocus? <OnFocusContent className="task edit no-hover" inputValue={taskNewTitle} setInputValue={setTaskNewTitle} onCancelClick={cancelClickHandler}
                                isSubmitDisabled={!taskNewTitle | taskNewTitle === props.title} onSubmit={submitHandler}/>
              : <NoFocusContent completed={props.completed} title={props.title} onClick={() => setOnFocus(true)} 
                                onComplete={event => completeHandler(event)} />}
    </Fragment>
  )
}

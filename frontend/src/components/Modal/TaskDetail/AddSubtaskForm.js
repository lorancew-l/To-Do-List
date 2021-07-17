import React, { Fragment, useState } from 'react'
import NoFocusContent from '../../AddItemForm/NoFocusContent'
import OnFocusContent from '../../AddItemForm/OnFocusContent'
import { addSubtask } from '../../../tools/api'
import { quickTask } from '../../../images/index'

export default function AddSubtaskForm(props) {
  const [onFocus, setOnFocus] = useState(false)
  const [subtaskTitle, setSubtaskTitle] = useState('')

  function cancelClickHandler() {
    setOnFocus(false)
    setSubtaskTitle('')
  }

  function onSubmitHandler(event) {
    event.preventDefault()
    addSubtask(props.taskId, {'title': subtaskTitle}).then(response => {
      if (response.ok) {
        setSubtaskTitle('')
        props.updateSubtaskList()
      }
    })
  }
  
  return (
    <Fragment>
      {onFocus? <OnFocusContent className="add-subtask edit no-hover" onCancelClick={cancelClickHandler} onSubmit={onSubmitHandler}
                                inputValue={subtaskTitle} setInputValue={setSubtaskTitle} isSubmitDisabled={!subtaskTitle} scrollIntoView={true}/>
              : <NoFocusContent className="add-subtask" text="Добавить подзадачу" icon={quickTask} iconAlt={'add subtask'}
                                onClick={() => setOnFocus(true)}/>
      }
    </Fragment>
  )
}

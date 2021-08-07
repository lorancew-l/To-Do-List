import React, { Fragment, useState } from 'react'
import NoFocusContent from '../../AddItemForm/NoFocusContent'
import OnFocusContent from '../../AddItemForm/OnFocusContent'
import { addSubtask } from '../../../tools/api'
import { quickTask } from '../../../images/index'
import useInput from '../../../hooks/useInput'

export default function AddSubtaskForm(props) {
  const [onFocus, setOnFocus] = useState(false)
  const subtaskTitle = useInput('', 64)

  function cancelClickHandler() {
    setOnFocus(false)
    subtaskTitle.clear()
  }

  function onSubmitHandler(event) {
    event.preventDefault()
    addSubtask(props.taskId, {'title': subtaskTitle.value}).then(response => {
      if (response.ok) {
        subtaskTitle.clear()
        props.updateSubtaskList()
      }
    })
  }
  
  return (
    <Fragment>
      {onFocus? <OnFocusContent className="add-subtask edit no-hover" onCancelClick={cancelClickHandler} onSubmit={onSubmitHandler}
                                input={subtaskTitle} isSubmitDisabled={subtaskTitle.requiredEmpty} scrollIntoView={true}/>
              : <NoFocusContent className="add-subtask" text="Добавить подзадачу" icon={quickTask} iconAlt={'add subtask'}
                                onClick={() => setOnFocus(true)}/>
      }
    </Fragment>
  )
}

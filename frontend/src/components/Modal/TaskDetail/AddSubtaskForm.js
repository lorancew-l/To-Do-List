import React, { Fragment, useState } from 'react'
import NoFocusContent from '../../AddItemForm/NoFocusContent'
import OnFocusContent from '../../AddItemForm/OnFocusContent'
import { quickTask } from '../../../images/index'
import useInput from '../../../hooks/useInput'
import { useTaskContext } from '../../../store/TaskStore/TaskContext'

export default function AddSubtaskForm(props) {
  const [onFocus, setOnFocus] = useState(false)
  const subtaskTitle = useInput('', 64)
  const taskStore = useTaskContext()

  function cancelInput() {
    setOnFocus(false)
    subtaskTitle.clear()
  }

  function addSubtask(event) {
    event.preventDefault()
    taskStore.addSubtask(props.taskId, {'title': subtaskTitle.value})
      .then(() => subtaskTitle.clear())
      .catch(error => console.log('AddSubtaskForm', error))
  }
  
  return (
    <Fragment>
      {onFocus? <OnFocusContent className="add-subtask edit no-hover" onCancelClick={cancelInput} onSubmit={addSubtask}
                                input={subtaskTitle} isSubmitDisabled={subtaskTitle.empty} scrollIntoView={true}/>
              : <NoFocusContent className="add-subtask" text="Добавить подзадачу" icon={quickTask} iconAlt={'add subtask'}
                                onClick={() => setOnFocus(true)}/>
      }
    </Fragment>
  )
}

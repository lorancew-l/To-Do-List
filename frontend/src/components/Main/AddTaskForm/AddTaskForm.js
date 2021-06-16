import React, { useState } from 'react'
import NoFocusContent from './NoFocusContent'
import OnFocusContent from './OnFocusContent'


export default function AddTaskForm(props) {
  const [onFocus, setOnFocus] = useState(false)

  function addTaskClickHandler() {setOnFocus(true)}

  function cancelClickHandler() {setOnFocus(false)}

  function submitClickHandler() {}

  return (
    <form>
      {onFocus? <OnFocusContent onCancelClick={cancelClickHandler} showPopup={props.showPopup}
                                updatePopupPos={props.updatePopupPos}></OnFocusContent>
              : <NoFocusContent onClick={addTaskClickHandler}></NoFocusContent>}
    </form>
  )
}

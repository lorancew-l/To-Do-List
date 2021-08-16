import React, { useState, useRef, useEffect } from 'react'
import { updateTaskRequest } from '../../../tools/api/rest/tasks'


export default function Note(props) {
  const [noteText, setNoteText] = useState(props.note || '')
  const textareaRef = useRef(null)
  const submitDisabled = noteText === (props.note || '')

  function handleSubmit(event) {
    event.preventDefault()
    if (noteText !== props.note) {
      updateTaskRequest(props.taskId, {'note': noteText}).then(response => {
        if (response.ok) {
          response.json().then(responseData => {
            props.setNote(responseData.note)
          })
        }
      })
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px"
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
    }
  })

  return (
    <form className="add-note" onSubmit={event => handleSubmit(event)}>
      <div className="detail-holder">
        <textarea className="note-textarea" placeholder="Введите текст заметки" value={noteText} ref={textareaRef}
                  onChange={event => setNoteText(event.target.value)}></textarea>
      </div> 
      <button type="submit" disabled={submitDisabled} className="save-note"
              style={{opacity: submitDisabled ? 0.4 : 1}}>Добавить заметку</button>
    </form>
  )
}

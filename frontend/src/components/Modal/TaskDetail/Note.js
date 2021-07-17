import React, { useState, useRef, useEffect } from 'react'
import { updateTask } from '../../../tools/api'


export default function Note(props) {
  const [noteText, setNoteText] = useState(props.note || '')
  const textareaRef = useRef(null)

  function handleSubmit(event) {
    event.preventDefault()
    if (noteText !== props.note) {
      updateTask(props.taskId, {'note': noteText}).then(response => {
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
      {(noteText !== (props.note || '')) ? <button className="save-note">Добавить заметку</button> : null}

    </form>
  )
}

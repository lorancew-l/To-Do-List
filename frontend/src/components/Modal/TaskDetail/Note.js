import React, { useState, useRef, useEffect } from 'react'
import { useTaskContext } from '../../../store/TaskStore/TaskContext'

export default function Note(props) {
  const [noteText, setNoteText] = useState(props.note || '')
  const textareaRef = useRef(null)
  const submitDisabled = noteText === (props.note || '')

  const taskStore = useTaskContext()

  function handleSubmit(event) {
    event.preventDefault()
    if (noteText !== props.note) {
      taskStore.updateTask(props.taskId, {'note': noteText})
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

import React, { useState, useEffect } from 'react'
import TaskListItem from './TaskListItem'
import AddTask from './AddTaskForm/AddTaskForm'


export default function Main(props) {
  const [taskList, setTaskList] = useState([])
  const currentDate = new Date()

  useEffect(() => {
    fetch('http://localhost:8000/api/task-list/')
    .then(response => response.json())
    .then(taskList => setTaskList(taskList))
  })

  return (
    <main className={props.showSidebar? 'sidebar-on': 'sidebar-off'}>
      <div className="container">
        <div className="content">
          <div className="task-list-header">
            <span>Сегодня</span>
            <small>{currentDate.toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' })}</small>
          </div>
          <ul className="task-list">
              {taskList.map(element => {
                return <TaskListItem key={element.id} title={element.title} onClick={props.onTaskClick}></TaskListItem>})
              }
              <AddTask showPopup={props.showPopup} updatePopupPos={props.updatePopupPos}></AddTask>
          </ul>
        </div>
      </div>
    </main>
  )
}
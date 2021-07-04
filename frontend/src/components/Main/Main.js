import React, { useState, useEffect } from 'react'
import TaskListItem from './TaskListItem'
import AddTask from './AddTaskForm/AddTaskForm'
import { getTaskList } from '../../tools/api'


export default function Main(props) {
  const [taskList, setTaskList] = useState([])
  const currentDate = new Date()

  useEffect(() => {
    updateTaskList()
  }, [])  

  function updateTaskList() {
    getTaskList().then(data => setTaskList(data))
  }

  return (
    <main className={props.showSidebar? 'sidebar-on': 'sidebar-off'}>
      <div className="container">
        <div className="content">
          <div className="task-list-header">
            <span>Сегодня</span>
            <small>{currentDate.toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' })}</small>
          </div>
          <ul className="task-list">
              {taskList.map(task => {
                return <TaskListItem key={task.id} taskData={task} onClick={props.onTaskClick}></TaskListItem>})
              }
              <AddTask showPopup={props.showPopup} updatePopupPos={props.updatePopupPos} updateTaskList={updateTaskList}></AddTask>
          </ul>
        </div>
      </div>
    </main>
  )
}
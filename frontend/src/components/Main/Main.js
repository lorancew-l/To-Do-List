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
    getTaskList().then(async response => {
      if (response.ok) {
        const data = await response.json()
        setTaskList(data)
      } 
    })
  }

  return (
    <main className={props.showSidebar? "sidebar-on" : "sidebar-off"}>
      <div className={props.showSidebar? "sidebar-overlay on" : "sidebar-overlay off"}></div>
      <div className="container">
        <div className="task-list-header">
          <div className="task-list-header-content">
            <span>Сегодня</span>
            <small>{currentDate.toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' })}</small>
          </div>
        </div>
        <ul className="task-list">
            {taskList.map(task => {
              return <TaskListItem key={task.id} taskData={task} updateTaskList={updateTaskList}></TaskListItem>})
            }
            <AddTask updateTaskList={updateTaskList}></AddTask>
        </ul>
      </div>
    </main>
  )
}
import React from 'react'
import TaskListItem from './TaskListItem'
import AddTask from './AddTaskForm/AddTaskForm'
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import { useTaskContext } from '../../store/TaskStore/TaskContext'
import { observer } from 'mobx-react'

function Main(props) {
  const currentDate = new Date()
  const taskStore = useTaskContext()

  return (
    <main className={props.showSidebar? "main sidebar-on" : "main sidebar-off"}>
      <div className={props.showSidebar? "sidebar-overlay on" : "sidebar-overlay off"}></div>
      <div className="container">
        <div className="task-list-header">
          <div className="task-list-header-content">
            <span>Сегодня</span>
            <small>{currentDate.toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' })}</small>
          </div>
        </div>
        <ul className="task-list">
          <AnimateSharedLayout>
            <AnimatePresence initial={false}>
              {taskStore.filteredTasks.map((task, i) => {
                return <TaskListItem key={task.id} taskData={task} custom={i}></TaskListItem>})
              }
              <AddTask></AddTask>
            </AnimatePresence>
          </AnimateSharedLayout>
        </ul>
      </div>
    </main>
  )
}

export default observer(Main)
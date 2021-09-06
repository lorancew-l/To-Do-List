import React, { Fragment, useState } from 'react'
import TaskListItem from './TaskListItem'
import ModalOverlay from '../Modal/ModalOverlay'
import TaskDetail from '../Modal/TaskDetail/TaskDetail'
import { AnimatePresence } from 'framer-motion'
import { useTaskContext } from '../../store/TaskStore/TaskContext'
import { observer } from 'mobx-react'
import AddTaskForm from './AddTaskForm/AddTaskForm'

function Main(props) {
  const [editedTaskId, setEditedTaskId] = useState(null)

  const currentDate = new Date()
  const taskStore = useTaskContext()

  return (
    <Fragment>
      <main className={props.showSidebar? "main sidebar-on" : "main sidebar-off"}>
        <div className={props.showSidebar? "sidebar-overlay on" : "sidebar-overlay off"}></div>
        <div className={props.showSidebar? "container sidebar-on" : "container sidebar-off"}>
          <div className="task-list-header">
            <div className="task-list-header-content">
              <span>Сегодня</span>
              <small>{currentDate.toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' })}</small>
            </div>
          </div>
          <ul className="task-list">
            <AnimatePresence initial={false}>
              {taskStore.filteredTasks.map((task, i) => {
                return <TaskListItem key={task.id} taskData={task} custom={i} setEditedTaskId={setEditedTaskId}/>})
              }
              <AddTaskForm></AddTaskForm>
            </AnimatePresence>
          </ul>
        </div>
      </main>
      <AnimatePresence>
        {editedTaskId &&
          <ModalOverlay closeModal={() => setEditedTaskId(null)}>
            <TaskDetail closeModal={() => setEditedTaskId(null)} taskId={editedTaskId}/>
          </ModalOverlay>
        }
      </AnimatePresence>
    </Fragment>
  )
}

export default observer(Main)
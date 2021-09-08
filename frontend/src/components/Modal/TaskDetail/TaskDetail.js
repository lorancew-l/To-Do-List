import React from 'react'
import Heading from './Heading'
import Task from './Task/Task'
import Subtask from './Subtask/Subtask'
import AddSubtaskForm from './AddSubtaskForm'
import Deadline from './Deadline'
import Filters from './FiltersList/FiltersList'
import Note from './Note'
import { getTaskDetailAnimation } from '../../../animations/animations'
import { motion } from 'framer-motion'
import { useTaskContext } from '../../../store/TaskStore/TaskContext'
import { observer } from 'mobx-react'


function TaskDetail(props) {
  const taskStore = useTaskContext()
  const task = taskStore.getTaskById(props.taskId)

  return (
    <motion.div className="task-detail" onClick={event => event.stopPropagation()} {...getTaskDetailAnimation(window.innerWidth)}>
      <Heading onClose={props.closeModal} creationDate={task.creation_date}/>
      <div className="detail-holder">
        <ul className="subtask-list">
          <Task title={task.title} id={task.id} completed={task.completed}
                isImportant={task.is_important}/>
          {task.subtask_list.map(subtask => {
              return <Subtask key={subtask.id} id={subtask.id} taskId={task.id} title={subtask.title}
                              completed={subtask.completed}/>})
          }
          <AddSubtaskForm taskId={task.id}/>
        </ul>
      </div>
      <Deadline deadline={task.deadline} taskId={task.id}/>
      <Filters task={task}/>
      <Note note={task.note} taskId={task.id}/>
    </motion.div>
  )
}

export default observer(TaskDetail)
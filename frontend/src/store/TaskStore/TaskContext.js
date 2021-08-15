import React from 'react'
import TaskStore from './TaskStore'

const TaskContext = React.createContext(null)

export function TaskProvider ({children}) {
  return (
    <TaskContext.Provider value={new TaskStore()}>
      {children}
    </TaskContext.Provider>
  )
}

export const useTaskContext = () => React.useContext(TaskContext)
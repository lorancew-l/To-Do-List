import React, { useState, useEffect } from 'react'
import Homepage from './components/Homepage'
import SignupForm from './components/Account/SignupForm'
import LoginForm from './components/Account/LoginForm'
import { Switch, Route, Redirect } from 'react-router-dom'
import { isRefreshTokenExpired } from './tools/account'
import { getTaskList, getTaskSectionList } from './tools/api'

import useFetch from './hooks/useFetch'

export default function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 992 ? true : false)
  const [isLoggedIn, setLoggedIn] = useState(!isRefreshTokenExpired())
  const [taskSectionId, setTaskSectionId] = useState(null)

  const taskList = useFetch(getTaskList, taskSectionId)
  const taskSectionList = useFetch(getTaskSectionList)
  const isLoaded = taskList.isLoaded && taskSectionList.isLoaded

  useEffect(() => {
    if(!taskSectionId && taskSectionList.value) {
      setTaskSectionId(taskSectionList.value[0].id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskSectionList.value])

  useEffect(() => {
    if (taskSectionId === null) return

    taskSectionList.update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskList.value])

  useEffect(() => {
    if (!isLoaded || taskSectionId === null) return

    taskList.update()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskSectionId])  

  if (!isLoaded) {
    return <div>Loading</div>
  }

  return (
    <Switch>
      <Route exact path="/">
        {isLoggedIn ? 
          <Homepage onSidebarChange={() => setSidebarOpen(!isSidebarOpen)} showSidebar={isSidebarOpen} 
                    taskSectionList={taskSectionList.value}  taskSectionId={taskSectionId}
                    setTaskSectionId={setTaskSectionId} taskList={taskList.value} updateTaskList={taskList.update}/>
        : <Redirect to="/login/"/>
        }
      </Route>
      <Route path="/login/" component={LoginForm}></Route>
      <Route path="/signup/" component={SignupForm} />
    </Switch>
  )
}
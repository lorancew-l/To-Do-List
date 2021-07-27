import React, { Fragment, useState, useEffect} from 'react'
import './css/style.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar/SideBar'
import Main from './components/Main/Main'
import SignupForm from './components/Account/SignupForm'
import LoginForm from './components/Account/LoginForm'
import { Switch, Route, Redirect } from 'react-router-dom'
import { isRefreshTokenExpired } from './tools/account'
import { getTaskList, getTaskSectionList } from './tools/api'

export default function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 992 ? true : false)
  const [isLoggedIn, setLoggedIn] = useState(!isRefreshTokenExpired())
  const [taskSectionId, setTaskSectionId] = useState(null)
  const [taskSectionList, setTaskSectionList] = useState([])
  const [taskList, setTaskList] = useState([])


  function updateTaskList() {
    if (taskSectionId === null) {
      return
    }

    updateTaskSectionList()

    getTaskList(taskSectionId).then(async response => {
      if (response.ok) {
        const data = await response.json()
        setTaskList(data)
      }
    })
  }

  function updateTaskSectionList() {
    getTaskSectionList().then(async response => {
      if (response.ok) {
        const data = await response.json()

        if (taskSectionId === null) {
          setTaskSectionId(data[0].id)
        } 
        setTaskSectionList(data)
      }
    })
  }

  useEffect(() => {
    updateTaskSectionList()
    updateTaskList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskSectionId])  

  return (
    <Switch>
      <Route exact path="/">
        {isLoggedIn ? 
          <Fragment>
            <Header onSidebarChange={() => setSidebarOpen(!isSidebarOpen)}></Header>
            <Sidebar showSidebar={isSidebarOpen} taskSectionList={taskSectionList} updateTaskSectionList={updateTaskSectionList}
                     taskSectionId={taskSectionId} setTaskSectionId={setTaskSectionId} ></Sidebar>
            <Main showSidebar={isSidebarOpen} taskList={taskList} updateTaskList={updateTaskList}/>
          </Fragment>
        : <Redirect to="/login/"/>
        }
      </Route>
      <Route path="/login/" component={LoginForm}></Route>
      <Route path="/signup/" component={SignupForm} />
    </Switch>
  )
}
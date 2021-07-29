import React, { Fragment, useState, useEffect } from 'react'
import Header from './Header'
import Sidebar from './Sidebar/Sidebar'
import Main from './Main/Main'
import useFetch from '../hooks/useFetch'
import { getTaskList, getTaskSectionList } from './../tools/api'


export default function Homepage() {
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 992 ? true : false)
  const [taskSectionId, setTaskSectionId] = useState(null)

  const taskList = useFetch(getTaskList, taskSectionId)
  const taskSectionList = useFetch(getTaskSectionList)
  const isLoaded = taskList.isLoaded && taskSectionList.isLoaded

  function updateTaskList() {
    taskList.update()
    taskSectionList.update()
  }

  useEffect(() => {
    if(!taskSectionId && taskSectionList.value) {
      setTaskSectionId(taskSectionList.value[0].id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskSectionList.value])

  useEffect(() => {
    if (!isLoaded || taskSectionId === null) return

    updateTaskList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskSectionId])  

  if (!isLoaded) {
    return <div>Loading</div>
  }

  return (
    <Fragment>
      <Header onSidebarChange={() => setSidebarOpen(!isSidebarOpen)}></Header>
      <Sidebar showSidebar={isSidebarOpen} taskSectionList={taskSectionList.value}
               taskSectionId={taskSectionId}  setTaskSectionId={setTaskSectionId} ></Sidebar>
      <Main showSidebar={isSidebarOpen} taskList={taskList.value} updateTaskList={updateTaskList}/>
    </Fragment>
  )
}

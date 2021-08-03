import React, { useState, useEffect } from 'react'
import Header from './Header'
import Sidebar from './Sidebar/Sidebar'
import Main from './Main/Main'
import LoadingScreen from './LoadingScreen'
import useFetch from '../hooks/useFetch'
import { getTaskList, getTaskSectionList } from './../tools/api'
import { AnimatePresence, motion } from 'framer-motion'


export default function Homepage(props) {
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 992 ? true : false)
  const [taskSectionId, setTaskSectionId] = useState(null)
  const [showHomePage, setShowHomePage] = useState(false)

  const taskList = useFetch(getTaskList, [taskSectionId], true)
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
    if (!taskSectionList.isLoaded || taskSectionId === null) return
    updateTaskList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskSectionId])  

  useEffect(() => {
    if (isLoaded){
      setTimeout(() => setShowHomePage(true), 1000)
    }
  }, [isLoaded])

  return (      
    <AnimatePresence>
      {(showHomePage) ?
        <motion.div key="app" initial={{opacity: 0}} animate={{opacity: 1}}> 
          <Header isLoggedIn={props.isLoggedIn} setLoggedIn={props.setLoggedIn} onSidebarChange={() => setSidebarOpen(!isSidebarOpen)}></Header>
          <Sidebar showSidebar={isSidebarOpen} taskSectionList={taskSectionList.value}
                  taskSectionId={taskSectionId}  setTaskSectionId={setTaskSectionId} ></Sidebar>
          <Main showSidebar={isSidebarOpen} taskList={taskList.value} updateTaskList={updateTaskList}/>
        </motion.div>
        : <LoadingScreen key={'loading'}/>
      }
    </AnimatePresence>
  )
}


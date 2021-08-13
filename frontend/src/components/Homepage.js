import React, { useState, useEffect } from 'react'
import Header from './Header'
import Sidebar from './Sidebar/Sidebar'
import Main from './Main/Main'
import LoadingScreen from './LoadingScreen'
import useFetch from '../hooks/useFetch'
import { getTaskList } from '../tools/api/rest/tasks'
import { getTaskFilterList } from '../tools/api/rest/taskFilters'
import { AnimatePresence, motion } from 'framer-motion'


export default function Homepage(props) {
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 992 ? true : false)
  const [taskFilterId, setTaskFilterId] = useState(null)
  const [showHomePage, setShowHomePage] = useState(false)

  const taskList = useFetch(getTaskList, [taskFilterId], true)
  const taskFilterList = useFetch(getTaskFilterList)
  const isLoaded = taskList.isLoaded && taskFilterList.isLoaded

  function updateTaskList() {
    taskList.update()
    taskFilterList.update()
  }

  useEffect(() => {
    if (!taskFilterId && taskFilterList.value) {
      setTaskFilterId(taskFilterList.value[0].id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskFilterList.value])

  useEffect(() => {
    if (!taskFilterList.isLoaded || taskFilterId === null) return
    updateTaskList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskFilterId])  

  useEffect(() => {
    if (isLoaded){
      setTimeout(() => setShowHomePage(true), 1000)
    }
  }, [isLoaded])

  return (      
    <AnimatePresence>
      {(showHomePage) ?
        <motion.div className="app" key="app" initial={{opacity: 0}} animate={{opacity: 1}}> 
          <Header isLoggedIn={props.isLoggedIn} setLoggedIn={props.setLoggedIn} onSidebarChange={() => setSidebarOpen(!isSidebarOpen)}></Header>
          <Sidebar showSidebar={isSidebarOpen} taskFilterList={taskFilterList.value} updateFilterList={taskFilterList.update}
                   selectedFilter={taskFilterId}  selectFilter={setTaskFilterId} ></Sidebar>
          <Main showSidebar={isSidebarOpen} taskList={taskList.value} updateTaskList={updateTaskList} taskFilterId={taskFilterId}/>
        </motion.div>
        : <LoadingScreen key="loading"/>
      }
    </AnimatePresence>  
  )
}


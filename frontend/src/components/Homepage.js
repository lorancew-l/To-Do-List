import React, { useState, useEffect } from 'react'
import Header from './Header'
import Sidebar from './Sidebar/Sidebar'
import Main from './Main/Main'
import LoadingScreen from './LoadingScreen'
import { AnimatePresence, motion } from 'framer-motion'
import { useTaskContext } from '../store/TaskStore/TaskContext'


export default function Homepage(props) {
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 992 ? true : false)
  const [showHomePage, setShowHomePage] = useState(false)
  const taskStore = useTaskContext()

  useEffect(() => {
    setTimeout(() => setShowHomePage(true), 1000)
  }, [taskStore.initialLoadingComplete])

  useEffect(() => {
    let isMounted = true 

    if (isMounted) {
      taskStore.load()
    }

    return () => isMounted = false
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (      
    <AnimatePresence>
      {(showHomePage) ?
        <motion.div className="app" key="app" initial={{opacity: 0}} animate={{opacity: 1}}> 
          <Header isLoggedIn={props.isLoggedIn} setLoggedIn={props.setLoggedIn} onSidebarChange={() => setSidebarOpen(!isSidebarOpen)}></Header>
          <Sidebar showSidebar={isSidebarOpen}></Sidebar>
          <Main showSidebar={isSidebarOpen}/>
        </motion.div>
        : <LoadingScreen key="loading"/>
      }
    </AnimatePresence>  
  )
}


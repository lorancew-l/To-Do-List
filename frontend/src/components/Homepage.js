import React, { Fragment } from 'react'
import Header from './Header'
import Sidebar from './Sidebar/Sidebar'
import Main from './Main/Main'

export default function Homepage(props) {
  return (
    <Fragment>
      <Header onSidebarChange={props.onSidebarChange}></Header>
      <Sidebar showSidebar={props.showSidebar} taskSectionList={props.taskSectionList}
               taskSectionId={props.taskSectionId} setTaskSectionId={props.setTaskSectionId} ></Sidebar>
      <Main showSidebar={props.showSidebar} taskList={props.taskList} updateTaskList={props.updateTaskList}/>
    </Fragment>
  )
}

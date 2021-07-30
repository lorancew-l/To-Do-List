import React from 'react'
import { dailyTasksActive, clipboard, importantTaskActive, addTask } from '../../images/index'
import SidebarItem from './SidebarItem'


export default function Sidebar(props) {
  const icons = {today: dailyTasksActive, important: importantTaskActive, all: clipboard, custom: clipboard}

  function addItemOnClickHandler() {}

  return (
    <aside className={props.showSidebar? 'sidebar on' : 'sidebar off'}>
      <ul>
        {
          props.taskSectionList.map(item => {
            return <SidebarItem className={item.id === props.taskSectionId ? 'sidebar-item selected' : 'sidebar-item'} taskCount={item.count}
                                icon={icons[item.type]} key={item.id} title={item.title} onClick={() => props.setTaskSectionId(item.id)}></SidebarItem>
          })
        }
        <SidebarItem title="Создать список" icon={addTask} className="sidebar-item" onClick={addItemOnClickHandler}></SidebarItem>
      </ul>
    </aside>
  )
}

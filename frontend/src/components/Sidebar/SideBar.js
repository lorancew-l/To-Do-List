import React, { useState } from 'react'
import { dailyTasksActive, clipboard, importantTaskActive } from '../../images/index'
import SidebarAddItemButton from './SidebarAddItemButton'
import SidebarItem from './SidebarItem'


export default function SideBar(props) {
  const [items, setItems] = useState([{id: 0, title: 'Сегодня', icon: dailyTasksActive, style: 'sidebar-item item_selected'},
                                      {id: 1, title: 'Важно', icon: importantTaskActive, style: 'sidebar-item'},
                                      {id: 2, title: 'Задачи', icon: clipboard, style: 'sidebar-item'}])

  function itemOnClickHandler(itemId) {
    setItems(items.map(element => {
      element.style = (element.id === itemId)? 'sidebar-item selected': 'sidebar-item'
      return element 
    }))
  }

  function addItemOnClickHandler() {}

  return (
    <aside className={props.showSidebar? 'sidebar on' : 'sidebar off'}>
    <div className='sidebar-content'>
      <ul>
        {
          items.map(item => {
            return <SidebarItem key={item.id} id={item.id} title={item.title} icon={item.icon} className={item.style}
                                onClick={itemOnClickHandler}></SidebarItem>
          })
        }
        <SidebarAddItemButton onClick={addItemOnClickHandler}></SidebarAddItemButton>
      </ul>
    </div>
  </aside>
  )
}

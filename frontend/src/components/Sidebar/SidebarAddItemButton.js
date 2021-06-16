import React from 'react'
import { addTask } from '../../images/index'

export default function SidebarAddItemButton(props) {
  return (
    <li className='sidebar-item' onClick={props.onClick}>
      <img alt='Создать список' src={addTask}/>
      <span className="sidebar-item-text">Создать список</span>
    </li>
  )
}
import React, { Component } from 'react'
import { addTask } from '../../images/index'


export class SidebarAddItemButton extends Component {
  render() {
    return (
      <li className='sidebar-item' onClick={this.props.onClick}>
        <img alt='Создать список' src={addTask}/>
        <span className="sidebar-item-text">Создать список</span>
      </li>
    )
  }
}

export default SidebarAddItemButton
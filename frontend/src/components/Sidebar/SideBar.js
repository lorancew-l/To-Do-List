import React, { Component } from 'react'
import { dailyTasksActive, clipboard, importantTaskActive } from '../../images/index'
import SidebarAddItemButton from './SidebarAddItemButton'
import { SidebarItem } from './SidebarItem'


export class SideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {items: [{id: 0, title: 'Сегодня', icon: dailyTasksActive, style: 'sidebar-item item_selected'},
                          {id: 1, title: 'Важно', icon: importantTaskActive, style: 'sidebar-item'},
                          {id: 2, title: 'Задачи', icon: clipboard, style: 'sidebar-item'}]}
  
    this.itemOnClickHandler = this.itemOnClickHandler.bind(this)
  }

  itemOnClickHandler(itemId) {
    this.setState(prevState => {
      return prevState.items.map(element => {
        element.style = (element.id === itemId)? 'sidebar-item selected': 'sidebar-item'
        return element 
      })
    })
  }

  addItemOnClickHandler() {

  }

  render() {
    return (
      <aside className={this.props.showSidebar? 'sidebar on' : 'sidebar off'}>
        <div className='sidebar-content'>
          <ul>
            {
              this.state.items.map(item => {
                return <SidebarItem key={item.id} id={item.id} title={item.title} icon={item.icon} className={item.style}
                                    onClick={this.itemOnClickHandler}></SidebarItem>
              })
            }
            <SidebarAddItemButton onClick={this.addItemOnClickHandler}></SidebarAddItemButton>
          </ul>
        </div>
      </aside>
    )
  }
}

export default SideBar

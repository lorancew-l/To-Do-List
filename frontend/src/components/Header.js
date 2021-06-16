import React from 'react'
import { openSideBar, search, quickTask, settings } from '../images/index'


export default function Header(props) {
  return (
    <header className="header">
    <div className="header-inner">
      <div className="header-left">
        <button className="" onClick={props.onSidebarChange}>
          <img className="" alt='open sidebar' src={openSideBar}/>
        </button>

        <div className="header-search">
          <img className="" alt='search' src={search}/>
          <input type="text" placeholder="Поиск"/>
        </div>
      </div>

      <div className="header-right">
        <button className="">
          <img className="" alt='add task' src={quickTask}/>
        </button>
        <button className="">
          <img className="" alt='settings' src={settings}/>
        </button>
      </div>
    </div>
  </header>
  )
}
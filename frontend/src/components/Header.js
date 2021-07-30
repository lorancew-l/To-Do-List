import React from 'react'
import { openSideBar, search, settings } from '../images/index'
import Logout from './Account/Logout'

export default function Header(props) {
  return (
    <header className="header">
    <div className="header-inner">
      <div className="header-left">
        <button onClick={props.onSidebarChange}>
          <img alt='open sidebar' src={openSideBar}/>
        </button>
        <div className="header-search">
          <img alt='search' src={search}/>
          <input type="text" placeholder="Поиск"/>
        </div>
      </div>
      <div className="header-right">
        <Logout isLoggedIn={props.isLoggedIn} setLoggedIn={props.setLoggedIn} />
        <button>
          <img alt='settings' src={settings}/>
        </button>
      </div>
    </div>
  </header>
  )
}
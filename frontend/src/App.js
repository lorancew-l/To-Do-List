import React, { Fragment, useState } from 'react'
import './css/style.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar/SideBar'
import Main from './components/Main/Main'
import SignupForm from './components/Account/SignupForm'
import LoginForm from './components/Account/LoginForm'
import { Switch, Route, Redirect } from 'react-router-dom'
import { isRefreshTokenExpired } from './tools/account'


export default function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 992 ? true : false)
  const [isLoggedIn, setLoggedIn] = useState(!isRefreshTokenExpired())

  return (
    <Switch>
      <Route exact path="/">
        {isLoggedIn ? 
          <Fragment>
            <Header onSidebarChange={() => setSidebarOpen(!isSidebarOpen)}></Header>
            <Sidebar showSidebar={isSidebarOpen}></Sidebar>
            <Main showSidebar={isSidebarOpen}/>
          </Fragment>
        : <Redirect to="/login/"/>
        }
      </Route>
      <Route path="/login/" component={LoginForm}></Route>
      <Route path="/signup/" component={SignupForm} />
    </Switch>
  )
}
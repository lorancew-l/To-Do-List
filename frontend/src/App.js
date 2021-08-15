import React, { useState } from 'react'
import Homepage from './components/Homepage'
import SignupForm from './components/Account/SignupForm'
import LoginForm from './components/Account/LoginForm'
import { Switch, Route, Redirect } from 'react-router-dom'
import { isRefreshTokenExpired } from './tools/api/tokenProvider'
import { TaskProvider } from './store/TaskStore/TaskContext'


export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(!isRefreshTokenExpired())
  
  return (
    <Switch>
      <Route exact path="/">
        {isLoggedIn ? 
          <TaskProvider>
            <Homepage isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>
          </TaskProvider>
          :<Redirect to="/login/"/>
        }
      </Route>
      <Route path="/login/"><LoginForm setLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn}/></Route>
      <Route path="/signup/" component={SignupForm} />
    </Switch>
  )
}
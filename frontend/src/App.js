import React, { useState } from 'react'
import Homepage from './components/Homepage'
import SignupForm from './components/Account/SignupForm'
import LoginForm from './components/Account/LoginForm'
import { Switch, Route, Redirect } from 'react-router-dom'
import { isRefreshTokenExpired } from './tools/account'


export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(!isRefreshTokenExpired())
  

  return (
    <Switch>
      <Route exact path="/">
        {isLoggedIn ? 
          <Homepage />
          :<Redirect to="/login/"/>
        }
      </Route>
      <Route path="/login/"><LoginForm setLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn}/></Route>
      <Route path="/signup/" component={SignupForm} />
    </Switch>
  )
}
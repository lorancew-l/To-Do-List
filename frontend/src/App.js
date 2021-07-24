import React, { Component, Fragment } from 'react'
import './css/style.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar/SideBar'
import Main from './components/Main/Main'
import SignupForm from './components/Account/SignupForm'
import LoginForm from './components/Account/LoginForm'
import { Switch, Route, Redirect } from 'react-router-dom'
import { isRefreshTokenExpired } from './tools/account'


export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {showSidebar: window.innerWidth >= 992 ? true : false,
                  isLoggedIn: !isRefreshTokenExpired()}
  }

  showModal = (modalContent) => {
    this.setState({modalContent: modalContent})
  }

  closeModal = () => this.setState({modalContent: null})

  showPopper = (popperContent) => {
    this.setState({popperContent: popperContent})
  }

  updatePopperPos = (pos) => {
    this.setState({popperPos: pos})
  }

  closePopper = () => this.setState({popperContent: null})
  
  handleSidebarChange = () => {
    this.setState(prevState => {
      return {showSidebar: prevState.showSidebar? false: true}
    })
  }

  render() {
    return (
      <Switch>
        <Route exact path="/">
          {this.state.isLoggedIn ? 
  
              <Fragment>
                <Header onSidebarChange={this.handleSidebarChange}></Header>
                <Sidebar showSidebar={this.state.showSidebar}></Sidebar>
                <Main showSidebar={this.state.showSidebar}/>
              </Fragment>

          : <Redirect to="/login/"/>
          }
        </Route>
        <Route path="/login/" component={LoginForm}></Route>
        <Route path="/signup/" component={SignupForm} />
      </Switch>

    );
  };
};

export default App;

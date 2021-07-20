import React, { Component, Fragment } from 'react';
import './css/style.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar/SideBar'
import Main from './components/Main/Main'


export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {showSidebar: window.innerWidth >= 992 ? true : false}
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
      <Fragment>
        <Header onSidebarChange={this.handleSidebarChange}></Header>
        <Sidebar showSidebar={this.state.showSidebar}></Sidebar>
        <Main showSidebar={this.state.showSidebar}/>
      </Fragment>
    );
  };
};

export default App;

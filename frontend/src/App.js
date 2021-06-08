import React, { Component, Fragment } from 'react';
import './css/style.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar/SideBar'
import Main from './components/Main/Main'

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {showModal: false,
                  showSidebar: true}
  }

  showModal = () => this.setState({showModal: true})
  closeModal = () => this.setState({showModal: false})
  
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
        <Main onTaskClick={this.showModal} showSidebar={this.state.showSidebar}></Main>
      </Fragment>
    );
  };
};

export default App;

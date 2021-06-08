import React, { Component, Fragment } from 'react';
import './css/style.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar/SideBar'
import Main from './components/Main/Main'

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {showModal: false}
  }

  showModal = () => this.setState({showModal: true})
  closeModal = () => this.setState({showModal: false})

  render() {
    return (
      <Fragment>
        <Header></Header>
        <Sidebar></Sidebar>
        <Main onTaskClick = {this.showModal}></Main>
      </Fragment>
    );
  };
};

export default App;

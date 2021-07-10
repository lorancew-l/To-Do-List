import React, { Component, Fragment } from 'react';
import './css/style.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar/SideBar'
import Main from './components/Main/Main'
import ModalOverlay from './components/Modal/ModalOverlay';
import PopperOverlay from './components/Modal/PopperOverlay'


export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {showSidebar: true,
                  modalContent: null,
                  popperContent: null,
                  popperPos: {x: 0, y: 0}}
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
        <Main onTaskClick={this.showModal} showSidebar={this.state.showSidebar} showModal={this.showModal} showPopper={this.showPopper}
              popperPos={this.state.popperPos} updatePopperPos={this.updatePopperPos}/>
        { this.state.modalContent ? 
          <ModalOverlay closeModal={this.closeModal} popperPos={this.state.popperPos}>
            {this.state.modalContent}
          </ModalOverlay>
          : null
        }
        { this.state.popperContent ? 
          <PopperOverlay popperPos={this.state.popperPos} closePopper={this.closePopper}>
            {this.state.popperContent}
          </PopperOverlay>
          : null
        }
      </Fragment>
    );
  };
};

export default App;

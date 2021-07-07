import React, { Component, Fragment } from 'react';
import './css/style.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar/SideBar'
import Main from './components/Main/Main'
import ModalOverlay from './components/Popups/ModalOverlay';

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {showSidebar: true,
                  modalShadow: false,
                  modalContent: null,
                  modalPos: {bottom: null, top: null, left: null, right: null}}
  }

  showModal = (modalContent, shadow) => {
    this.setState({modalContent: modalContent, modalShadow: shadow})
  }

  updateModalPos = (pos) => {
    this.setState({modalPos: pos})
  }

  closeModal = () => this.setState({modalContent: null,  modalPos: {bottom: null, top: null, left: null, right: null},
                                    modalShadow: false })
  
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
        <Main onTaskClick={this.showModal} showSidebar={this.state.showSidebar} showModal={this.showModal}
              updateModalPos={this.updateModalPos}/>
        { this.state.modalContent ? 
          <ModalOverlay modalPos={this.state.modalPos} closeModal={this.closeModal} shadow={this.state.modalShadow}>
            {this.state.modalContent}
          </ModalOverlay>
          : null
        }
      </Fragment>
    );
  };
};

export default App;

import React, { Component, Fragment } from 'react';
import './css/style.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar/SideBar'
import Main from './components/Main/Main'
import Overlay from './components/Popups/Overlay'

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {showModal: false,
                  showSidebar: true,
                  popupContent: null,
                  popupPos: {bottom: null, top: null, left: null, right: null}}
  }

  showModal = () => this.setState({showModal: true})

  closeModal = () => this.setState({showModal: false})

  showPopup = (popupContent) => {
    this.setState({popupContent: popupContent})
  }

  updatePopupPos = (pos) => {
    this.setState({popupPos: pos})
  }

  closePopup = () => this.setState({popupContent: null})
  
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
        <Main onTaskClick={this.showModal} showSidebar={this.state.showSidebar} showPopup={this.showPopup}
              updatePopupPos={this.updatePopupPos}/>
        { this.state.popupContent ? 
          <Overlay popupPos={this.state.popupPos} closePopup={this.closePopup}>
            {this.state.popupContent}
          </Overlay>
          : null
        }
      </Fragment>
    );
  };
};

export default App;

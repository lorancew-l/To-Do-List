import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const modalRoot = document.getElementById('modal-root')

export class Overlay extends Component {
  render() {
    return ReactDOM.createPortal(
      <div className="popup-overlay" onClick={this.props.closePopup}>
        {React.cloneElement(this.props.children, { pos: this.props.popupPos })}
      </div>,
    modalRoot)
  }
}

export default Overlay

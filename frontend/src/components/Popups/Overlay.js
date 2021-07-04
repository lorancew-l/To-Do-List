import React from 'react'
import ReactDOM from 'react-dom'


const modalRoot = document.getElementById('modal-root')

export default function Overlay(props) {
  return ReactDOM.createPortal(
    <div className="popup-overlay" onClick={props.closePopup}>
      {React.cloneElement(props.children, { pos: props.popupPos, closePopup: props.closePopup })}
    </div>,
  modalRoot)
}
import React from 'react'
import ReactDOM from 'react-dom'


const modalRoot = document.getElementById('modal-root')

export default function ModalOverlay(props) {
  return ReactDOM.createPortal(
    <div className="modal-overlay shadow" onClick={props.closeModal}>
      {props.children}
    </div>,
  modalRoot)
}
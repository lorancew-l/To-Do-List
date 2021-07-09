import React from 'react'
import ReactDOM from 'react-dom'


const modalRoot = document.getElementById('modal-root')

export default function ModalOverlay(props) {
  return ReactDOM.createPortal(
    <div className="modal-overlay shadow" onClick={props.closeModal}>
      {React.cloneElement(props.children, { pos: props.modalPos, closeModal: props.closeModal })}
    </div>,
  modalRoot)
}
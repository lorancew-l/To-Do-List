import React from 'react'
import ReactDOM from 'react-dom'


const modalRoot = document.getElementById('modal-root')

export default function ModalOverlay(props) {
  const className = props.shadow ? "modal-overlay shadow" : "modal-overlay"
  return ReactDOM.createPortal(
    <div className={className} onClick={props.closeModal}>
      {React.cloneElement(props.children, { pos: props.modalPos, closeModal: props.closeModal })}
    </div>,
  modalRoot)
}
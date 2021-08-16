import React from 'react'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
import { modalAnimation } from '../../animations/animations' 

const modalRoot = document.getElementById('modal-root')

export default function ModalOverlay(props) {
  return ReactDOM.createPortal(
    <motion.div className="modal-overlay shadow" onMouseDown={props.closeModal} {...modalAnimation}>
      <div onMouseDown={(event) => event.stopPropagation()}>
        {props.children}
      </div>
    </motion.div>,
  modalRoot)
}
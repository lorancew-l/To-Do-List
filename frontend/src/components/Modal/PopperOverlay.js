import React from 'react'
import ReactDOM from 'react-dom'


const popperRoot = document.getElementById('popper-root')

export default function PopperOverlay(props) {
  return ReactDOM.createPortal(
    <div className="popper-overlay" onMouseDown={props.closePopper}>
      <div onMouseDown={(event) => event.stopPropagation()}>
        {props.children}
      </div>
    </div>,
  popperRoot)
}

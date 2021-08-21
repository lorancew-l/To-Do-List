import React from 'react'

export default function PopupMenuItem(props) {
  return (
    <li className={props.separator ?  "menu-item separator" : "menu-item"} onClick={props.onClick}>
      <div className="icon">{props.icon}</div>
      <div className="content">{props.title}</div>
    </li>
  )
}

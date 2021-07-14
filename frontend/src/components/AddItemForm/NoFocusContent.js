import React from 'react'

export default function NoFocusContent(props) {
  return (
    <li className={props.className} onClick={props.onClick}>
      <div className="left-side">
        <button> 
          <img alt={props.iconAlt} src={props.icon}/>
        </button>
        <div>
          {props.text}
        </div>
      </div>
    </li>
  )
}

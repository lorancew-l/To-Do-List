import React from 'react'

export default function DefaultFilter(props) {
  return (
    <li className={props.selected ? 'sidebar-item selected' : 'sidebar-item'} onClick={props.selectFilter}>
      <div className="left-side">
        <div className="icon"> 
          <img alt="" src={props.icon}/>
        </div>
        <div>{props.title}</div>
      </div>
      {props.taskCount ?
        <div className="right-side">
          <small>{props.taskCount}</small>
        </div>
        : null
      }
    </li>
  )
}


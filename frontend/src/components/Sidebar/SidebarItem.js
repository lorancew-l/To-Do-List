import React from 'react'

export default function SidebarItem(props) {
  const onClickHandler = () => {
    props.onClick(Number(props.id))
  }

  return (
    <li className={props.className} onClick={onClickHandler}>
      <div className="left-side">
        <img alt="" src={props.icon}/>
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


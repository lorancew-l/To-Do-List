import React from 'react'

export default function SidebarItem(props) {
  const onClickHandler = () => {
    props.onClick(Number(props.id))
  }

  return (
    <li className={props.className} onClick={onClickHandler}>
      <span><img alt={props.title} src={props.icon}/></span>
      <span className="sidebar-item-text">{props.title}</span>
  </li>
  )
}
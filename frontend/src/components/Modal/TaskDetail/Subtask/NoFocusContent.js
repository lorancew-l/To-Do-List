import React, { useState } from 'react'
import { checkboxUnchecked, checkboxChecked, checkboxHover, closeIconInactive, closeIconActive } from '../../../../images/index'


export default function Subtask(props) {
  const [checkboxIcon, setCheckboxIcon] = useState(checkboxUnchecked)
  const [closeIcon, setCloseIcon] = useState(closeIconInactive)
  const [isHover, setIsHover] = useState(false)

  return (
    <li className={props.completed ? "subtask completed" : "subtask"} onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <div className="left-side">
        <button className="noselect" type="button" onClick={props.onComplete} 
                onMouseEnter={() => {if (!props.completed) setCheckboxIcon(checkboxHover)}}
                onMouseLeave={() => {if (!props.completed) setCheckboxIcon(checkboxUnchecked)}}>
          {props.completed ? <img alt="checkbox" src={checkboxChecked}/> : <img alt="checkbox" src={checkboxIcon} />}
        </button>
        <div className="title" onClick={props.onClick}>{props.title}</div>
      </div>
      {isHover ?
        <button type="button" onClick={props.onDelete}
                onMouseEnter={() => setCloseIcon(closeIconActive)} onMouseLeave={() => setCloseIcon(closeIconInactive)}>
          <img alt='close' src={closeIcon}/>
        </button> 
        : null
      }
    </li>
  )
}
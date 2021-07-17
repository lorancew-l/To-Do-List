import React, { useState } from 'react'
import { checkboxHover, checkboxUnchecked, checkboxChecked, importantTaskInactive, importantTaskActive } from '../../../../images/index'

export default function OnFocusContent(props) {
  const [checkboxIcon, setCheckboxIcon] = useState(checkboxUnchecked) 
  const [toImportantIcon, setToImportantIcon] = useState(importantTaskInactive)

  return (
    <li className={props.completed ? "task completed no-hover" : "task no-hover"}>
      <div className="left-side">
        <button className="noselect" type="button" onClick={props.onComplete} 
                onMouseEnter={() => {if (!props.completed) setCheckboxIcon(checkboxHover)}}
                onMouseLeave={() => {if (!props.completed) setCheckboxIcon(checkboxUnchecked)}}>
          {props.completed ? <img alt="checkbox" src={checkboxChecked}/> : <img alt="checkbox" src={checkboxIcon} />}
        </button>
        <div className="title" onClick={props.onClick}>{props.title}</div>
      </div>
      <button className="noselect nodrag"  onMouseEnter={() => setToImportantIcon(importantTaskActive)}
              onMouseLeave={() => setToImportantIcon(importantTaskInactive)}>
        <img alt="to favorite" src={toImportantIcon}/>
      </button>
    </li>
  )
}

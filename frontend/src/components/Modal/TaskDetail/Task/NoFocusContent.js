import React, { useState, useEffect } from 'react'
import { checkboxHover, checkboxUnchecked, checkboxChecked, importantTaskInactive, importantTaskActive } from '../../../../images/index'

export default function OnFocusContent(props) {
  const [checkboxIcon, setCheckboxIcon] = useState(checkboxUnchecked) 
  const [importantIcon, setImportantIcon] = useState(null)

  useEffect(() => {
    setImportantIcon(props.isImportant ? importantTaskActive : importantTaskInactive)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isImportant])

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
      <button className="noselect nodrag" onClick={props.onImportantClick}
              onMouseEnter={() => {if (!props.isImportant) setImportantIcon(importantTaskActive)}}
              onMouseLeave={() => {if (!props.isImportant) setImportantIcon(importantTaskInactive)}}>
        <img alt="to favorite" src={importantIcon}/>
      </button>
    </li>
  )
}

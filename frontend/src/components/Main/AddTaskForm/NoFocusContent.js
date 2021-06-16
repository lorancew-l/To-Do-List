import React from 'react'
import { quickTask } from '../../../images/index'


export default function NoFocusContent(props) {
  return (
    <li className='task-list-add-item' onClick={props.onClick}>
      <div className="left-side">
        <button> 
          <img alt="add task" src={quickTask}/>
        </button>
        <span>
          Добавить задачу
        </span>
      </div>
    </li>
  )
}
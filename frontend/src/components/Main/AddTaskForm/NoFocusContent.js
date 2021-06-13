import React, { Component } from 'react'
import { quickTask } from '../../../images/index'

export class noFocusContent extends Component {
  render() {
    return (
      <li className='task-list-add-item' onClick={this.props.onClick}>
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
}

export default noFocusContent

import React, { Component } from 'react'
import { calendar } from '../../../images/index'

export class onFocusContent extends Component {
  render() {
    return (
      <li className='task-list-add-item no-hover'>
        <div className="left-side">
          <input type="text" autoFocus></input>
        </div>
        <div className="right-side">
          <button className="button-with-icon">
            <img src={calendar} alt="date"></img>
          </button>
          <button className="sumbit" type="submit">
            Добавить
          </button>
          <button className="cancel" onClick={this.props.onCancelClick}>
            Отменить
          </button>
        </div>
      </li>
    )
  }
}

export default onFocusContent

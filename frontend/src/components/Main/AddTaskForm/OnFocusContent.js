import React, { Component } from 'react'
import { calendar } from '../../../images/index'
import Calendar from '../../Popups/Calendar'

export class onFocusContent extends Component {
  constructor(props) {
    super(props)
    this.calendarButton = React.createRef()
  }

  handleCalendarClick = () => {
    const rect = this.calendarButton.current.getBoundingClientRect()

    this.props.updatePopupPos({left: rect.left, bottom: rect.bottom})
    this.props.showPopup(<Calendar></Calendar>)
  }

  onWindowResize = () => {
    if (this.calendarButton.current) {
      const rect = this.calendarButton.current.getBoundingClientRect()
      this.props.updatePopupPos({left: rect.left, bottom: rect.bottom})
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize)
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  func = () => this.setState({test: 'fsfsfasfast'})

  render() {
    return (
      <li className='task-list-add-item no-hover'>
        <div className="left-side">
          <input type="text" autoFocus></input>
        </div>
        <div className="right-side">
          <button className="button-with-icon" type="button" onClick={this.handleCalendarClick} ref={this.calendarButton}>
            <img src={calendar} alt="date"></img>
          </button>
          <button className="submit" type="submit">
            Добавить
          </button>
          <button className="cancel" type="button" onClick={this.props.onCancelClick}>
            Отменить
          </button>
        </div>
      </li>
    )
  }
}

export default onFocusContent

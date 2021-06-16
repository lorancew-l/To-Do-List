import React, { Component } from 'react'

export class Calendar extends Component {
  render() {
    return (
      <div className="calendar-popup" style={{transform: `translate(${this.props.pos.left}px, ${this.props.pos.bottom}px)`}} onClick={(event) => event.stopPropagation()}>
        Календарь
      </div>
    )
  }
}

export default Calendar


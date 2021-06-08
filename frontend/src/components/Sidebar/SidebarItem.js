import React, { Component } from 'react'


export class SidebarItem extends Component {
  constructor(props) {
    super(props)

    this.onClickHandler = this.onClickHandler.bind(this)
  }

  onClickHandler() {
    this.props.onClick(Number(this.props.id))
  }

  render() {
    return (
      <li className={this.props.className} onClick={this.onClickHandler}>
        <span><img alt={this.props.title} src={this.props.icon}/></span>
        <span className="sidebar-item-text">{this.props.title}</span>
      </li>
    )
  }
}

export default SidebarItem
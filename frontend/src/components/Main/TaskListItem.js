import React, { Component } from 'react'
import { checkboxUnchecked , checkboxChecked, importantTaskInactive, importantTaskActive } from '../../images/index'

export class TaskListItem extends Component {
  constructor(props){
    super(props)
    this.state = {
      checkboxImg: checkboxUnchecked,
      importantImg: importantTaskInactive,
      style: '', 
    }

    this.checkboxOnMouseEnterHandler = this.checkboxOnMouseEnterHandler.bind(this)
    this.checkboxOnMouseLeaveHandler = this.checkboxOnMouseLeaveHandler.bind(this)
    this.importantOnMouseEnterHandler = this.importantOnMouseEnterHandler.bind(this)
    this.importantOnMouseLeaveHandler = this.importantOnMouseLeaveHandler.bind(this)

    this.onClickHandler = this.onClickHandler.bind(this)
  }

  checkboxOnMouseEnterHandler(){
    this.setState({checkboxImg: checkboxChecked})
  }

  checkboxOnMouseLeaveHandler(){
    this.setState({checkboxImg: checkboxUnchecked})
  }

  
  importantOnMouseEnterHandler(){
    this.setState({importantImg: importantTaskActive})
  }

  importantOnMouseLeaveHandler(){
    this.setState({importantImg: importantTaskInactive})
  }

  onClickHandler(){
    console.log('click');
    this.setState({style: 'clicked'})
    setTimeout(() => this.setState({style: ''}), 400)
    this.props.onClick()
  }

  render() {
    return (
      <li className={this.state.style} onClick={this.onClickHandler}>
        <div className="left-side">
          <button onClick={event => event.stopPropagation()}> 
            <img alt="checkbox" src={this.state.checkboxImg}
              onMouseEnter={this.checkboxOnMouseEnterHandler}
              onMouseLeave={this.checkboxOnMouseLeaveHandler}/>
          </button>
          <span>
            {this.props.title}
          </span>
        </div>
        <img onClick={event => event.stopPropagation()} alt='to favorite' src={this.state.importantImg}
          onMouseEnter={this.importantOnMouseEnterHandler}
          onMouseLeave={this.importantOnMouseLeaveHandler}/>
      </li>
    )
  }
}

export default TaskListItem

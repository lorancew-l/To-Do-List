import React, { Component } from 'react'
import TaskListItem from './TaskListItem'
import AddTask from './AddTaskForm/AddTaskForm'

export class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {taskList: []}
  }

  componentDidMount(){
    fetch('http://localhost:8000/api/task-list/')
    .then(response => response.json())
    .then(taskList => this.setState({taskList: taskList}))
  }

  render() {
    return (
      <main className={this.props.showSidebar? 'sidebar-on': 'sidebar-off'}>
        <div className="container">
          <div className="content">
            <div className="task-list-header">
              <span>Сегодня</span>
              <small>Пн 1 марта</small>
            </div>
            <ul className="task-list">
                {this.state.taskList.map(element => {
                  return <TaskListItem key={element.id} title={element.title} onClick={this.props.onTaskClick}></TaskListItem>})
                }
                <AddTask showPopup={this.props.showPopup} updatePopupPos={this.props.updatePopupPos}></AddTask>
            </ul>
          </div>
        </div>
      </main>
    )
  }
}

export default Main

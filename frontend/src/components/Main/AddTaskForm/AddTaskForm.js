import React, { Component } from 'react'
import NoFocusContent from './NoFocusContent'
import OnFocusContent from './OnFocusContent'

export class AddTask extends Component {
  constructor(props) {
    super(props)
    this.state = {onFocus: false}
  }

  addTaskClickHandler = () => this.setState({onFocus: true})
  cancelClickHandler = () => {
    this.setState({onFocus: false})
  }
  submitClickHandler = () => {}
  
  render() {
    return (
      <form>
        {this.state.onFocus? <OnFocusContent onCancelClick={this.cancelClickHandler} showPopup={this.props.showPopup}
                                             updatePopupPos={this.props.updatePopupPos}></OnFocusContent> :
                             <NoFocusContent onClick={this.addTaskClickHandler}></NoFocusContent>}
      </form>
    )
  }
}

export default AddTask

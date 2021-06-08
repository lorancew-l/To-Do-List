import React, { Component, Fragment } from 'react';
import './css/style.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar/SideBar'

export class App extends Component {
  render() {
    return (
      <Fragment>
        <Header></Header>
        <Sidebar></Sidebar>
      </Fragment>
    );
  };
};

export default App;

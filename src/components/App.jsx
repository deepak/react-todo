import React, { Component } from 'react';
import Footer from './Footer.jsx';
import AddTodo from '../containers/AddTodo.jsx';
import VisibleTodoList from '../containers/VisibleTodoList.jsx';
const { ipcRenderer } = require('electron');

const fileContent = require('fs')
  .readFileSync("/tmp/foo.txt", {
    encoding: "UTF8"
  })
  .toString();
console.log("fileContent is: ", fileContent);

class Ping extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };
  }

  onClick() {
    ipcRenderer.send('ping');

    ipcRenderer.on('ping-reply', (event, arg) => {
      console.log("replied with: ", arg); // prints "pong"
      this.setState({
        active: !this.state.active
      });
    });
  }

  render() {
    const { active, found } = this.state;

    return (
      <div style={active ? {backgroundColor: 'red'} : {}}>
        <button
          onClick={(e) => this.onClick(e) }
        >
          {fileContent}
        </button>
      </div>
    );
  }
}

const App = () => (
  <div>
    <Ping />
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default App;

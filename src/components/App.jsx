import React, { Component } from 'react';
import Footer from './Footer.jsx';
import AddTodo from '../containers/AddTodo.jsx';
import VisibleTodoList from '../containers/VisibleTodoList.jsx';

class Ping extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };
  }

  onClick() {
    const { active } = this.state;

    fetch("http://localhost:8080/")
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          return Promise.reject("API is down");
        }
      })
      .then(json => {
        this.setState({
          active: !active
        });
        console.log(`data is: `, json);
      })
      .catch(err => {
        console.error("API returned an error: ", err);
      });
  }

  render() {
    const { active, found } = this.state;

    return (
      <div style={active ? {backgroundColor: 'red'} : {}}>
        <button
          onClick={(e) => this.onClick(e) }
        >
          PING
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

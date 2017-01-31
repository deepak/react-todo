import React, { Component } from 'react';
import { Link } from 'react-router';
import isElectron from 'is-electron';
import App from '../components/App.jsx';

class Switcher extends Component {
  constructor(props) {
    super(props);
    this.renderReact = this.renderReact.bind(this);
    this.renderElectron = this.renderElectron.bind(this);
  }

  renderElectron() {
    return (
      <div>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/scrape">Scrape</Link></li>
          <li><Link to="/todo">Todo</Link></li>
        </ul>
      </div>
    );
  }

  renderReact() {
    return (
      <App />
    );
  }

  render() {
    return (
      isElectron() ? this.renderElectron() : this.renderReact()
    );
  }
}

export default Switcher;

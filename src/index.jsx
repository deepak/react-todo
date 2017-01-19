import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

import todoApp from './reducers';
import Switcher from './components/Switcher.jsx';
import App from './components/App.jsx';
import About from './components/About.jsx';
import { dispatchTodos, addTodo } from './actions';
import './css/main.scss';

const initialState = {};
const enhancers = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);
const store = createStore(
  todoApp,
  initialState,
  enhancers
);

// called only once,
// before application initially starts to render react-route and any of its related DOM elements
function onAppInit(dispatch) {
  return (nextState, replace, callback) => {
    dispatch(dispatchTodos())
      .then((todos) => {
        todos.data.map(t => dispatch(addTodo(t.title)));
        // callback is like a "next" function, app initialization is stopped until it is called.
        callback();
      });
  };
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Switcher}/>
      <Route path="/about" component={About}/>
      <Route path="/todo" component={App} onEnter={onAppInit(store.dispatch)}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);

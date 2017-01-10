let nextTodoId = 0;

// actions
export const FETCH_TODOS = 'FETCH_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const TOGGLE_TODO = 'TOGGLE_TODO';

// action creators
export function dispatchTodos() {
  return (dispatch) => {
    dispatch({
      type: FETCH_TODOS,
      inFlight: true,
      inError: false
    });

    return fetchTodos()
      .then(json => dispatch({
        type: FETCH_TODOS,
        inFlight: false,
        inError: false,
        data: json
      }))
      .catch(err => dispatch({
        type: FETCH_TODOS,
        inFlight: false,
        inError: true,
        data: {},
        error: err.message
      }));
  };
}

export function addTodo(text) {
  return {
    type: ADD_TODO,
    id: nextTodoId++,
    text
  };
}

export function setVisibilityFilter(filter) {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  };
}

export function toggleTodo(id) {
  return {
    type: TOGGLE_TODO,
    id
  };
}

// utils
function fetchTodos() {
  const headers = {
    'Accept': 'application/json'
  };
  const options = {
    method: "GET",
    credentials: 'include',
    headers
  };

  return fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10`, options)
    .then(response => response.json())
    .then(json => Promise.resolve(json))
    .catch(err => {
      console.error(`error in fetching data: ${err}`);
      return Promise.reject(new Error("API is down"));
    });
}

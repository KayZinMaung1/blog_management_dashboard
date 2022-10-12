import React from 'react';

import './index.css';
import App from './App';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from "./store";
import { setAccessToken } from './services/api';
import { SET_CURRENT_USER } from './store/type';
import { getUser } from './store/actions';

const token = localStorage.getItem("jwtToken");

if(token){
  setAccessToken(token);
  store.dispatch(getUser());
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decodeURI(token),
  })
}
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);


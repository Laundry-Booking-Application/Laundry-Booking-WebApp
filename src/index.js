import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserModel from './js/UserModel';
import 'bootstrap/dist/css/bootstrap.min.css';

const userModel = new UserModel();

ReactDOM.render(
  <App userModel={userModel}/>,
  document.getElementById('App')
);
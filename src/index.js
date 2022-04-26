import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import UserModel from './js/UserModel';
import 'bootstrap/dist/css/bootstrap.min.css';

const userModel = new UserModel();
const container = document.getElementById('App');
const root = createRoot(container);

root.render(<App userModel={userModel}/>);
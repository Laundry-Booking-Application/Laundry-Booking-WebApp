import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import UserModel from './js/UserModel';
import BookingModel from './js/BookingModel';
import 'bootstrap/dist/css/bootstrap.min.css';

const userModel = new UserModel();
const bookingModel = new BookingModel();
const container = document.getElementById('App');
const root = createRoot(container);

root.render(<App userModel={userModel} bookingModel={bookingModel}/>);
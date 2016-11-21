import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as firebase from 'firebase';


var config = {
    apiKey: "AIzaSyDOWOXm9lneDU12veTZVcxGet7pQi-ToJo",
    authDomain: "group10-da335.firebaseapp.com",
    databaseURL: "https://group10-da335.firebaseio.com",
    storageBucket: "group10-da335.appspot.com",
    messagingSenderId: "816933915404"
};
firebase.initializeApp(config);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

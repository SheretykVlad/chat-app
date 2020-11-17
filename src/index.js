import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase';
import { store } from './redux/store/store';
import { Provider } from 'react-redux';

const firebaseConfig = {
  apiKey: "AIzaSyD8HEeJu7awnEuG2MlMjw9fgiVLzASSjRY", 
  authDomain: "chat-app-e7e1a.firebaseapp.com",
  databaseURL: "https://chat-app-e7e1a.firebaseio.com",
  projectId: "chat-app-e7e1a",
  storageBucket: "chat-app-e7e1a.appspot.com",
  messagingSenderId: "237778762064",
  appId: "1:237778762064:web:8c4ff85f8f655ffbedd455",
  measurementId: "G-ZF8B3LFTEB"
};

firebase.initializeApp(firebaseConfig);

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
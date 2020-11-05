import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Chat from './components/Chat/Chat';
import RegisterComponent from './components/RegisterComponent/RegisterComponent';
import SignIn from './components/SignIn/SignIn';
import PrivateRoute from './components/PrivateRoute/index';

export default function App() {
  return(
    <div className='App'>
      <BrowserRouter>
        <Route path='/' exact component={SignIn}/>
        <Route path='/register' component={RegisterComponent}/>
        <PrivateRoute path='/chat' component={Chat}/>
      </BrowserRouter>
    </div>
  )
}
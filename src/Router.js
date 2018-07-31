import React from 'react'
import firebase from 'firebase';

import {
  HashRouter,
  Route
} from 'react-router-dom'

import Login from './login/Login';
import Home from './home/Home';

firebase.initializeApp({
  apiKey: "AIzaSyC_Hb4yDjy5A40er2fbuK8kH65myHb0fDw",
  authDomain: "restaurantecactus-a4597.firebaseapp.com",
  databaseURL: "https://restaurantecactus-a4597.firebaseio.com",
  storageBucket: "restaurantecactus-a4597.appspot.com",  
});

const Router = (props) => (
  <HashRouter>
    <div>
      <Route exact path="/" component={Login}/>
      <Route exact path="/home" component={Home}/>
    </div>
  </HashRouter>
);

export default Router

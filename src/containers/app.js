import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home';
import Login from './Login';
import ProtectedRoute from '../components/ProtectRoute';
import AudioControl from './AudioControl';

export default class App extends Component {
  render() {
    return (
      <div className="w-zingmp3 masthead-none">
        <Router>
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Home}></Route>
        </Router>
        <AudioControl/>
      </div>
    );
  }
}
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home';
import Login from './Login';
import ProtectedRoute from '../components/ProtectRoute';
import AudioControl from './AudioControl';
import Header from '../components/Header';
import Container from 'react-bootstrap/Container';
import ArtistPage from './ArtistPage';
import AlbumPage from './AlbumPage';
import CategoryPage from './CategoryPage';
import SearchPage from './SearchPage';
export default class App extends Component {
  render() {
    return (
      <div>
        <Container>
        <Router>
          <Header/>
          <Route path="/login" component={Login}></Route>
          <Route exact path="/" component={Home}></Route>
          <Route path="/artist/:id" component={ArtistPage}></Route>
          <Route path="/album/:id" component={AlbumPage}></Route>
          <Route path="/category/:id" component={CategoryPage}></Route>
          <Route path="/search" component={SearchPage}></Route>
        </Router>
      </Container>
        <AudioControl/>
      </div>
    );
  }
}
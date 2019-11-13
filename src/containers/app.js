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
import UserPage from './UserPage';
import SearchPage from './SearchPage';
import SignUp from './SignUp';
import SongPage from './SongPage';
import Footer from '../components/Footer';
import ChartPage from '../containers/ChartPage';

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
          <ProtectedRoute path="/user/:id" component={UserPage}></ProtectedRoute>
          <Route path="/song/detail/:id" component={SongPage}></Route>
          <Route path="/signup" component={SignUp}></Route>
          <Route path="/chart" component={ChartPage}></Route>
          <Footer/>
        </Router>
      </Container>
        <AudioControl/>
      </div>
    );
  }
}
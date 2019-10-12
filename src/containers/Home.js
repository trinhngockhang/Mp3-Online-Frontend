import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Slide from '../components/Slide';
import NewSong from '../components/NewSong';
import ArtistSection from '../components/ArtistSection';
import AlbumSection from '../components/AlbumSection';

export default class Home extends Component{
  render(){
    return (
      <div>
        <Slide/>
        <NewSong/>
        <AlbumSection/>
        <ArtistSection/>
      </div>
    )
  }
};

// function mapStateToProps(state) {
//   return {
//     book: state.activeBook,
//   }
// }

// export default connect(mapStateToProps)(BookDetail);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Slide from '../components/Slide';
import Container from 'react-bootstrap/Container'
import NewSong from '../components/NewSong';
import Artist from '../components/Artist';
import AudioPlayer from 'react-h5-audio-player';

export default class Home extends Component{
  render(){
    return (
      <Container>
        <Header/>
        <Slide/>
        <NewSong/>
        <Artist/>
        {/* <AudioPlayer
    autoPlay
    src="http://localhost:3001/song/e1484868-9c31-49c0-abf1-b9e36ed0124d"
    onPlay={e => console.log("onPlay")}
    // other props here
  /> */}
      </Container>
    )
  }
};

// function mapStateToProps(state) {
//   return {
//     book: state.activeBook,
//   }
// }

// export default connect(mapStateToProps)(BookDetail);
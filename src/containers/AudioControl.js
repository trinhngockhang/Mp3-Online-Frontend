import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactAudioPlayer from 'react-audio-player';

class AudioControl extends Component{
  render(){
    if(!this.props.song){
      return <div></div>
    }
    return (
      <div >
        <ReactAudioPlayer
          className="audioControl"
          autoPlay
          src={'http://localhost:3001/song/' + this.props.song.songActive}
          controls
    // other props here
        />
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    song: state.song,
  }
}

export default connect(mapStateToProps)(AudioControl);
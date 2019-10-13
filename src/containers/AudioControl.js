import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactAudioPlayer from 'react-audio-player';
import ReactJkMusicPlayer from "react-jinke-music-player";
import { bindActionCreators } from 'redux';
import { removeOldList } from '../actions/action_song';
class AudioControl extends Component{
  constructor(props){
    super(props);
    this.state = {playIndex: 0, display: true};
  }
  getNameSinger(song){
    let name = '';
    song.singer.forEach((element, index)=> {
      name += index === 0 ? element : ' ,' + element;
    });
    return name;
  }
  render(){
    if(!this.props.song.activeSong.length > 0){
      return <div></div>
    }
    if(this.props.song.list){
      console.log("o phai cap nhat chu :(((");
      this.props.removeOldList();
      return <div></div>
    }
    console.log(this.props.song);
    return (
      <div >
        <ReactJkMusicPlayer
        className = "audioControl"
        audioLists = {this.props.song.activeSong.map((song) => {
          return {
            name:song.nameSong,
            singer:this.getNameSinger(song),
            musicSrc:`${process.env.REACT_APP_API_URL}/song/` + song.id,
            cover: song.image
          }
        })
        }
        defaultPlayIndex = {this.props.song.activeSong.length -1}
        mode="full"       
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
function mapDispatchToProps(dispatch){
    return bindActionCreators({ removeOldList, }, dispatch);
  }
export default connect(mapStateToProps, mapDispatchToProps)(AudioControl);
import React, { Component } from 'react';
import axios from '../utils/axios';
import Carousel from 'react-bootstrap/Carousel'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { playSong } from '../actions/action_song';

class Slide extends Component{
  constructor(props){
    super(props);
    this.state = {items: []};
    this.getData();
  }
  async getData(){
    const newAxios = await axios();
    const result = await newAxios.get('/song/slide');
    this.setState({items: result.data});
  }

  render(){
    return (
      <div>
        <Carousel>
          {this.state.items.map((song, index) => {
            console.log('song ne', song.coverImg);
          return(
            <Carousel.Item key={index} onClick={() =>{
              this.props.playSong(song.id)
              }}>
              <a>
                <img
                  className="d-block w-100"
                  src={song.coverImg}
                  alt={song.nameSong}
                />
              </a>
            </Carousel.Item>
          )
          })}
        </Carousel>
      </div>
    )
  }
};

function mapStateToProps(state){
  return {
    songActive: state.songActive
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ playSong: playSong }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Slide);
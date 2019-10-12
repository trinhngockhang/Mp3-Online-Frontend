import React, { Component } from 'react';
import axios from '../utils/axios';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { playSong } from '../actions/action_song';

class NewSong extends Component{
  constructor(props){
    super(props);
    this.state = {items: []};
    this.getData();
  }
  async getData(){
    const newAxios = await axios();
    const result = await newAxios.get('/song/new');
    this.setState({items: result.data});
  }

  render(){
    return (
      <div className="section">
        <h3>Những bài hát mới</h3>
        <Row>
          {this.state.items.map((song, index) => {
            return(
              <Col key={index} col lg = {3} md={3} className="playable" onClick={() =>{
                this.props.playSong(song);
                }}>
                <img src={song.image}></img>
                <p>{song.nameSong}</p>
              </Col>
            )
          })}
        </Row>
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
  return bindActionCreators({ playSong: playSong, }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewSong);
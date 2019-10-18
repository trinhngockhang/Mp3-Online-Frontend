import React, { Component } from 'react';
import { connect } from 'react-redux';
import { axiosApi } from '../utils/axios';
import { Row, Col } from 'react-bootstrap';
import { playSong } from '../actions/action_song';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

class CategoryPage extends Component{
  constructor(props){
    super(props);
    console.log(this.props.match.params.id);
    this.getListSong(this.props.match.params.id);
    this.state = {};
  }
  async getListSong(id){
    const result = await axiosApi.get(`/song/category/${id}`);
    this.setState({...this.state, listSong: result.data}); 
  }
  render(){
    if(!this.state.listSong){
      return (
        <div >

        </div>
      )
    }
    console.log(this.state.listSong);
    return (
      <div className="section">
        <h3>{this.state.listSong[0].categoryName}</h3>
        <Row>
        {this.state.listSong.map((song, index) => {
            return(
              <Col key={index} col lg = {2} md={3} className="playable song" onClick={() =>{
                this.props.playSong(song);
                }}>
                <img src={song.image} className="song-image"></img>
                <p>{song.nameSong}</p>
                <div class="player-actions">
                  <ul>
                    <li style={{zIndex: 11}}>
                      <i class="icon ic-svg-play-outline"></i>
                    </li>
                  </ul>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
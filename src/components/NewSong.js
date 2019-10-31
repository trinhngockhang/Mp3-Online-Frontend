import React, { Component } from 'react';
import { axiosApi} from '../utils/axios';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { playSong } from '../actions/action_song';
import { Link } from 'react-router-dom';

class NewSong extends Component{
  constructor(props){
    super(props);
    this.state = {items: []};
    this.getData();
  }
  async getData(){
    const result = await axiosApi.get('/song/new');
    this.setState({items: result.data});
  }

  render(){
    return (
      <div className="section">
        <h3>Những bài hát mới</h3>
        <Row>
          {this.state.items.map((song, index) => {
            if(index > 11 ) return <div></div>
            return(
              <Col key={index} col lg = {2} md={2} className="playable song" onClick={() =>{
                // this.props.playSong(song);
                }}>
                <Link to={`/song/detail/${song.id}`}>
                <img src={song.image} className="song-image" alt={song.nameSong}></img>
                <p>{song.nameSong}</p>
                <div class="player-actions">
                  <ul>
                    <li style={{zIndex: 11}}>
                      <i class="icon ic-svg-play-outline"></i>
                    </li>
                  </ul>
                </div>
                </Link>
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
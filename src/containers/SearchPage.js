import React, { Component } from 'react';
import { connect } from 'react-redux';
import { axiosApi } from '../utils/axios';
import { Row, Col } from 'react-bootstrap';
import { playSong } from '../actions/action_song';
import { bindActionCreators } from 'redux';

class SearchPage extends Component{
  constructor(props){
    super(props);
    const params = new URLSearchParams(this.props.location.search); 
    const keyword = params.get('keyword');
    // this.getDataArtist(this.props.match.params.id);
    this.searchSong(keyword);
    this.state = {};
  }
  componentWillUpdate(nextProps){
    console.log('next', nextProps.location);
    console.log('props', this.props.location);
    if(nextProps.location.search != this.props.location.search){
        const params = new URLSearchParams(nextProps.location.search); 
        const keyword = params.get('keyword');
        // this.getDataArtist(this.props.match.params.id);
        this.searchSong(keyword);
    }
  }
  async getDataArtist(id){
    const result = await axiosApi.get(`/artist/detail/${id}`);
    console.log(result);
    this.setState({...this.state,artist: result.data});
  }
  async searchSong(keyword){
    const result = await axiosApi.get(`/search/song?_keyword=${keyword}`);
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
          <h3>Kết quả</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
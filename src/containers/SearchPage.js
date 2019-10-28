import React, { Component } from 'react';
import { connect } from 'react-redux';
import { axiosApi } from '../utils/axios';
import { Row, Col } from 'react-bootstrap';
import { playSong } from '../actions/action_song';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
class SearchPage extends Component{
  constructor(props){
    super(props);
    const params = new URLSearchParams(this.props.location.search); 
    const keyword = params.get('keyword');
    this.searchAlbum(keyword);
    this.searchSong(keyword);
    this.state = {};
  }
  componentWillUpdate(nextProps){
    console.log('next', nextProps.location);
    console.log('props', this.props.location);
    if(nextProps.location.search !== this.props.location.search){
        const params = new URLSearchParams(nextProps.location.search); 
        const keyword = params.get('keyword');
        this.searchAlbum(keyword);
        this.searchSong(keyword);
    }
  }
  async searchAlbum(keyword){
    const result = await axiosApi.get(`/search/album?_keyword=${keyword}`);
    this.setState({...this.state, listAlbum: result.data}); 
  }
  async searchSong(keyword){
    const result = await axiosApi.get(`/search/song?_keyword=${keyword}`);
    this.setState({...this.state, listSong: result.data}); 
  }
  render(){
      return (
        <div>
          {
            this.state.listSong &&
            (<div className="section">
              <h3>Bài hát</h3>
            <Row>
            {this.state.listSong.map((song, index) => {
              if(index > 7) return <div></div>
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
          </div>)
          }
          {/* listAlbum */}
          {
            this.state.listAlbum &&
            (<div className="section">
              <h3>Album</h3>
            <Row>
            {this.state.listAlbum.map((album, index) => {
            return(
              <Col key={index} lg = {2} md={2} >
              <Link to={`/album/${album.id}`}>
                <img className='song-image' src={album.img} alt={album.albumName}></img>
                <p>{album.albumName}</p>
              </Link>
              </Col>
            )
          })}
          </Row>
          </div>)
          }
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
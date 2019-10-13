import React, { Component } from 'react';
import { connect } from 'react-redux';
import { axiosApi } from '../utils/axios';
import { Row, Col } from 'react-bootstrap';
import { playSong } from '../actions/action_song';
import { bindActionCreators } from 'redux';

class ArtistPage extends Component{
  constructor(props){
    super(props);
    this.getDataArtist(this.props.match.params.id);
    this.getListSong(this.props.match.params.id);
    this.state = {};
  }
  async getDataArtist(id){
    const result = await axiosApi.get(`/artist/detail/${id}`);
    console.log(result);
    this.setState({...this.state,artist: result.data});
  }
  async getListSong(id){
    const result = await axiosApi.get(`/song/artist/${id}`);
    this.setState({...this.state, listSong: result.data}); 
  }
  render(){
    if(!this.state.artist || !this.state.listSong){
      return (
        <div >

        </div>
      )
    }
    return (
      <div className="section">
        <img className = "coverImg" src={this.state.artist.coverImage} alt={this.state.artist.name}></img>
        <Row className="description-artist">
          <Col lg={3}>
            <img src={this.state.artist.avatar} alt={this.state.name}></img>
          </Col>
          <Col lg={9}>
            <p>{this.state.artist.name}</p>
            <p>{this.state.artist.description}</p>
          </Col>
        </Row>
        <h3>Những ca khúc của {this.state.artist.name}</h3>
        <Row>
            <Col className="list-song-album-page">
            <div>
              {this.state.listSong.map((song,index) => {
              return(
                  <div className="all-card playable" onClick={()=>{this.props.playSong(song)}}>
                    <div className="song-list" key={index}>
                    <div class="order">
                      <span className="list-number">{index+1}</span>
                    </div>
                      <img src={song.image} className="thum-40" alt={song.nameSong}></img>  
                    </div>
                    <div className="song-card-info">
                        <div className="title">
                          <p className="title-singer">{song.nameSong}</p>
                        </div>
                        <div className="artist">
                        {song.singer.map((data, index) =>{
                            return index === 0?
                            (
                              <span key={index}>{data.singer}</span>
                            )
                            :
                            (
                              <span key={index}>, {data.singer}</span>  
                            )
                        })}
                        </div>
                    </div>
                  </div>
              )
            })}
            </div>
          </Col>
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

export default connect(mapStateToProps, mapDispatchToProps)(ArtistPage);
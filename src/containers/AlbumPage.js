import React, { Component } from 'react';
import { connect } from 'react-redux';
import { axiosApi } from '../utils/axios';
import { Row, Col } from 'react-bootstrap';
import { playSong } from '../actions/action_song';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

class AlbumPage extends Component{
  constructor(props){
    super(props);
    console.log(this.props.match.params.id);
    this.getDataAlbum(this.props.match.params.id);
    this.getListSong(this.props.match.params.id);
    this.state = {};
  }
  async getDataAlbum(id){
    const result = await axiosApi.get(`/album/${id}`);
    this.setState({...this.state,album: result.data});
  }
  async getListSong(id){
    const result = await axiosApi.get(`/song/album/${id}`);
    this.setState({...this.state, listSong: result.data}); 
  }
  render(){
    if(!this.state.album || !this.state.listSong){
      return (
        <div >

        </div>
      )
    }
    console.log(this.state.listSong);
    return (
      <div className="section">
        <Row>
          {/* phan thong tin album */}
          <Col md={3}>
            <img src={this.state.album.img}>
            </img>
            <h4>{this.state.album.albumName}</h4>
            {this.state.album.singer.map((data, index) =>{
              return index == 0?
              (
                <Link to={`/artist/${data.singerId}`}>
                  <span key={index}>{data.singer}</span>
                </Link> 
              )
              :
              (
                <Link to={`/artist/${data.singerId}`}>
                  <span key={index}>, {data.singer}</span>
                </Link> 
              )
            })}
          </Col>
            {/* Danh sach bai hat */}
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
                              <span key={index}>{data}</span>
                            )
                            :
                            (
                              <span key={index}>, {data}</span>  
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

export default connect(mapStateToProps, mapDispatchToProps)(AlbumPage);
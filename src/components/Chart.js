import React, { Component } from 'react';
import { connect } from 'react-redux';
import { axiosApi, axiosAuthen } from '../utils/axios';
import { Row, Col, Button } from 'react-bootstrap';
import { playSong } from '../actions/action_song';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaEllipsisV } from 'react-icons/fa';

class Chart extends Component{
  constructor(props){
    super(props);
    this.getListSong();
    this.state = {};
  }
  async getListSong(){
    const axios = await axiosAuthen();
    const result = await axios.get(`/song/chart`);
    console.log(result.data);
    this.setState({...this.state, listSong: result.data}); 
  }
  async likeSong(id, liked){
    console.log('id like:', liked);
    if(!this.props.user.logined){
      this.handleShow();
      return;
    }
    const axios = await axiosAuthen();
    if(!liked){
      await axios.post(`/users/like/`, {
        songId: id
      })
      let listSong = [ ...this.state.listSong ];
      listSong.forEach(element => {
        if(element.id === id) element.liked = true;
      });
    this.setState({ ...this.state, listSong: listSong});
    } else {
      await axios.post(`/users/unlike/`, {
        songId: id
      })
      let listSong = [ ...this.state.listSong ];
      listSong.forEach(element => {
        if(element.id === id) element.liked = false;
      });
      this.setState({ ...this.state, item: {...this.state.item}});
    }
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
      <h4>Bảng xếp hạng</h4>
      <br/>
        <Row>
            {/* Danh sach bai hat */}
          <Col className="list-song-album-page">
            <div>
              {this.state.listSong.map((song,index) => {
              return(
                  <div style={{display: '-webkit-box'}}>
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
                  <div>
                  {
                    song.liked?
                     <FaHeart className ='like-icon' onClick={() => this.likeSong(song.id, song.liked)}/> :
                     <FaRegHeart className ='like-icon' onClick={() => this.likeSong(song.id, song.liked)}/>
                  }
                  <Link to={`/song/detail/${song.id}`} style={{marginLeft: '20px'}}>
                    <FaEllipsisV className ='like-icon'/>
                  </Link>
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
    songActive: state.songActive,
    user: state.auth
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ playSong: playSong, }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
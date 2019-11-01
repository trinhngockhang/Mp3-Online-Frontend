import React, { Component } from 'react';
import { connect } from 'react-redux';
import { axiosApi, axiosAuthen } from '../utils/axios';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { playSong } from '../actions/action_song';
import { bindActionCreators } from 'redux';
import { FaHeart, FaRegHeart, FaEllipsisV } from 'react-icons/fa';
import { Link } from 'react-router-dom';

class ArtistPage extends Component{
  constructor(props){
    super(props);
    this.getDataArtist(this.props.match.params.id);
    this.getListSong(this.props.match.params.id);
    this.state = {};
  }
  handleShow(){
    this.setState({...this.state, show: true});
  }
  handleClose(){
    this.setState({...this.state, show: false});
  }
  async getDataArtist(id){
    const result = await axiosApi.get(`/artist/detail/${id}`);
    console.log(result);
    this.setState({...this.state,artist: result.data});
  }
  async getListSong(id){
    const axios = await axiosAuthen();
    const result = await axios.get(`/song/artist/${id}`);
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
    if(!this.state.artist || !this.state.listSong){
      return (
        <div >

        </div>
      )
    }
    return (
      <div className="section">
      <Modal show={this.state.show} onHide={() => this.handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Chú ý</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn cần phải đăng nhập để thực hiện tính năng này</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.handleClose()}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() =>this.handleClose()}>
            <Link to='/login'>Login</Link>
          </Button>
        </Modal.Footer>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ArtistPage);
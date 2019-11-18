import React, { Component } from 'react';
import { axiosAuthen } from '../utils/axios';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { playSong } from '../actions/action_song';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaPlay } from 'react-icons/fa';
import Comment from '../components/Comment';
class SongPage extends Component{
  constructor(props){
    super(props);
    this.state = {liked: false, show: false};
    this.getData(this.props.match.params.id);
  }
  handleShow(){
    this.setState({...this.state, show: true});
  }
  handleClose(){
    this.setState({...this.state, show: false});
  }
  async getData(id){
    const axios = await axiosAuthen();
    const result = await axios.get(`/song/detail/${id}`);
    console.log('id la:', result.data);
    this.setState({...this.state, item: result.data, liked: result.data.liked});
  }
  getNameSinger(){
    return this.state.item.singer.map((element, index) => {
      return index === 0 ? <Link to={`/artist/${element.singerId}`}><span>{element.singer}</span></Link>
      : <Link to={`/artist/${element.singerId}`}><span>, {element.singer}</span></Link>
    });
  }
  async likeSong(){
    if(!this.props.user.logined){
      this.handleShow();
      return;
    }
    const axios = await axiosAuthen();
    if(!this.state.liked){
      this.setState({ ...this.state, liked: true, item: {...this.state.item, likeNumber: parseInt(this.state.item.likeNumber) + 1}});
      await axios.post(`/users/like/`, {
        songId: this.state.item.id
      })
    } else {
      this.setState({ ...this.state, liked: false, item: {...this.state.item, likeNumber: parseInt(this.state.item.likeNumber) - 1}});
      await axios.post(`/users/unlike/`, {
        songId: this.state.item.id
      })
    }
  }
  getNameCategories(){
    return this.state.item.categories.map((element, index) => {
        return index === 0 ? <Link to={`/category/${element.id}`}><span>{element.name}</span></Link>
        : <Link to={`/category/${element.id}`}><span>, {element.name}</span></Link>
      });
  }
  render(){
   
    return (
      <div>
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
        {this.state.item && 
        (
          <Row>
            <Col lg={2} mg={2}>
              <img alt={this.state.item.nameSong} className="img-song-detail" src={this.state.item.image}/>
            </Col>
            <Col lg={9} mg={9}>
              <h4>{this.state.item.nameSong}</h4>
              <span>Ca sĩ: </span>
              {this.getNameSinger()}
              <br/>
              <span>Sáng tác: </span>
              <span>{this.state.item.writer}</span>
              <br/>
              <span>Lượt thích: </span>
              <span>{this.state.item.likeNumber}</span>
              <br/>
              <span>Thể loại: </span>
              {this.getNameCategories()}
              <br/>
              
              <Button className="listen-button" onClick={() => this.props.playSong(this.state.item)}>
                <FaPlay/>
              </Button>
              <Button className="like-button" onClick={() => this.likeSong()} >{
                this.state.liked?
                  <FaHeart/>:
                  <FaRegHeart/>
              }</Button>
            </Col>
          </Row>
        )
        }
      </div>
      <Comment songId={this.props.match.params.id} logined={this.props.user.logined}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(SongPage);
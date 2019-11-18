import React, { Component } from 'react';
import { axiosApi, axiosAuthen } from '../utils/axios';
import { Row, Col, Form, FormGroup, FormLabel, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

export default class Comment extends Component{
  constructor(props){
    super();
    this.props = props;
    this.state = {data: null};
    this.getComment();
  }
  handleShow(){
    this.setState({...this.state, show: true});
  }
  handleClose(){
    this.setState({...this.state, show: false});
  }
  getComment(){
    axiosApi.get(`/song/comment/${this.props.songId}`).then((result) => {
        console.log(result);
      this.setState({data: result.data});
    })
  }
  onChangeInput(content){
    this.setState({input: content});
  }
  async submitComment(event){
    event.preventDefault();
    if(!this.props.logined){
      this.handleShow();
      return;
    }
    if(this.state.input.length > 0){
      const axios = await axiosAuthen();
      axios.post(`/users/comment/${this.props.songId}`, {
        content: this.state.input
      }).then((result) => {
        this.getComment();
        this.setState({...this.state, input: ''})
      }).catch((e) => {

      })
    }
    console.log(this.state.input);
  }
  render(){
    return (
      <div className="section comment">
      <Modal show={this.state.show} onHide={() => this.handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Chú ý</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn cần phải đăng nhập để thực hiện tính năng này</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.handleClose()}>
            Đóng
          </Button>
          <Link to='/login'>
          <Button variant="primary" onClick={() =>this.handleClose()}>
            <span>Login</span>
          </Button>
          </Link>
        </Modal.Footer>
      </Modal>
       <h4>Nhận xét</h4>
       <Row>
           <Col>
           <Form onSubmit={(event) => this.submitComment(event)}>
            <FormGroup>
              <FormLabel>Nhận xét của bạn:</FormLabel>
              <Form.Control as="textarea" rows="3" value={this.state.input} onChange={(e) => this.onChangeInput(e.target.value)} style={{height:'100px', backgroundColor:'#252323', color:'#ffffff'}} type="text" placeholder="Nhận xét của bạn..."></Form.Control>
              <br/>
              <Button variant="primary" type="submit" style={{float:'right'}}>
                Gửi
             </Button>
            </FormGroup>
          </Form>
           </Col>
       </Row>
        {
         this.state.data? 
           <div>
            {this.state.data.map((comment) => {
              return (
                <Row className="comment-box-content">
                  <Col lg={1}>
                    <img src={comment.avatar} alt={comment.username}
                     className="avatar-comment"></img>
                  </Col>
                  <Col style={{marginLeft:'20px'}}>
                    <p style={{fontSize:'18px'}}>{comment.name}</p>
                    <p style={{fontSize:'15px'}}>{comment.content}</p>
                    <p style={{fontSize:'11px'}}>
                      <Moment format="YYYY/MM/DD">
                        {comment.createdAt}
                      </Moment>
                    </p>
                  </Col>
                </Row>
              )
            })}
           </div>
          : <div>

          </div>
        }
      </div>
    )
  }
};
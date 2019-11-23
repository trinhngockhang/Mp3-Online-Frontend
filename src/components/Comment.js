import React, { Component } from 'react';
import { axiosApi, axiosAuthen } from '../utils/axios';
import { Row, Col, Form, FormGroup, FormLabel, Button, Modal, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

export default class Comment extends Component{
  constructor(props){
    super();
    this.props = props;
    this.numberCmtPage = 10;
    this.state = {data: { comments: null, count: 0 }, page : 1, totalPage : 1 };
    this.getComment(1);
  }
  handleShow(){
    this.setState({...this.state, show: true});
  }
  handleClose(){
    this.setState({...this.state, show: false});
  }
  getComment(pageNumber){
    let url = `/song/comment/${this.props.songId}?page=${pageNumber}&size=${this.numberCmtPage}`;
    console.log({url})
    axiosApi.get(url).then((result) => {
        console.log(result);
      this.setState({data: result.data, totalPage: Math.round(result.data.count/this.numberCmtPage)});
    })
  }
  onChangeInput(content){
    this.setState({input: content});
  }
  changePage(pageNumber){
    this.setState({ ...this.state, page: pageNumber });
    this.getComment(pageNumber);
  }
  nextPage(){
    if(this.state.page < this.state.totalPage){
      this.setState({ ...this.state, page: this.state.page + 1 });
      this.getComment(this.state.page + 1);
    }
  }
  prePage(){
    if(this.state.page > 1){
      this.setState({ ...this.state, page: this.state.page - 1 });
      this.getComment(this.state.page - 1);
    }
  }
  pagination(){
    let arr = [];
    for(let i = 1; i<= this.state.totalPage; i++ ){
        arr.push(i);
    }
    return (
        <Pagination style={{paddingLeft: '80%'}}>
          <Pagination.Prev onClick={() => this.prePage()}/>
          {
            arr.map((number) => {
              return <Pagination.Item active={this.state.page === number}
              onClick={() => this.changePage(number)}
              >
              {number}</Pagination.Item>
            })
          }
          <Pagination.Next onClick={() => this.nextPage()} />
        </Pagination>
    )
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
       <h4>Nhận xét ({this.state.data.count})</h4>
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
         this.state.data.comments ? 
           <div>
            {this.state.data.comments.map((comment) => {
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
        {this.pagination()}
      </div>
    )
  }
};
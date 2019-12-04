import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel, Modal } from "react-bootstrap";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginAction, getMe, loginFb, loginGg, loginSso } from '../actions/auth';
import { Redirect, Link } from "react-router-dom";
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import Spinner from 'react-spinner-material';
import { axiosApi, axiosSSO } from "../utils/axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    const params = new URLSearchParams(this.props.location.search); 
    const keyword = params.get('signup');
    this.responseFacebook = this.responseFacebook.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    if(keyword === "success"){
       this.state = {redirectMess: "Đăng ký thành công, mời đăng nhập lại",
       username: "",
       password: ""
      };
    }else{
      this.state = {
        username: "",
        password: ""
      };
    }
  }
  responseGoogle(response){
    console.log('response tu gg', response);
    this.props.loginGg(response.tokenId);
  }
  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.loginAction({
      username: this.state.username,
      password: this.state.password,
    });
    this.props.getMe();
  }

  responseFacebook(response){
    console.log('response', response);
    this.props.loginFb(response.accessToken);
    // if(this.props.user.logined){
    //   this.props.getMe();
    // }
  }

  handleShow(){
    this.setState({...this.state, show: true});
  }
  handleClose(){
    this.setState({...this.state, show: false});
  }

  async clickSso(){
    this.handleShow();
    // tao 1 phien lam viec moi
    const result = await axiosSSO.post('/authorization/transaction', {
      appId: 'iEMBWG8Lr'
    });
    this.setState({...this.state, qrCodeUrl: result.data.codeURL });
    // lien tuc request toi server
    var poolingId = setInterval(async () => {
      console.log('pollni==');
      const response = await axiosSSO.get(`/authorization/polling/${result.data.sessionId}`);
        if(response.data.status === 204){
          this.setState({ ...this.state, read:true });
          console.log('da doc', response);
        }else if(response.data.status === 200){
          console.log('data ne', response.data);
          clearInterval(poolingId);
          const result = await axiosApi.post('/auth/login-sso', {
            token: response.data.accessToken,
          });
          console.log(result);
          this.props.loginSso(result.data);
          console.log('chuyen sang trang home');
          window.location = '/';
        }
    }, 2000)
  }

  render() {
    if(this.props.user.logined){
      return(<Redirect to='/' />)
    }
    return (
      <div className="Login">
      <Modal show={this.state.show} onHide={() => this.handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Quét mã QR code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {
          !this.state.qrCodeUrl ?
          <div style={{  width: '70px', margin: 'auto' }}>
            <Spinner size={70} spinnerColor={"#2768ca"} spinnerWidth={2} visible={true} />
          </div>:
          <img style = {{display: 'block', margin: 'auto'}}src={this.state.qrCodeUrl} alt="qrcode"/>
        }
        {
          this.state.read ?
            <div>
              <br/>
              <p>Đã quét, chờ xác nhận</p>
            </div>
          : null
        }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.handleClose()}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
      <h5 style={{textAlign: 'center'}}>{this.state.redirectMess}</h5>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <FormLabel>Tên đăng nhập</FormLabel>
            <FormControl
              autoFocus
              type="text"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <FormLabel>Mật khẩu</FormLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <p>{this.props.user.loginFail}</p>
          <Button
            className="button"
            block
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
        <div className="social-login" style={{justifyContent: 'center', display: 'grid', marginTop: '30px'}}>
          <FacebookLogin
          style={{width: '45%'}}
          appId="2613047625477892"
          fields="name"
          callback={this.responseFacebook} />
          <div style={{marginTop: '30px'}}> 
          <GoogleLogin
            clientId="489701027929-pluu215a3umit17t7iutmliavd0qmbec.apps.googleusercontent.com"
            buttonText="Login"
            className="gg-button"
            style={{width: '100%'}}
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
          </div>
          <div>
            <button className="ssoButton" onClick={() => {this.clickSso()}}>
              <span>
                Login By SSO
              </span>
            </button>
          </div>
        </div>
        <div style={{justifyContent: 'center', display: 'flex', marginTop: '30px'}}>
        <p>Nếu bạn chưa có tài khoản?</p>
        <Link to="/signup"><span>Click Here</span></Link>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state){
  return {
    user: state.auth
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ loginAction: loginAction, loginSso, getMe, loginFb, loginGg }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
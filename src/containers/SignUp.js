import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Redirect, withRouter } from "react-router-dom";
import { axiosApi } from '../utils/axios';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      username: "",
      password: "",
      re_password: "",
      name: "",
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length >= 6;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    console.log("tu ligin:", this.state.username)
    event.preventDefault();
    axiosApi.post('/auth/signup', {
      username: this.state.username,
      name: this.state.name,
      password: this.state.password,
      rePassword: this.state.re_password
    }).then((result) => {
        console.log(result.data);
        if(result.data.code === 200){
            this.props.history.push('/login?signup=success');
        }
    }).catch((e) => {
        if(e.response.status === 400 ){
            this.setState({...this.state,failMess: "Tài khoản đã tồn tại" })
        }else if(e.response.status === 401){
            this.setState({...this.state,failMess: "Mật khẩu không trùng khớp" })
        }
    })
  }

  render() {
    return (
      <div className="Login">
      <h4>Đăng ký tài khoản</h4>
      <br/>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <FormLabel>Tên đăng nhập</FormLabel>
            <FormControl
              autoFocus
              type="text"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="name" bsSize="large">
            <FormLabel>Tên</FormLabel>
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
          <FormGroup controlId="re_password" bsSize="large">
            <FormLabel>Nhập lại mật khẩu</FormLabel>
            <FormControl
              value={this.state.re_password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
         
          <p style={{color:'red'}}>{this.state.failMess}</p>
          <br/>
          <Button
            className="button"
            block
            disabled={!this.validateForm()}
            type="submit"
          >
            Đăng ký
          </Button>
        </form>
      </div>
    );
  }
}

export default withRouter(SignUp);
import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginAction, getMe } from '../actions/auth';
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      username: "",
      password: ""
    };
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
    console.log("tu ligin:", this.state.username)
    event.preventDefault();
    console.log("tu ligin:", this.state.username)
    this.props.loginAction({
      username: this.state.username,
      password: this.state.password,
    });
    this.props.getMe();
  }

  render() {
    if(this.props.user.logined){
      return(<Redirect to='/' />)
    }
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <FormLabel>username</FormLabel>
            <FormControl
              autoFocus
              type="text"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <FormLabel>Password</FormLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            className="button"
            block
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
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
  return bindActionCreators({ loginAction: loginAction, getMe }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
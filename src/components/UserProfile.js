import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { checkInit, getMe, logOut } from '../actions/auth';
import { axiosAuthen } from '../utils/axios';
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

class UserProfile extends Component {
  constructor(props){
    super(props);
    this.props.checkInit();
    if(this.props.user.logined){
      this.props.getMe();
    }
    this.state = {};
  }

  componentDidUpdate(){
    if(!this.props.user.data && this.props.user.logined){
      this.props.getMe();
    }
  }
  logOut(){
    this.props.logOut();
  }
  render() {
    return (
      <div className = "profile-container">
        {
          this.props.user.logined ?
          (
            this.props.user.data && 
            <div className="profile-content">
              <Link to={`/user/${this.props.user.data.id}`}>
                <img alt={this.props.user.data.name} src={this.props.user.data.avatar} className="avatar"></img>
                <span>{this.props.user.data.name}</span>
              </Link>
              
              <NavDropdown  id="dropdown-menu-align-right" alignRight className="navbar-inverse">
                <NavDropdown.Item onClick={() => this.logOut()}>Đăng xuất</NavDropdown.Item>
              </NavDropdown>
            </div>
            
          )
          :
          (
            <Link to="/login">
                Đăng nhập
            </Link>
          )
        }
      </div>        
    )
  }
}
function mapStateToProps(state){
    return {
      user: state.auth
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ checkInit, getMe, logOut }, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

class ProtectedRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props
    return (
      <Route 
        {...props} 
        render={props => (
          this.props.user.logined ?
            <Component {...props} /> :
            <Redirect to='/login' />
        )} 
      />
    )
  }
}
function mapStateToProps(state){
    return {
      user: state.auth
    }
}
  
export default connect(mapStateToProps)(ProtectedRoute);
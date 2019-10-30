import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import UserProfile from './UserProfile';
class Header extends Component{
  constructor(props){
    super(props);
    this.state = {input: ''};
    console.log(this.props);
    this.onChangeInput = this.onChangeInput.bind(this);
  }
  submitSearch(event){
    event.preventDefault();
    this.props.history.replace(`/search?keyword=${this.state.input}`)
  }
  onChangeInput(content){
    console.log(this.props);
    this.setState({input: content});
  }
  render(){
    return (
      <div>
       <Navbar bg="dark" expand="lg">
         <Navbar.Brand ><Link to='/'>MP3 Online</Link></Navbar.Brand>
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
         <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link><Link to='/'>Home</Link></Nav.Link>
            <Nav.Link><Link to='/'>Albums</Link></Nav.Link>
            <Nav.Link><Link to='/'>Artist</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Form inline className="form-search" onSubmit={(event) => this.submitSearch(event)}>
          <FormControl onChange={(e) => this.onChangeInput(e.target.value)} type="text" placeholder="Search song,album..." className="sr-sm-2 " id ="input-search" />
        </Form>
        <Nav>
        <UserProfile/>
        </Nav>
        
    </Navbar>
      </div>
    )
  }
};

export default withRouter(Header);
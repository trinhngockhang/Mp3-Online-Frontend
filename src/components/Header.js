import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Header extends Component{
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
        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
         <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown> */}
        </Nav>
  </Navbar.Collapse>
  <Form inline>
      <FormControl type="text" placeholder="Search song,album..." className="sr-sm-2" />
    </Form>
</Navbar>
      </div>
    )
  }
};

import React, { Component } from 'react';
import './NavBar.css';
import { Navbar as Nav } from 'react-bootstrap';
import NavItem from './NavItem/NavItem';
import NavBrand from './NavBrand/NavBrand';

class NavBar extends Component {
  render() {
    return (
      <div className="NavBar">
        <Nav expand="sm" fixed="bottom" className="">
          <NavBrand name="Jour" icon="pencil-alt" to="/home" />
          <Nav.Toggle aria-controls="basic-navbar-nav" />
          <Nav.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavItem name="Home" icon="home" to="/home" />
              <NavItem name="Calendar" icon="calendar" to="/calendar" />
              <NavItem name="Settings" icon="cog" to="/settings" />
              <NavItem name="Sign out" icon="sign-out-alt" to="/login" />
            </Nav>
          </Nav.Collapse>
        </Nav>
      </div>
    );
  }
}

export default NavBar;

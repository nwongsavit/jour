import React, { Component } from 'react';
import './NavBar.css';
import { Navbar as Nav } from 'react-bootstrap';
import NavItem from './NavItem/NavItem';
import NavBrand from './NavBrand/NavBrand';

class NavBar extends Component {
  render() {
    return (
      <div className="NavBar">

        <div className="container-fluid h-100">
          <div className="row h-100">
            <aside className="col-12 col-md-2 p-0 bg-dark">
            Test
            </aside>
          </div>
        </div>

        <Nav expand="sm" fixed="bottom" className="">
          <NavBrand name="Jour" icon="pencil-alt" to="/home" />
          <NavItem name="Home" icon="home" to="/home" />
          <NavItem name="Calendar" icon="calendar" to="/calendar" />
          <NavItem name="Settings" icon="cog" to="/settings" />
          <NavItem name="Sign out" icon="sign-out-alt" to="/login" />
        </Nav>

      </div>
    );
  }
}

export default NavBar;

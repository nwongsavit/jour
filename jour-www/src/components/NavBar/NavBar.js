import React, { Component } from 'react';
import NavItem from './NavItem/NavItem';
import NavBrand from './NavBrand/NavBrand';
import './NavBar.css';

class NavBar extends Component {
  render() {
    return (
      <div className="NavBar">
        <div className="container-fluid h-100">
          <div className="row h-100">
            <aside className="col-12 col-md-2 p-0 bg-dark fixed-bottom">
              <nav className="navbar navbar-expand navbar-dark bg-dark flex-md-column flex-row align-items-start py-2">
                <div className="collapse navbar-collapse align-items-start">
                  <ul className="flex-md-column flex-row navbar-nav w-100 justify-content-between">
                    <li className="nav-item">
                      <NavBrand name="Jour" icon="pencil-alt" to="/home" />
                    </li>
                    <li className="nav-item">
                      <NavItem name="Home" icon="home" to="/home" />
                    </li>
                    <li className="nav-item">
                      <NavItem name="Calendar" icon="calendar" to="/calendar" />
                    </li>
                    <li className="nav-item">
                      <NavItem name="Statistics" icon="chart-bar" to="/statistics" />
                    </li>
                    <li className="nav-item">
                      <NavItem name="Settings" icon="cog" to="/settings" />
                    </li>
                    <li className="nav-item">
                      <NavItem name="Sign out" icon="sign-out-alt" to="/login" />
                    </li>
                  </ul>
                </div>
              </nav>
            </aside>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;

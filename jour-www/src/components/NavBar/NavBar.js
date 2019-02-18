import React, { PureComponent } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './NavBar.css';

class NavBar extends PureComponent {
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
                      <Link className="navbar-brand pl-0 text-nowrap" to="/home">
                        <FontAwesomeIcon icon="pencil-alt" />
                        &nbsp;&nbsp;
                        <span className="font-weight-bold">Jour</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link pl-0" to="/home">
                        <FontAwesomeIcon icon="home" />
                        &nbsp;&nbsp;
                        <span className="d-none d-md-inline">Home</span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link pl-0" to="/calendar">
                        <FontAwesomeIcon icon="calendar" />
                        &nbsp;&nbsp;
                        <span className="d-none d-md-inline">Calendar</span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link pl-0" to="/statistics">
                        <FontAwesomeIcon icon="chart-bar" />
                        &nbsp;&nbsp;
                        <span className="d-none d-md-inline">Statistics</span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link pl-0" to="/settings">
                        <FontAwesomeIcon icon="cog" />
                        &nbsp;&nbsp;
                        <span className="d-none d-md-inline">Settings</span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link pl-0" to="/login">
                        <FontAwesomeIcon icon="sign-out-alt" />
                        &nbsp;&nbsp;
                        <span className="d-none d-md-inline">Sign out</span>
                      </NavLink>
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

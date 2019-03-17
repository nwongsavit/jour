import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './NavBar.css';

const bg = require('../../assets/jourlogo200w.png');

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const { width } = this.state;
    const isMobile = width <= 767;

    let navClasses;
    if (isMobile) {
      navClasses = 'fixed-bottom';
    } else {
      navClasses = 'col-10 col-md-2';
    }
    return (
      <div className={`${navClasses} NavBar`}>
        <nav className="navbar navbar-expand navbar-dark">
          <div className="navbar-collapse">
            <ul className="flex-md-column navbar-nav w-100 test">
              <Link id="logo" to="/home">
                <img height="30em" src={bg} alt="Jour" />
              </Link>
              <NavLink className="nav-item nav-link" activeClassName="active" to="/home">
                <FontAwesomeIcon className="icon" icon="home" />
                <span className="d-none d-md-inline">Home</span>
              </NavLink>
              <NavLink className="nav-item nav-link" activeClassName="active" to="/calendar">
                <FontAwesomeIcon className="icon" icon="calendar" />
                <span className="d-none d-md-inline">Calendar</span>
              </NavLink>
              <NavLink className="nav-item nav-link" activeClassName="active" to="/statistics">
                <FontAwesomeIcon className="icon" icon="chart-bar" />
                <span className="d-none d-md-inline">Statistics</span>
              </NavLink>
              <NavLink className="nav-item nav-link" activeClassName="active" to="/settings">
                <FontAwesomeIcon className="icon" icon="cog" />
                <span className="d-none d-md-inline">Settings</span>
              </NavLink>
              <NavLink className="nav-item nav-link" activeClassName="active" to="/login">
                <FontAwesomeIcon className="icon" icon="sign-out-alt" />
                <span className="d-none d-md-inline">Sign out</span>
              </NavLink>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;

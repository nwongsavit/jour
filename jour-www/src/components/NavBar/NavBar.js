import React, { Component } from 'react';
import NavItem from './NavItem/NavItem';
import NavBrand from './NavBrand/NavBrand';
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
        <nav className="navbar navbar-expand">
          <div className="navbar-collapse">
            <ul className="flex-md-column navbar-nav w-100 navFlex">
              <NavBrand name="Jour" icon={bg} to="/home" />
              <NavItem name="Home" icon="home" to="/home" />
              <NavItem name="Calendar" icon="calendar" to="/calendar" />
              <NavItem name="Statistics" icon="chart-bar" to="/statistics" />
              <NavItem name="Settings" icon="cog" to="/settings" />
              <NavItem name="Log In" icon="sign-out-alt" to="/login" />
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;

import React, { Component } from 'react';
import NavItem from './NavItem/NavItem';
import './NavBar.css';

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
  };

  render() {
    const { width } = this.state;
    const isMobile = width <= 767;

    let navClasses = 'NavBar';
    if (isMobile) {
      navClasses = 'fixed-bottom NavBar';
    }

    return (
      <div className={`${navClasses}`}>
        <nav className="navbar navbar-expand">
          <div className="navbar-collapse">
            <ul className="flex-md-column navbar-nav w-100 navFlex">
              {/* {!isMobile && <NavBrand name="Jour" icon={bg} to="/home" />} */}
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

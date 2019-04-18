import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './UserBar.css';
import NavBrand from '../NavBar/NavBrand/NavBrand';

const bg = require('../../assets/jourlogo200w.png');

class UserBar extends Component {
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

  // renderDropdown() {
  //   console.log();
  // }

  render() {
    const { width } = this.state;
    const isMobile = width <= 767;

    return (
      <div className="UserBar">
        <NavBrand name="Jour" icon={bg} to="/home" />
        <div className="user-info">
          <img
            src="https://www.dhresource.com/0x0s/f2-albu-g1-M01-BA-11-rBVaGFZPxxaAFYa-AAHcP0vLhWQ251.jpg/movie-jewelry-harry-potter-deathly-hallows.jpg"
            className="profile-picture"
            alt="profile"
          />
          {!isMobile && (
            // <div className="user-dropdown" onClick={this.renderDropdown}>
            <div className="username smallText">Harry Potter</div>
            //   <FontAwesomeIcon id="next" icon="angle-down" />
            // </div>
          )}
        </div>
      </div>
    );
  }
}

export default UserBar;

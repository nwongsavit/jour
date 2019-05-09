import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import './UserBar.css';
import NavBrand from '../NavBar/NavBrand/NavBrand';
import UserDropdown from './UserDropdown/UserDropdown';

const bg = require('../../assets/jourlogo.svg');

class UserBar extends Component {
  constructor(props) {
    super(props);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.openDropdown = this.openDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.state = {
      width: window.innerWidth,
      dropdown: false,
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
      this.setState({
        dropdown: false,
      });
    }
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  toggleDropdown() {
    this.setState({ dropdown: !this.state.dropdown });
  }

  openDropdown() {
    this.setState({ dropdown: true });
  }

  closeDropdown() {
    this.setState({ dropdown: false });
  }

  render() {
    const { width, dropdown } = this.state;
    const { name, isLoggedIn } = this.props;
    const isMobile = width <= 767;

    return (
      <div className="UserBar">
        <NavBrand name="Jour" icon={bg} to="/calendar" />

        <div className="user-container">
          {isLoggedIn ? (
            <div
              className="user-info"
              onFocus={this.openDropdown}
              onBlur={this.closeDropdown}
              tabIndex="0"
            >
              <FontAwesomeIcon className="profile-picture" icon="user" />
              {/* <img
                src="https://www.dhresource.com/0x0s/f2-albu-g1-M01-BA-11-rBVaGFZPxxaAFYa-AAHcP0vLhWQ251.jpg/movie-jewelry-harry-potter-deathly-hallows.jpg"
                className="profile-picture"
                alt="profile"
              /> */}
              {!isMobile && (
                <div className="username small-text">{name}</div>
                //   <FontAwesomeIcon id="next" icon="angle-down" />
                // </div>
              )}
              {dropdown ? <UserDropdown /> : ''}
            </div>
          ) : (
            <div className="login-button">
              <a href="/login">Login</a>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  name: state.account_info.name,
  isLoggedIn: state.isLoggedIn,
});

export default connect(mapStateToProps)(UserBar);

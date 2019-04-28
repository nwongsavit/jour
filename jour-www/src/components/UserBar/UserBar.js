import React, { Component } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import './UserBar.css';
import NavBrand from '../NavBar/NavBrand/NavBrand';

const bg = require('../../assets/jourlogo200w.png');

class UserBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      name: this.props.name,
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
    const { name } = this.state;
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
            <div className="username small-text">
              {name}
            </div>
            //   <FontAwesomeIcon id="next" icon="angle-down" />
            // </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  name: state.account_info.name,
});

export default connect(mapStateToProps)(UserBar);

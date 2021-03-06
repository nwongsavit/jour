import React, { Component } from 'react';
import './NavBrand.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class NavBrand extends Component {
  render() {
    const { icon, to } = this.props;

    return (
      <Link className="NavBrand" to={to}>
        <img height="30em" src={icon} alt="Jour" />
      </Link>
    );
  }
}

NavBrand.propTypes = {
  icon: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default NavBrand;

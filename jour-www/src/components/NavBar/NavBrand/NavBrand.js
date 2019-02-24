import React, { Component } from 'react';
import './NavBrand.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

class NavBrand extends Component {
  render() {
    const { name, icon, to } = this.props;

    return (
      <Link className="NavBrand navbar-brand" to={to}>
        <FontAwesomeIcon className="navIcon" icon={icon} />
        <span>{name}</span>
      </Link>
    );
  }
}

NavBrand.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default NavBrand;

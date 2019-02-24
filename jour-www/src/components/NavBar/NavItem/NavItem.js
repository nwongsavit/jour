import React, { Component } from 'react';
import './NavItem.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

class NavItem extends Component {
  render() {
    const { name, icon, to } = this.props;

    return (
      <NavLink className="NavItem nav-link" activeClassName="NavItem nav-link active" to={to}>
        <FontAwesomeIcon className="navIcon" icon={icon} />
        <span>{name}</span>
      </NavLink>
    );
  }
}

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default NavItem;

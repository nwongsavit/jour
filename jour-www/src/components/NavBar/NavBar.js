import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NavItem from './NavItem/NavItem';
import './NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
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
              <NavItem
                name="Add"
                icon="plus"
                to="/add"
              />
              <NavItem
                name="Calendar"
                icon="calendar"
                to="/calendar"
              />
              <NavItem
                name="Statistics"
                icon="chart-bar"
                to="/statistics"
              />
              <NavItem
                name="Settings"
                icon="cog"
                to="/settings"
              />
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn,
});

export default withRouter(connect(mapStateToProps)(NavBar));

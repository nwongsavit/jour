import React, { Component } from 'react';
import { connect } from 'react-redux';
import { store } from '../../store/configureStore';
import NavItem from "./NavItem/NavItem";
import './NavBar.css';

class NavBar extends Component {
  constructor() {
    super();
    this.handleLogInClick = this.handleLogInClick.bind(this);

    this.state = {
      width: window.innerWidth,
      isLoggedIn: store.getState().isLoggedIn
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

  handleLogInClick(e) {
    e.preventDefault();
    const { isLoggedIn } = this.state;
    if (isLoggedIn) {
      this.props.dispatch({
        type: 'LOGOUT',
      });
    }
  }

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
              <NavItem name="Log In" icon="sign-out-alt" to="/login" onClick={this.handleLogInClick} />
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

export default connect(mapStateToProps)(NavBar);

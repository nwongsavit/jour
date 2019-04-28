import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NavItem from './NavItem/NavItem';
import './NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.handleLogInClick = this.handleLogInClick.bind(this);
    this.handleNavItemClick = this.handleNavItemClick.bind(this);
    this.state = {
      width: window.innerWidth,
      isLoggedIn: this.props.isLoggedIn,
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

  handleNavItemClick = (e, to) => {
    e.preventDefault();
    this.setState(
      {
        isLoggedIn: this.props.isLoggedIn,
      },
      () => {
        const { isLoggedIn } = this.state;
        console.log('to :', to);
        console.log('isLoggedIn :', isLoggedIn);
        if (isLoggedIn) {
          this.props.history.push(to);
        }
        else {
          this.props.history.push('/login');
        }
      },
    );
  }

  handleLogInClick(e) {
    e.preventDefault();
    this.props.history.push('/login');
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
              <NavItem name="Home" icon="home" to="/home" onClick={(e => this.handleNavItemClick(e, '/home'))} />
              <NavItem name="Calendar" icon="calendar" to="/calendar" onClick={(e => this.handleNavItemClick(e, '/calendar'))} />
              <NavItem name="Statistics" icon="chart-bar" to="/statistics" onClick={(e => this.handleNavItemClick(e, '/statistics'))} />
              <NavItem name="Settings" icon="cog" to="/settings" onClick={(e => this.handleNavItemClick(e, '/settings'))} />
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

export default withRouter(connect(mapStateToProps)(NavBar));

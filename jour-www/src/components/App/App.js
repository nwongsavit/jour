import React, { Component } from 'react';
import {
  Route, Redirect, Switch, withRouter,
} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { connect } from 'react-redux';
import {
  faPencilAlt,
  faPlus,
  faCalendar,
  faChartBar,
  faCog,
  faSignOutAlt,
  faAngleLeft,
  faAngleRight,
  faAngleDown,
  faThLarge,
  faUser,
  faSpinner,
  faCheckCircle,
  faBook,
  faClipboard,
} from '@fortawesome/free-solid-svg-icons';
import NavBar from '../NavBar/NavBar';
import Add from '../Add/Add';
import Calendar from '../Calendar/Calendar';
import Statistics from '../Statistics/Statistics';
import Settings from '../Settings/Settings';
import Login from '../User/Login';
import Register from '../User/Register';
import Confirm from '../User/Confirm';
import ForgotPassword from '../User/ForgotPassword';
import UserBar from '../UserBar/UserBar';
import RootModal from '../RootModal/RootModal';
import Landing from '../Landing/Landing';
import './App.css';

library.add(
  faPencilAlt,
  faPlus,
  faCalendar,
  faChartBar,
  faCog,
  faSignOutAlt,
  faAngleLeft,
  faAngleRight,
  faThLarge,
  faAngleDown,
  faUser,
  faSpinner,
  faCheckCircle,
  faBook,
  faClipboard,
);

class App extends Component {
  render() {
    const { isLoggedIn } = this.props;

    return (
      <div className="App">
        {isLoggedIn ? <NavBar /> : ''}
        <div className="content">
          <UserBar />
          <div className="container">
            <Switch>
              <Route path="/add" component={Add} />
              <Route path="/calendar" component={Calendar} />
              <Route path="/statistics" component={Statistics} />
              <Route path="/settings" component={Settings} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/confirm" component={Confirm} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Redirect path="/" to="/login" component={Login} />
            </Switch>
          </div>
          <div className="filler" />
        </div>
        <RootModal />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn,
});

export default withRouter(connect(mapStateToProps)(App));

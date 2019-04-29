import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPencilAlt,
  faHome,
  faCalendar,
  faChartBar,
  faCog,
  faSignOutAlt,
  faAngleLeft,
  faAngleRight,
  faAngleDown,
  faThLarge,
} from '@fortawesome/free-solid-svg-icons';
import NavBar from '../NavBar/NavBar';
import Home from '../Home/Home';
import Calendar from '../Calendar/Calendar';
import Statistics from '../Statistics/Statistics';
import Settings from '../Settings/Settings';
import Login from '../User/Login';
import Register from '../User/Register';
import Confirm from '../User/Confirm';
import ForgotPassword from '../User/ForgotPassword';
import UserBar from '../UserBar/UserBar';
import RootModal from '../RootModal/RootModal';
import MonthView from '../Calendar/MonthView/MonthView'; // remove latr
import './App.css';

library.add(
  faPencilAlt,
  faHome,
  faCalendar,
  faChartBar,
  faCog,
  faSignOutAlt,
  faAngleLeft,
  faAngleRight,
  faThLarge,
  faAngleDown,
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="content">
          <UserBar />
          <div className="container">
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/calendar" component={Calendar} />
              <Route path="/statistics" component={Statistics} />
              <Route path="/settings" component={Settings} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/confirm" component={Confirm} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/demo" component={MonthView} />
              <Redirect path="/" exact to="/home" />
            </Switch>
          </div>
        </div>
        <RootModal />
      </div>
    );
  }
}

export default App;

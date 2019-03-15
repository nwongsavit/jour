import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPencilAlt, faHome, faCalendar, faChartBar, faCog, faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import NavBar from '../NavBar/NavBar';
import Home from '../Home/Home';
import Calendar from '../Calendar/Calendar';
import Statistics from '../Statistics/Statistics';
import Settings from '../Settings/Settings';
import Login from '../User/Login';
import Register from '../User/Register';
import Confirm from '../User/Confirm';
import './App.css';

library.add(faPencilAlt, faHome, faCalendar, faChartBar, faCog, faSignOutAlt);

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="container">
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/calendar" component={Calendar} />
            <Route path="/statistics" component={Statistics} />
            <Route path="/settings" component={Settings} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/confirm" component={Confirm} />
            <Redirect path="/" exact to="/home" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

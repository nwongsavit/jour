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
import Login from '../Login/Login';
import './App.css';

library.add(faPencilAlt, faHome, faCalendar, faChartBar, faCog, faSignOutAlt);

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid h-100">
          <div className="row h-100">
            <aside className="col-12 col-md-2 p-0">
              <NavBar />
            </aside>
            <main className="col">
              {/* all other components go here! */}
            </main>
          </div>
        </div>

        <div className="App">
          <div className="container">
            {/* <NavBar /> */}
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/calendar" component={Calendar} />
              <Route path="/statistics" component={Statistics} />
              <Route path="/settings" component={Settings} />
              <Route path="/login" component={Login} />
              <Redirect path="/" exact to="/home" />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPencilAlt, faHome, faCalendar, faChartBar, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import NavBar from './components/navBar';
import HomePage from "./components/Page/homePage";
import CalendarPage from "./components/Page/calendarPage";
import StatsPage from "./components/Page/statisticsPage";
import SettingsPage from "./components/Page/settingsPage";
import LoginPage from "./components/Page/loginPage";
import './App.css';

library.add(faPencilAlt, faHome, faCalendar, faChartBar, faCog, faSignOutAlt);

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar/>
        <div className="container">
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route path="/calendar" component={CalendarPage} />
            <Route path="/stats" component={StatsPage} />
            <Route path="/settings" component={SettingsPage} />
            <Route path="/login" component={LoginPage} />
            <Redirect path="/" exact to="/home" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;

import React, { PureComponent } from 'react';
import './App.css';
import Calendar from '../Calendar/Calendar';

class App extends PureComponent {
  render() {
    return (
      <div className="App">
        <Calendar />
      </div>
    );
  }
}

export default App;

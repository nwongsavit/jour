import React, { Component } from 'react';
import './Home.css';
import Textbox from '../Textbox/Textbox';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        Home
        <Textbox />
      </div>
    );
  }
}

export default Home;

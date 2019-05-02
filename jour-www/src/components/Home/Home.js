import React, { Component } from 'react';
import './Home.css';
import Textbox from '../Textbox/Textbox';



class Home extends Component {
  render() {
    componentDidMount: function() {
      document.title = "Jour - Home";
    };
    return (
      <div className="Home">
        <Textbox />
      </div>
    );
  }
}

export default Home;

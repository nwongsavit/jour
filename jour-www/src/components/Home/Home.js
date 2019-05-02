import React, { Component } from 'react';
import './Home.css';
import Textbox from '../Textbox/Textbox';



class Home extends Component {
  componentDidMount() {
    document.title = "Jour - Home";
  }
  render() {
    return (
      <div className="Home">
        <Textbox />
      </div>
    );
  }
}

export default Home;

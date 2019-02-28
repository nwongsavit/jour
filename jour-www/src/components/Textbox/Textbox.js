import React, { Component } from 'react';
import './Textbox.css';

class Textbox extends Component {
  render() {
    return (
      <div className="Textbox">
        <p>How are you feeling today? </p>


        <p>I am feeling: </p>

        <select name="emotion" form="emotion">
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="angry">Angry</option>
          <option value="anxious">Anxious</option>
          <option value="confident">Confident</option>
          <option value="nostalgic">Nostalgic</option>

        </select>
        <input type="Submit" />
      </div>
    );
  }
}

export default Textbox;

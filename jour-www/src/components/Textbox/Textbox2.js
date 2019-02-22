import React, { Component } from 'react';
import './Textbox2.css';

class Textbox2 extends Component {
  render() {
    return (
      <div className='Textbox2'>
      <p>How are you feeling today? </p>

        <textarea rows="6" cols="100">
      Respond to the question. Or write what's on your mind


        </textarea>

      <p>I am feeling: </p>

      <select name="emotion" form="emotion">
        <option value="happy">Happy</option>
        <option value="sad">Sad</option>
        <option value="angry">Angry</option>
        <option value="anxious">Anxious</option>
        <option value="confident">Confident</option>
        <option value="nostalgic">Nostalgic</option>

      </select>
      <input type="Submit">
      </input>
      </div>
    );
  }
}

export default Textbox2;

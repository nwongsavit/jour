import React, { Component } from 'react';
import './Settings.css';

class Settings extends Component {
  componentDidLoad() {
    document.title = "Jour - Settings";
  }
  render() {
    return (
      <div className='Settings'>
      <p>E-mail </p>
      <textarea rows="1" cols="100">
      </textarea>
      <button type="button">Change E-mail</button>
      <br></br>

      <br/>

      <p>Password </p>
      <textarea rows="1" cols="100">
      </textarea>
      <button type="button">Change Password</button>
      <br></br>
      <br/>

      <p>Your Username </p>
      <textarea rows="1" cols="100">
      </textarea>
      <button type="button">Change Username</button>
      <br></br>
      <br/>

      <p>Your First Name </p>
      <textarea rows="1" cols="100">
      </textarea>
      <button type="button">Change First Name</button>
      <br></br>
      <br/>

      <p>Your Last Name </p>
      <textarea rows="1" cols="100">
      </textarea>
      <button type="button">Change Last Name</button>
      <br></br>

      <br/>

      <label for="timenotify">Notify me at:</label>
      <input type="time" id="timenotify" name="timenotify"
             min="0:00" max="24:00" required>
      </input>

      <input type="Submit">
      </input>

      <br/>
      <br></br>
      <button type="button">Reset Your Account</button>




      </div>


    );
  }
}

export default Settings;

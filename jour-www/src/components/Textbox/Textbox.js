import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Textbox.css';
import Task from '../Task/Task';

class Textbox extends Component {
  render() {
    return (
      <div className="Textbox">
        <Form className="textboxForm">
          <h3>Welcome Jane!</h3>
          <textarea rows="1" placeholder="How are you feeling today?" />
          <Form.Control as="select">
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="angry">Angry</option>
            <option value="anxious">Anxious</option>
            <option value="confident">Confident</option>
            <option value="nostalgic">Nostalgic</option>
          </Form.Control>
          <div className="tasks">
            <h3>Tasks</h3>
            <Task title="Finish presentation script" />
            <Task title="Practice presentation" />
            <Task title="Talk to team about homework" />
            <div className="addTask smallText">
              <div className="plus">+</div>
              <div className="addText">Add task</div>
            </div>
          </div>
          <Button type="submit" block>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default Textbox;

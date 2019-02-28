import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Textbox.css';

class Textbox extends Component {
  render() {
    return (
      <div className="Textbox">
        <Form className="textboxForm">
          <h3>How are you feeling today? </h3>

          <Form.Control as="textarea" rows="3" />
          <p>I am feeling: </p>
          <Form.Control as="select">
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="angry">Angry</option>
            <option value="anxious">Anxious</option>
            <option value="confident">Confident</option>
            <option value="nostalgic">Nostalgic</option>
          </Form.Control>
          <Button type="submit" block>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default Textbox;

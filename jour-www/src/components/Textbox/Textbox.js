import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import './Textbox.css';
import { connect } from 'react-redux';
import Task from '../Task/Task';
import Textarea from '../Textarea/Textarea';

const apiKey = process.env.REACT_APP_API_KEY;

class Textbox extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleJournalChange = this.handleJournalChange.bind(this);
    this.handleMoodChange = this.handleMoodChange.bind(this);
    this.state = {
      journal: '',
      mood: '',
      results: '',
      message: '',
    };
  }

  handleSubmit(e) {
    const { journal, mood } = this.state;

    console.log('this.props. :', this.props.authKey);

    // axios
    //   .get("https://jour.life/api/api.php", {
    //     params: {
    //       key: apiKey,
    //       request: "addJournal",
    //       uid: "2",
    //       journal,
    //       mood,
    //       authKey: "2"
    //     }
    //   })
    //   .then(result =>
    //     this.setState(
    //       {
    //         results: result.data.result,
    //         message: result.data.message
    //       },
    //       () => {
    //         // console.log('this.state.results :', this.state.results, this.state.message);
    //       }
    //     )
    //   );

    e.preventDefault();
  }

  handleJournalChange(e) {
    this.setState({ journal: e.target.value });
  }

  handleMoodChange(e) {
    this.setState({ mood: e.target.value });
  }

  render() {
    return (
      <div className="Textbox">
        <Form className="textboxForm" onSubmit={this.handleSubmit}>
          <h3>Welcome, Jane!</h3>
          <Textarea
            rows={3}
            placeholder="How are you feeling today?"
            onChange={this.handleJournalChange}
          />
          <Form.Control as="select" onChange={this.handleMoodChange}>
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

const mapStateToProps = state => ({
  authKey: state.account_info.authKey,
});

export default connect(mapStateToProps)(Textbox);

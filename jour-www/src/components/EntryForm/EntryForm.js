import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import './EntryForm.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Textarea from '../Textarea/Textarea';
import Task from '../Task/Task';

const apiKey = process.env.REACT_APP_API_KEY;

class EntryForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleJournalChange = this.handleJournalChange.bind(this);
    this.handleMoodChange = this.handleMoodChange.bind(this);
    this.state = {
      journal: props.journalInfo.journal || '',
      jid: props.journalInfo.id || '',
      mood: props.journalInfo.mood || 'happy',
      postDate: props.journalInfo.postDate || '',
      editDate: props.journalInfo.editDate || '',
      results: '',
      message: '',
      charactersRemaining: 140,
    };
  }

  handleSubmit(e) {
    const { journal, jid, mood } = this.state;
    const {
      uid, authKey, closeModal, type,
    } = this.props;

    let params;
    if (type === 'edit') {
      params = {
        key: apiKey,
        request: 'editJournal',
        uid,
        jid,
        journal,
        mood,
        authKey,
      };
    } else if (type === 'add') {
      params = {
        key: apiKey,
        request: 'addJournal',
        uid,
        journal,
        mood,
        authKey,
      };
    }

    axios
      .get('https://jour.life/api/api.php', {
        params,
      })
      .then(result => this.setState(
        {
          results: result.data.result,
          message: result.data.message,
        },
        () => {
          if (result.data.result) {
            if (type === 'edit') {
              closeModal();
            } else if (type === 'add') {
              this.props.history.push('/calendar');
            }
          }
        },
      ))
      .catch((error) => {
        console.log('error :', error);
      });

    e.preventDefault();
  }

  handleJournalChange(e) {
    this.setState({ journal: e.target.value, charactersRemaining: 140 - e.target.value.length });
  }

  handleMoodChange(e) {
    this.setState({ mood: e.target.value });
  }

  render() {
    const {
      journal, mood, jid, results, message, charactersRemaining,
    } = this.state;
    const { type } = this.props;

    return (
      <div className="EntryForm">
        <Form className="textbox-form" onSubmit={this.handleSubmit}>
          {type === 'add' ? <h3>Add Entry</h3> : ''}
          <div className="textarea-container">
            <Textarea
              rows={3}
              key={jid}
              content={journal || ''}
              onChange={this.handleJournalChange}
              placeholder="How are you feeling today?"
            />
            <div
              className={
                charactersRemaining < 0
                  ? 'small-text characters-remaining error'
                  : 'small-text characters-remaining'
              }
            >
              {charactersRemaining}
              {' '}
characters remaining
            </div>
          </div>
          <Form.Control as="select" onChange={this.handleMoodChange} defaultValue={mood}>
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="angry">Angry</option>
            <option value="anxious">Anxious</option>
            <option value="confident">Confident</option>
            <option value="nostalgic">Nostalgic</option>
          </Form.Control>

          {type === 'add' && (
            <div className="tasks">
              <h3>Tasks</h3>
              <Task title="Finish presentation script" />
              <Task title="Practice presentation" />
              <Task title="Talk to team about homework" />
              <div className="addTask small-text">
                <div className="plus">+</div>
                <div className="addText">Add task</div>
              </div>
            </div>
          )}
          {!results ? <div className="small-text error">{message}</div> : ''}

          <Button type="submit" block>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

EntryForm.propTypes = {
  type: PropTypes.string,
  journalInfo: PropTypes.object,
};

EntryForm.defaultProps = {
  type: '',
  journalInfo: {},
};

const mapStateToProps = state => ({
  uid: state.account_info.id,
  authKey: state.account_info.authKey,
});

export default withRouter(connect(mapStateToProps)(EntryForm));

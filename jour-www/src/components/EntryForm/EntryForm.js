import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import './EntryForm.css';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Textarea from '../Textarea/Textarea';
import Task from '../Task/Task';
import EmptyTask from '../Task/EmptyTask/EmptyTask';
import Tasks from '../Tasks/Tasks';

const apiKey = process.env.REACT_APP_API_KEY;

class EntryForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleJournalChange = this.handleJournalChange.bind(this);
    this.handleMoodChange = this.handleMoodChange.bind(this);
    this.handleTaskChange = this.handleTaskChange.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.state = {
      journal: props.journalInfo.journal || '',
      tasks: {},
      taskLayout: [],
      jid: props.journalInfo.id || '',
      mood: props.journalInfo.mood || 'happy',
      postDate: props.journalInfo.postDate || '',
      editDate: props.journalInfo.editDate || '',
      results: '',
      message: '',
      charactersRemaining: 140,
      deleteModal: false,
    };
  }

  handleTaskChange = (i, e) => {
    const { tasks } = this.state;
    this.setState({
      tasks: { ...tasks, [i]: e.target.value },
    });
    console.log('tasks :', tasks);
  };

  getTasks() {
    const { uid, authKey } = this.props;
    axios
      .get('https://jour.life/api/api.php', {
        params: {
          key: apiKey,
          request: 'getTasksByDate',
          uid,
          authKey,
          date: format(new Date(), 'YYYY-MM-DD'),
        },
      })
      .then(result => this.setState({
        results: result.data.result,
        message: result.data.message,
        tasks: result.data.tasks,
      }));
  }

  addPlaceholderTask = () => {
    this.setState(prev => ({
      taskLayout: [...prev.taskLayout, 'Add a task'],
    }));
  };

  toggleDeleteModal() {
    this.setState({ deleteModal: !this.state.deleteModal });
  }

  handleMoodChange(e) {
    this.setState({ mood: e.target.value });
  }

  handleJournalChange(e) {
    this.setState({ journal: e.target.value, charactersRemaining: 140 - e.target.value.length });
  }

  addTasks() {
    const { tasks } = this.state;
    if (!Object.keys(tasks).length) {
      return;
    }
    const tasksArr = Object.keys(tasks).map(t => tasks[t]);
    const { uid, authKey } = this.props;
    axios
      .get('https://jour.life/api/api.php', {
        params: {
          key: apiKey,
          request: 'addTasks',
          uid,
          authKey,
          tasks: tasksArr,
        },
      })
      .then(result => this.setState({
        results: result.data.result,
        message: result.data.message,
      }));
  }

  handleDelete() {
    const { jid } = this.state;
    const { uid, authKey, closeModal } = this.props;

    axios
      .get('https://jour.life/api/api.php', {
        params: {
          key: apiKey,
          request: 'deleteJournal',
          uid,
          authKey,
          jid,
        },
      })
      .then(result => this.setState(
        {
          results: result.data.result,
          message: result.data.message,
        },
        () => {
          if (result.data.result) {
            closeModal();
          }
        },
      ));
  }

  handleSubmit(e) {
    e.preventDefault();
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

    this.addTasks();

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
  }

  render() {
    const {
      journal,
      mood,
      jid,
      results,
      message,
      charactersRemaining,
      deleteModal,
      taskLayout,
    } = this.state;
    const { type } = this.props;

    return (
      <div className="EntryForm">
        {!deleteModal ? (
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
                <h3>Add Tasks</h3>
                {taskLayout.map((task, i) => (
                  <div id={`task-${i}`}>
                    <EmptyTask
                      placeholder={task}
                      id={i}
                      key={i}
                      onChange={this.handleTaskChange.bind(this, i)}
                      checkbox={false}
                    />
                  </div>
                ))}
                <div className="add-task small-text" onClick={this.addPlaceholderTask}>
                  <div className="plus">+</div>
                  <div className="add-text">Add a task</div>
                </div>
              </div>
              // <Tasks />
            )}
            {!results ? <div className="small-text error">{message}</div> : ''}

            <div className="confirmation-buttons">
              <Button type="submit">
                Submit
              </Button>

              {type === 'edit' && (
                <Button onClick={this.toggleDeleteModal} variant="danger" block>
                  Delete
                </Button>
              )}
            </div>
          </Form>
        ) : (
          <div className="delete-modal">
            <div>Are you sure you want to delete this entry?</div>
            <div className="confirmation-buttons">
              <Button onClick={this.handleDelete} variant="danger">
                Delete
              </Button>
              <Button onClick={this.toggleDeleteModal} variant="light">
                Cancel
              </Button>
            </div>
          </div>
        )}
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

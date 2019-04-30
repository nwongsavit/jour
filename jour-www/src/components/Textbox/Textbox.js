import React, { Component } from 'react';
import axios from 'axios';
import './Textbox.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import EntryForm from '../EntryForm/EntryForm';

const apiKey = process.env.REACT_APP_API_KEY;

class Textbox extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleJournalChange = this.handleJournalChange.bind(this);
    this.handleMoodChange = this.handleMoodChange.bind(this);
    this.state = {
      journal: '',
      mood: 'happy',
      results: '',
      message: '',
    };
  }

  handleSubmit(e) {
    const { journal, mood } = this.state;
    const { uid, authKey } = this.props;

    axios
      .get('https://jour.life/api/api.php', {
        params: {
          key: apiKey,
          request: 'addJournal',
          uid,
          journal,
          mood,
          authKey,
        },
      })
      .then(result => this.setState(
        {
          results: result.data.result,
          message: result.data.message,
        },
        () => {
          this.props.history.push('/calendar');
        },
      ))
      .catch((error) => {
        console.log('error :', error);
      });

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
        <EntryForm type="add" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  uid: state.account_info.id,
  authKey: state.account_info.authKey,
});

export default withRouter(connect(mapStateToProps)(Textbox));

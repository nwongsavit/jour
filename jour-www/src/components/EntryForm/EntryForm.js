import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import './EntryForm.css';
import { connect } from 'react-redux';
import Textarea from '../Textarea/Textarea';

const apiKey = process.env.REACT_APP_API_KEY;

class EntryForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleJournalChange = this.handleJournalChange.bind(this);
    this.state = {
      journal: props.journalInfo.journal,
      jid: props.journalInfo.id,
      mood: props.journalInfo.mood,
      postDate: props.journalInfo.postDate,
      editDate: props.journalInfo.editDate,
      results: '',
      message: '',
    };
  }

  handleSubmit(e) {
    const { journal, jid, mood } = this.state;
    const { uid, authKey, closeModal } = this.props;
    axios
      .get('https://jour.life/api/api.php', {
        params: {
          key: apiKey,
          request: 'editJournal',
          uid,
          jid,
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
          closeModal();
          console.log('this.state.results :', this.state.results);
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

  render() {
    const { journal, jid } = this.state;

    return (
      <div className="EntryForm">
        <Form className="textboxForm" onSubmit={this.handleSubmit}>
          <Textarea key={jid} content={journal} onChange={this.handleJournalChange} />
          <Button type="submit" block>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  uid: state.account_info.id,
  authKey: state.account_info.authKey,
});

export default connect(mapStateToProps)(EntryForm);

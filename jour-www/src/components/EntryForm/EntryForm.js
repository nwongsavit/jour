import React, { Component } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import './EntryForm.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Task from '../Task/Task';
import Textarea from '../Textarea/Textarea';

class EntryForm extends Component {
  handleJournalChange(e) {
    this.setState({ journal: e.target.value });
  }

  render() {
    const { show, onHide, journalInfo } = this.props;
    return (
      <div className="EntryForm">
        <Textarea
          key={journalInfo.id}
          content={journalInfo.journal}
          onChange={this.handleJournalChange}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  uid: state.account_info.id,
  authKey: state.account_info.authKey,
});

export default connect(mapStateToProps)(EntryForm);

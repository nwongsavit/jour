import React, { Component } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import './EditModal.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Task from '../Task/Task';
import Textarea from '../Textarea/Textarea';

class EditModal extends Component {
  handleJournalChange(e) {
    this.setState({ journal: e.target.value });
  }

  render() {
    const { show, onHide, journalInfo } = this.props;
    return (
      <div className="EditModal">
        <Modal show={show} onHide={onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Entry</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {' '}
            <Textarea
              key={journalInfo.id}
              content={journalInfo.journal}
              onChange={this.handleJournalChange}
            />
          </Modal.Body>
          <Modal.Footer />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  uid: state.account_info.id,
  authKey: state.account_info.authKey,
});

export default connect(mapStateToProps)(EditModal);

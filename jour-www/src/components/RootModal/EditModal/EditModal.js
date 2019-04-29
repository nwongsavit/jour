import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import './EditModal.css';
import { connect } from 'react-redux';
import EntryForm from '../../EntryForm/EntryForm';

class EditModal extends Component {
  closeModal = () => {
    this.props.dispatch({
      type: 'CLOSE_MODAL',
    });
  };

  render() {
    const { journalInfo } = this.props;

    return (
      <div className="EditModal">
        <Modal show onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EntryForm journalInfo={journalInfo} closeModal={this.closeModal} type="edit" />
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

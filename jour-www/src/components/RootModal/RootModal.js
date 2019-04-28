import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditModal from './EditModal/EditModal';

const MODAL_COMPONENTS = {
  EDIT_ENTRY: EditModal,
};

class RootModal extends Component {
  openSpecificModal() {
    const { modalType, modalProps } = this.props;
    const SpecificModal = MODAL_COMPONENTS[modalType];
    return <SpecificModal {...modalProps} />;
  }

  render() {
    const { modalType } = this.props;
    return (
      <div className="RootModal">
        {!modalType ? '' : this.openSpecificModal()}
        {/* <EditModal show={show} onHide={this.close} journalInfo={journalInfo} /> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  modalType: state.modalType,
  modalProps: state.modalProps,
});

export default connect(mapStateToProps)(RootModal);

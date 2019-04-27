import React, { Component } from 'react';
import './Entry.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EditModal from '../../EditModal/EditModal';
import Textarea from '../../Textarea/Textarea';

class Entry extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }

  toggleShow = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    const { journalInfo } = this.props;
    const { show } = this.state;
    return (
      <div className="Entry" onClick={this.toggleShow}>
        <div className="content">{journalInfo.journal}</div>
        <div className="date small-text">{journalInfo.postDate}</div>

        <EditModal show={show} onHide={this.toggleShow} journalInfo={journalInfo} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedDate: state.selectedDate,
});

Entry.propTypes = {
  journal: PropTypes.array,
};

Entry.defaultProps = {
  journal: [],
};

export default connect(mapStateToProps)(Entry);

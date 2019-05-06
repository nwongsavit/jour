import React, { Component } from 'react';
import './Entry.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Entry extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }

  open = () => {
    const { journalInfo } = this.props;
    this.props.dispatch({
      type: 'OPEN_MODAL',
      modalType: 'EDIT_ENTRY',
      modalProps: {
        journalInfo: this.props.journalInfo,
      },
    });
  };

  close = () => {
    this.setState({
      show: false,
    });
  };

  render() {
    const { journalInfo } = this.props;
    return (
      <div className="Entry" onClick={this.open}>
        <div className="content">{journalInfo.journal}</div>
        <div className="small-text">{journalInfo.postDate}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedDate: state.selectedDate,
});

Entry.propTypes = {
  journalInfo: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

Entry.defaultProps = {
  journalInfo: [],
};

export default connect(mapStateToProps)(Entry);

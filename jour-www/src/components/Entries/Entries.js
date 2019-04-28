import React, { Component } from 'react';
import './Entries.css';
import { connect } from 'react-redux';
import axios from 'axios';
import { format } from 'date-fns';
import Entry from './Entry/Entry';

const apiKey = process.env.REACT_APP_API_KEY;
class Entries extends Component {
  constructor() {
    super();
    this.state = {
      currentMonth: new Date(),
    };
  }

  renderJournalEntries() {
    const { journalInfo } = this.props;
    if (journalInfo[0].id) {
      return journalInfo.map(journal => <Entry journalInfo={journal} key={journal.id} />);
    }
  }

  render() {
    const { journalInfo } = this.props;
    return (
      <div className="Entries">
        {journalInfo && journalInfo.length && this.renderJournalEntries()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedDate: state.selectedDate,
});

export default connect(mapStateToProps)(Entries);

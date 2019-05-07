import React, { Component } from 'react';
import './Entries.css';
import { connect } from 'react-redux';
import Entry from './Entry/Entry';

class Entries extends Component {
  renderJournalEntries() {
    const { journalInfo } = this.props;
    if (journalInfo && journalInfo.length && journalInfo[0].id) {
      return journalInfo.map(journal => <Entry journalInfo={journal} key={journal.id} />);
    }
    return <div>No entries</div>;
  }

  render() {
    const { journalInfo } = this.props;
    return (
      <div className="Entries">
        <h3>Entries</h3>
        {this.renderJournalEntries()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedDate: state.selectedDate,
});

export default connect(mapStateToProps)(Entries);

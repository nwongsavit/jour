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
      journalInfo: {},
      results: '',
      message: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.selectedDate !== this.props.selectedDate
      || prevProps.modalType !== this.props.modalType
    ) this.getJournalEntries();
  }

  componentDidMount() {
    this.getJournalEntries();
  }

  getJournalEntries() {
    const { currentMonth } = this.state;
    const { uid, authKey, selectedDate } = this.props;
    axios
      .get('https://jour.life/api/api.php', {
        params: {
          key: apiKey,
          request: 'getJournalsByDate',
          uid,
          authKey,
          date: format(new Date(selectedDate), 'YYYY-MM-DD'),
        },
      })
      .then(result => this.setState({
        results: result.data.result,
        message: result.data.message,
        journalInfo: result.data.journals,
      }));
  }

  renderJournalEntries() {
    const { journalInfo } = this.state;
    if (journalInfo[0].id) {
      return journalInfo.map(journal => <Entry journalInfo={journal} key={journal.id} />);
    }
  }

  render() {
    const { journalInfo } = this.state;
    return (
      <div className="Entries">
        {journalInfo && journalInfo.length && this.renderJournalEntries()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  uid: state.account_info.id,
  authKey: state.account_info.authKey,
  selectedDate: state.selectedDate,
  modalType: state.modalType,
});

export default connect(mapStateToProps)(Entries);

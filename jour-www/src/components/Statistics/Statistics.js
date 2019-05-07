import React, { Component } from 'react';
import './Statistics.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import {
  HorizontalGridLines,
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  VerticalBarSeries,
  RadialChart,
} from 'react-vis';
import {
  format, addDays, startOfWeek, endOfWeek,
} from 'date-fns';
import ViewSelector from '../Calendar/ViewSelector/ViewSelector';

const apiKey = process.env.REACT_APP_API_KEY;
class Statistics extends Component {
  constructor() {
    super();
    this.state = {
      selectedWeek: new Date(),
      journalInfo: [],
      moodCount: {
        angry: 0,
        anxious: 0,
        confident: 0,
        happy: 0,
        nostalgic: 0,
        sad: 0,
      },
      moodData: [],
      result: '',
      message: '',
      value: false,
    };
  }

  componentWillMount() {
    document.title = "Jour - Statistics";
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      this.props.history.push('/login');
    }
  }

  componentDidMount() {
    this.getJournalEntriesByWeek();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedWeek !== this.state.selectedWeek) this.getJournalEntriesByWeek();
  }

  getJournalEntriesByWeek() {
    this.setState({
      moodCount: {
        angry: 0,
        anxious: 0,
        confident: 0,
        happy: 0,
        nostalgic: 0,
        sad: 0,
      },
      moodData: [],
    });
    const { selectedWeek } = this.state;
    const { uid, authKey } = this.props;
    axios
      .get('https://jour.life/api/api.php', {
        params: {
          key: apiKey,
          request: 'getJournalsByYearWeek',
          uid,
          authKey,
          date: format(new Date(selectedWeek), 'YYYY-MM-DD'),
        },
      })
      .then(result => this.setState(
        {
          results: result.data.result,
          message: result.data.message,
          journalInfo: result.data.journals,
        },
        () => {
          this.sortByMood();
        },
      ));
  }

  sortByMood = () => {
    const { journalInfo, moodCount } = this.state;
    if (!journalInfo) {
      return;
    }

    journalInfo.forEach((journal) => {
      moodCount[journal.mood] += 1;
    });

    let data = Object.assign(
      Object.entries(moodCount).map(([key, value]) => ({ subLabel: key, angle: value })),
    );

    data = data.filter(d => d.angle !== 0);
    this.setState({
      moodData: data,
    });
  };

  previousWeek = () => {
    const { selectedWeek } = this.state;
    let newDate = addDays(selectedWeek, -7);
    newDate = startOfWeek(newDate);
    this.setState({
      selectedWeek: newDate,
    });
  };

  nextWeek = () => {
    const { selectedWeek } = this.state;
    let newDate = addDays(selectedWeek, 7);
    newDate = startOfWeek(newDate);
    this.setState({
      selectedWeek: newDate,
    });
  };

  getTitle = () => {
    const { selectedWeek } = this.state;
    const start = format(startOfWeek(selectedWeek), 'MMMM DD, YYYY');
    const end = format(endOfWeek(selectedWeek), 'MMMM DD, YYYY');

    return `${start} - ${end}`;
  };

  render() {
    const barSeriesStyle = { fill: 'inherit', stroke: 'inherit' };

    const { moodData, moodCount } = this.state;

    const myData = [{ angle: 1 }, { angle: 5 }, { angle: 2 }];

    return (
      <div className="Statistics">
        <ViewSelector
          leftArrowHandler={this.previousWeek}
          rightArrowHandler={this.nextWeek}
          title={this.getTitle()}
          picker={false}
        />
        {/* <FlexibleWidthXYPlot className="pageVisitorsChart" xType="ordinal" height={300} stackBy="y">
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <VerticalBarSeries className="paidPageVisitors" style={barSeriesStyle} data={moodData} />
        </FlexibleWidthXYPlot> */}
        <h3>Mood</h3>
        <RadialChart
          data={moodData}
          radius={140}
          padAngle={0.04}
          width={300}
          height={300}
          innerRadius={100}
          showLabels
          onValueMouseOver={v => this.setState({ value: v })}
          onSeriesMouseOut={v => this.setState({ value: false })}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedDate: state.selectedDate,
  uid: state.account_info.id,
  authKey: state.account_info.authKey,
  isLoggedIn: state.isLoggedIn,
});

export default withRouter(connect(mapStateToProps)(Statistics));
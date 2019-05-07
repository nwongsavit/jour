import React, { Component } from 'react';
import './Statistics.css';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
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
      Object.entries(moodCount).map(([key, value]) => ({ name: key, value })),
    );

    data = data.filter(d => d.value !== 0);
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

    const { moodData, moodCount, value } = this.state;

    const data = [
      {
        name: 'Page A',
        uv: 4000,
        amt: 2400,
      },
      {
        name: 'Page B',
        uv: 3000,
        amt: 2210,
      },
      {
        name: 'Page C',
        uv: 2000,
        amt: 2290,
      },
      {
        name: 'Page D',
        uv: 2780,
        amt: 2000,
      },
      {
        name: 'Page E',
        uv: 1890,
        amt: 2181,
      },
      {
        name: 'Page F',
        uv: 2390,
        amt: 2500,
      },
      {
        name: 'Page G',
        uv: 3490,
        amt: 2100,
      },
    ];
    const tipStyle = {
      display: 'flex',
      color: '#fff',
      background: '#000',
      alignItems: 'center',
      padding: '5px',
    };
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
        <div className="charts">
          <div className="chart1">
            <ResponsiveContainer height={400} width="100%">
              <PieChart>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={moodData}
                  cx="50%"
                  cy="50%"
                  fill="#8884d8"
                  label
                >
                  {moodData.map((entry, index) => (
                    <Cell fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="chart2">
            <ResponsiveContainer height={400} width="100%">
              <PieChart>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={moodData}
                  cx="50%"
                  cy="50%"
                  fill="#8884d8"
                  label
                >
                  {moodData.map((entry, index) => (
                    <Cell fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="chart3">
            <ResponsiveContainer height={400} width="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedDate: state.selectedDate,
  uid: state.account_info.id,
  authKey: state.account_info.authKey,
});

export default connect(mapStateToProps)(Statistics);

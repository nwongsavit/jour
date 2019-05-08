import React, { Component } from 'react';
import './Statistics.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
  BarChart,
  Bar,
} from 'recharts';
import {
  format, addDays, startOfWeek, endOfWeek,
} from 'date-fns';
import { ButtonGroup, Button } from 'react-bootstrap';
import ViewSelector from '../Calendar/ViewSelector/ViewSelector';
import Counter from './Counter/Counter';

const apiKey = process.env.REACT_APP_API_KEY;
function formatPieChartData(data) {
  const formattedData = Object.assign(
    Object.entries(data).map(([key, value]) => ({
      name: value.mood.charAt(0).toUpperCase() + value.mood.slice(1),
      value: value['count(*)'],
    })),
  );
  console.log('formattedData :', formattedData);
  return formattedData;
}
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
      allTimeStats: [],
      stats: [],
      result: '',
      message: '',
      value: false,
      day: false,
      week: true,
      allTime: false,
      journalCount: 0,
      tasksCompletedCount: 0,
      tasksCount: 0,
    };
  }

  componentWillMount() {
    document.title = 'Jour - Statistics';
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
    if (prevState.allTime !== this.state.allTime) this.getStatsAllTime();
  }

  getStatsAllTime() {
    const { uid, authKey } = this.props;
    axios
      .get('https://jour.life/api/api.php', {
        params: {
          key: apiKey,
          request: 'getStatsAllTime',
          uid,
          authKey,
        },
      })
      .then(result => this.setState(
        {
          results: result.data.result,
          message: result.data.message,
          allTimeStats: result.data.stats,
          journalCount: result.data.stats.journals
            ? result.data.stats.journals[0]['count(*)']
            : 0,
          tasksCompletedCount: result.data.stats.tasks ? result.data.stats.tasks[0].completed : 0,
          tasksCount: result.data.stats.tasks ? result.data.stats.tasks[0]['count(*)'] : 0,
          moodData: result.data.stats.moods ? formatPieChartData(result.data.stats.moods) : [],
        },
        () => {
          console.log('this.state.allTimeStats :', this.state.allTimeStats);
        },
      ));
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
    const {
      moodData,
      moodCount,
      allTime,
      allTimeStats,
      journalCount,
      tasksCompletedCount,
      tasksCount,
      day,
      week,
    } = this.state;

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
        <div className="statistics-header">
          <h3>Statistics</h3>
          {week && (
            <div className="view">
              <ViewSelector
                leftArrowHandler={this.previousWeek}
                rightArrowHandler={this.nextWeek}
                title={this.getTitle()}
                picker={false}
              />
            </div>
          )}
          <ButtonGroup>
            <Button
              variant="light"
              size="sm"
              onClick={() => {
                this.setState({ day: true, week: false, allTime: false });
              }}
              className={day ? 'active-button' : ''}
            >
              Day
            </Button>
            <Button
              variant="light"
              size="sm"
              onClick={() => {
                this.setState({ day: false, week: true, allTime: false });
              }}
              className={week ? 'active-button' : ''}
            >
              Week
            </Button>
            <Button
              variant="light"
              size="sm"
              onClick={() => {
                this.setState({ day: false, week: false, allTime: true });
              }}
              className={allTime ? 'active-button' : ''}
            >
              All Time
            </Button>
          </ButtonGroup>
        </div>

        <div className="counters">
          <Counter number={journalCount} item="Journals" />
          <Counter number={tasksCompletedCount} item="Tasks Completed" />
          <Counter number={tasksCount} item="Tasks" />
        </div>
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

        <div className="charts">
          {/* <div className="chart1">
            <h3>Moods by Charts</h3>
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
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="uv" fill="#82ca9d">
                  {data.map((entry, index) => (
                    <Cell fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart3">
            <ResponsiveContainer height={300} width="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div> */}
        </div>
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

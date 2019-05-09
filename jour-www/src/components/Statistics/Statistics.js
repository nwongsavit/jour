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
      weekStats: [],
      stats: [],
      result: '',
      message: '',
      value: false,
      day: false,
      week: true,
      allTime: false,
      journalCount: 0,
      journalsDateCount: 0,
      tasksDateCount: 0,
      tasksCompletedCount: 0,
      tasksUncompletedCount: 0,
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
    this.getStatsWeek();
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedWeek, allTime, week } = this.state;
    if (prevState.selectedWeek !== selectedWeek) this.getStatsWeek();
    // if (prevState.allTime !== allTime && allTime) this.getStatsAllTime();
    if (prevState.week !== week && week) this.getStatsWeek();
  }

  getStatsWeek() {
    const { selectedWeek } = this.state;
    const { uid, authKey } = this.props;
    axios
      .get('https://jour.life/api/api.php', {
        params: {
          key: apiKey,
          request: 'getStatsByYearWeek',
          uid,
          authKey,
          date: new Date(selectedWeek),
        },
      })
      .then(result => this.setState(
        {
          results: result.data.result,
          message: result.data.message,
          weekStats: result.data.stats,
          journalCount: result.data.stats.journals
            ? result.data.stats.journals[0]['count(*)']
            : 0,
          tasksCompletedCount:
              result.data.stats.tasks && result.data.stats.tasks[1] !== undefined
                ? result.data.stats.tasks[1]['count(*)']
                : 0,
          tasksUncompletedCount: result.data.stats.tasks
            ? result.data.stats.tasks[0]['count(*)']
            : 0,
          moodData: result.data.stats.moods
            ? formatPieChartData(result.data.stats.moods)
            : [{ name: 'No data', value: 1 }],
        },
        () => {
          this.getJournalEntriesByWeek();
          this.getTasksByWeek();
        },
      ));
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
          tasksCompletedCount:
              result.data.stats.tasks && result.data.stats.tasks !== undefined
                ? result.data.stats.tasks[1]['count(*)']
                : 0,
          tasksUncompletedCount: result.data.stats.tasks
            ? result.data.stats.tasks[0]['count(*)']
            : 0,
          moodData: result.data.stats.moods ? formatPieChartData(result.data.stats.moods) : [],
        },
        () => {},
      ));
  }

  getTasksByWeek() {
    const { selectedWeek } = this.state;
    const { uid, authKey } = this.props;
    axios
      .get('https://jour.life/api/api.php', {
        params: {
          key: apiKey,
          request: 'getTasksByYearWeek',
          uid,
          authKey,
          date: format(new Date(selectedWeek), 'YYYY-MM-DD'),
        },
      })
      .then(result => this.setState({
        results: result.data.result,
        message: result.data.message,
        tasksDateCount: this.sortByDate(result.data.tasks, 'task_date'),
      }));
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
          journalsDateCount: this.sortByDate(result.data.journals, 'postDate'),
        },
        () => {},
      ));
  }

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

  formatLineGraphData(data1, data2) {
    const { selectedWeek } = this.state;
    const formattedData = [];
    for (
      let day = startOfWeek(selectedWeek);
      day < endOfWeek(selectedWeek);
      day = addDays(day, 1)
    ) {
      const obj = {
        name: format(day, 'MM/DD'),
        Journals: data1[format(day, 'YYYY-MM-DD')],
        Tasks: data2[format(day, 'YYYY-MM-DD')],
      };
      formattedData.push(obj);
    }
    return formattedData;
  }

  sortByDate(data, dateKey) {
    const { selectedWeek } = this.state;
    const sorted = {};
    for (
      let day = startOfWeek(selectedWeek);
      day < endOfWeek(selectedWeek);
      day = addDays(day, 1)
    ) {
      if (!data || !data.length || data === 'undefined') {
        sorted[format(day, 'YYYY-MM-DD')] = 0;
      } else {
        const days = data.filter(d => d[dateKey].slice(0, 10) === format(day, 'YYYY-MM-DD'));
        sorted[format(day, 'YYYY-MM-DD')] = days.length;
      }
    }

    return sorted;
  }

  render() {
    const {
      moodData,
      moodCount,
      allTime,
      allTimeStats,
      journalCount,
      tasksCompletedCount,
      tasksUncompletedCount,
      journalsDateCount,
      tasksDateCount,
      day,
      week,
    } = this.state;

    const lineGraphData = this.formatLineGraphData(journalsDateCount, tasksDateCount);

    const MOOD_COLORS = {
      Happy: '#0088FE',
      Angry: '#00C49F',
      Anxious: '#FFBB28',
      Sad: '#FF8042',
      Confident: '#ed424a',
      Nostalgic: '#a64adb',
    };
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#000'];

    return (
      <div className="Statistics">
        <div className="statistics-header">
          <h3>Statistics</h3>

          {/* <ButtonGroup>
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
          </ButtonGroup> */}
        </div>

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

        <div className="stats">
          <div className="counters">
            <Counter number={journalCount} item="Entries" icon="book" />
            <Counter
              number={`${tasksCompletedCount}/${tasksCompletedCount + tasksUncompletedCount}`}
              item="Tasks Done"
              icon="check-circle"
            />
            <Counter
              number={tasksCompletedCount + tasksUncompletedCount}
              item="Tasks"
              icon="clipboard"
            />
          </div>
          <div className="small-text charts">
            <div className="line-chart">
              <h5># of Entries and Tasks</h5>
              <ResponsiveContainer height={300} width="100%">
                <LineChart data={lineGraphData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Journals" stroke="#00C49F" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="Tasks" stroke="#0088FE" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="pie-chart">
              <h5>Distribution of Moods</h5>
              <ResponsiveContainer height={300} width="100%">
                <PieChart>
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={moodData}
                    fill="#8884d8"
                    label={!!(moodData.length !== 0 && moodData[0].name !== 'No data')}
                  >
                    {moodData.map(entry => (
                      <Cell fill={MOOD_COLORS[entry.name]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* <div className="bar-chart">
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
            </div> */}
          </div>
        </div>

        {/* <div className="charts"> */}
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
        {/* </div> */}
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

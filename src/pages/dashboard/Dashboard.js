/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, useTheme } from '@mui/material';
import {
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { isEmpty } from 'underscore';
import Dot from '../../components/Dot/Dot';
import DashboardTableComponent from './components/DashboardTable';
import Widget from '../../components/Widget/Widget';
import PageTitle from '../../components/PageTitle/PageTitle';
import useStyles from './styles';
import * as standingActions from '../../core/standing/standingActions';
import * as scheduleActions from '../../core/schedule/scheduleActions';

function Dashboard() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const standing = useSelector((state) => state.standing);
  const schedule = useSelector((state) => state.schedule);
  const { currentDriverStandings, currentConstructorStandings } = standing;
  const { recentRaceSchedule } = schedule;
  const [topDriversPieChartData, setTopDriversPieChartData] = useState([]);
  const [topConstructorsPieChartData, setTopConstructorsPieChartData] = useState([]);
  const [statsData, setStatsData] = useState([]);
  const [raceScheduleData, setRaceScheduleData] = useState([]);
  const CardData = [
    { name: 'Top Drivers', data: topDriversPieChartData },
    { name: 'Top Constructors', data: topConstructorsPieChartData },
  ];

  const getDriverStandingsListsFromData = ({ data }, type) => {
    let standingsLists = [];
    if (type === 'driverStandings') {
      standingsLists = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    } else if (type === 'constructorStandings') {
      standingsLists = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    }
    return standingsLists;
  };

  const colors = ['primary', 'secondary', 'success', 'warning', 'info'];

  const convertStandingsToPieChartData = (standings, type) => {
    const pieChartData = [];
    // For top 5
    for (let i = 0; i < 5; i++) {
      const item = standings[i];
      const color = colors[i];
      const pieChartItem = {
        name:
          type === 'driverStandings'
            ? `${item.Driver.givenName} ${item.Driver.familyName}`
            : item.Constructor.name,
        value: Number(item.points),
        color,
      };
      pieChartData.push(pieChartItem);
    }
    return pieChartData;
  };

  const convertRaceListToTableData = (data) => {
    const raceList = data.Races || [];
    const tableData = [];
    for (let i = 0; i < raceList.length; i++) {
      const row = {
        id: i,
        round: raceList[i].round,
        name: raceList[i].raceName,
        locality: raceList[i].Circuit.Location.locality,
        country: raceList[i].Circuit.Location.country,
        date: raceList[i].date,
        hour: raceList[i].time,
        status: raceList[i].date > new Date() ? 'Upcoming' : 'Completed',
      };
      tableData.push(row);
    }
    return tableData;
  };

  const fetchPieChartData = () => {
    if (
      !isEmpty(currentDriverStandings)
      && !isEmpty(currentConstructorStandings)
    ) {
      const driverStandings = getDriverStandingsListsFromData(
        currentDriverStandings,
        'driverStandings',
      );
      const constructorStandings = getDriverStandingsListsFromData(
        currentConstructorStandings,
        'constructorStandings',
      );

      const driversPieChartData = convertStandingsToPieChartData(
        driverStandings,
        'driverStandings',
      );
      const constructorsPieChartData = convertStandingsToPieChartData(
        constructorStandings,
        'constructorStandings',
      );
      setTopDriversPieChartData(driversPieChartData);
      setTopConstructorsPieChartData(constructorsPieChartData);
    }
  };

  const renderPieCard = (item) => (
    <Grid
      key={`pie-card-item-${item.name}`}
      item
      lg={3}
      md={4}
      sm={6}
      xs={12}
    >
      <Widget
        title={item.name}
        upperTitle
        disableWidgetMenu
        className={classes.card}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ResponsiveContainer width="100%" height={144}>
              <PieChart>
                <Pie
                  data={item.data}
                  innerRadius={30}
                  outerRadius={40}
                  dataKey="value"
                >
                  {item.data.map((entry) => (
                    <Cell
                      key={`cell-${entry}`}
                      fill={theme.palette[entry.color].main}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.pieChartLegendWrapper}>
              {item.data.map(({ name, value, color }) => (
                <div key={color} className={classes.legendItemContainer}>
                  <Dot color={color} />
                  <Typography style={{ whiteSpace: 'nowrap', fontSize: 12 }}>
                    &nbsp;
                    {name}
                    &nbsp;
                  </Typography>
                  <Typography color="text" colorbrightness="secondary">
                    &nbsp;
                    {value}
                  </Typography>
                </div>
              ))}
            </div>
          </Grid>
        </Grid>
      </Widget>
    </Grid>
  );

  const fetchStats = () => {
    const totalWins = currentDriverStandings.data.MRData
      .StandingsTable.StandingsLists[0].DriverStandings.reduce(
        (acc, cur) => acc + Number(cur.wins),
        0,
      );
    const totalPoints = currentDriverStandings.data.MRData
      .StandingsTable.StandingsLists[0].DriverStandings.reduce(
        (acc, cur) => acc + Number(cur.points),
        0,
      );
    const totalDrivers = currentDriverStandings.data.MRData.StandingsTable.StandingsLists[0]
      .DriverStandings.length;
    const totalConstructors = currentConstructorStandings.data
      .MRData.StandingsTable.StandingsLists[0]
      .ConstructorStandings.length;

    const data = [
      {
        title: 'Wins',
        data: [
          { name: 'Total Points', value: totalPoints },
          { name: 'Wins', value: totalWins },
        ],
      },
      {
        title: 'Participants',
        data: [
          { name: 'Constructors', value: totalConstructors },
          { name: 'Drivers', value: totalDrivers },
        ],
      },
    ];
    setStatsData(data);
  };

  const renderStatsCard = (item, index) => (
    <Grid
      key={`stats-item-${index}`}
      item
      lg={3}
      md={4}
      sm={6}
      xs={12}
    >
      <Widget
        title={item.title}
        upperTitle
        disableWidgetMenu
        className={classes.card}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography size="xl" weight="medium">
              {item.data[0].value}
            </Typography>
            <Typography color="text" colorbrightness="secondary">
              {item.data[0].name}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography size="xl" weight="medium">
              {item.data[1].value}
            </Typography>
            <Typography color="text" colorbrightness="secondary">
              {item.data[1].name}
            </Typography>
          </Grid>
        </Grid>
      </Widget>
    </Grid>
  );

  const fetchTableData = () => {
    const tableData = convertRaceListToTableData(recentRaceSchedule);
    setRaceScheduleData(tableData);
  };

  useEffect(() => {
    if (
      isEmpty(currentDriverStandings)
      || isEmpty(currentConstructorStandings || isEmpty(recentRaceSchedule))
    ) {
      dispatch(standingActions.getCurrentDriverStandingsRequest());
      dispatch(standingActions.getCurrentConstructorStandingsRequest());
      dispatch(scheduleActions.getMostRecentRaceScheduleRequest());
    }
  }, []);

  // had to use delay timer as a quick hack for state update delay issues
  useEffect(() => {
    setTimeout(() => {
      fetchPieChartData();
      fetchStats();
    }, 1000);
  }, [currentDriverStandings]);

  useEffect(() => {
    setTimeout(() => {
      fetchTableData();
    }, 1000);
  }, [recentRaceSchedule]);

  return (
    <div className={classes.body}>
      <PageTitle title="Dashboard" />
      <Grid container spacing={4}>
        {CardData.map(renderPieCard)}
        {statsData.map((item, index) => renderStatsCard(item, index))}
        {raceScheduleData.length > 0 ? (
          <Grid item xs={12}>
            <Widget
              title="Race Schedule"
              upperTitle
              noBodyPadding
              disableWidgetMenu
              bodyClass={classes.tableWidget}
            >
              <DashboardTableComponent data={raceScheduleData} />
            </Widget>
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
}
export default Dashboard;

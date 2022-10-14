/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import {
  Grid, Typography, Box, Button, useTheme,
} from '@mui/material';
import { SportsMotorsports } from '@mui/icons-material';
import {
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { isEmpty } from 'underscore';
import DriverTableComponent from './components/DriverTable';
import Dot from '../../components/Dot/Dot';
import Widget from '../../components/Widget/Widget';
import PageTitle from '../../components/PageTitle/PageTitle';
import useStyles from './styles';
import * as driverActions from '../../core/driver/driverActions';
import * as seasonActions from '../../core/season/seasonActions';
import * as standingActions from '../../core/standing/standingActions';
import * as resultActions from '../../core/result/resultActions';

// Dummy data: due to technical issues
const PositionsPieChartData = [
  { name: 'First', value: 40, color: 'primary' },
  { name: 'Second', value: 30, color: 'secondary' },
  { name: 'Third', value: 20, color: 'warning' },
  { name: 'Fifth', value: 20, color: 'success' },
];

function Drivers() {
  const dispatch = useDispatch();
  const location = useLocation();
  const classes = useStyles();
  const theme = useTheme();
  const drivers = useSelector((state) => state.drivers);
  const seasons = useSelector((state) => state.seasons);
  const standing = useSelector((state) => state.standing);
  const results = useSelector((state) => state.results);
  const { seasonsList } = seasons;
  const { selectedDriver } = drivers;
  const { selectedDriverStandings } = standing;
  const { raceResults } = results;
  const [driverInfo, setDriverInfo] = useState([]);
  const [driverSeasons, setDriverSeasons] = useState([]);
  const [driverStats, setDriverStats] = useState([]);
  const [driverRaceResults, setDriverRaceResults] = useState([]);

  const fetchDriverInfo = () => {
    if (selectedDriver.length > 0) {
      setDriverInfo(selectedDriver[0]);
    } else {
      setDriverInfo(selectedDriver);
    }
  };

  const fetchDriverSeasons = () => {
    if (!isEmpty(seasonsList)) {
      setDriverSeasons(seasonsList.Seasons);
    }
  };

  const fetchDriverStats = () => {
    if (selectedDriverStandings.data?.MRData?.StandingsTable?.StandingsLists.length > 0) {
      const stats = selectedDriverStandings.data?.MRData?.StandingsTable?.StandingsLists;
      const driverStatsList = [];
      stats?.forEach((stat) => {
        stat.DriverStandings.forEach((driver) => {
          const driverStat = {
            season: stat?.season,
            position: driver?.position,
            points: Number(driver?.points),
            wins: Number(driver?.wins),
          };
          driverStatsList.push(driverStat);
        });
      });

      const totalPoints = driverStatsList.reduce((a, b) => a + (b.points || 0), 0);
      const totalWins = driverStatsList.reduce((a, b) => a + (b.wins || 0), 0);
      const totalPodiums = driverStatsList.reduce(
        (a, b) => a + (b.position <= 3 ? 1 : 0),
        0,
      );

      const totalStats = {
        season: '2022',
        points: totalPoints,
        wins: totalWins,
        podiums: totalPodiums,
      };
      setDriverStats(totalStats);
    }
  };

  const convertToTableData = (data) => {
    const tableData = [];
    for (let i = 0; i < data.length; i++) {
      const row = {
        id: i,
        circuit: data[i].Circuit.circuitName,
        grid: data[i].Results[0].grid,
        position: data[i].Results[0].position,
        points: data[i].Results[0].points,
        laps: data[i].Results[0].laps,
        time: data[i].Results[0].FastestLap.Time.time,
        status: data[i].Results[0].status,
      };
      tableData.push(row);
    }
    setDriverRaceResults(tableData);
  };

  const fetchDriverResults = () => {
    const raceList = raceResults.Races || [];
    if (raceList.length > 0) {
      convertToTableData(raceList);
    }
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  const renderInfo = (item) => (
    <Grid item lg={3} md={4} sm={6} xs={12}>
      <Widget
        title="Info"
        upperTitle
        disableWidgetMenu
        className={classes.card}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box component="div" sx={{ width: 100, height: 100 }}>
              <SportsMotorsports sx={{ width: 100, height: 100 }} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.infoWrapper}>
              <Typography color="text" colorbrightness="secondary" align="left">
                &nbsp;
                {item.givenName}
                &nbsp;
              </Typography>
              <Typography color="text" colorbrightness="secondary" align="left">
                &nbsp;
                {item.familyName}
                &nbsp;
              </Typography>
              <Typography color="text" colorbrightness="secondary" align="left">
                &nbsp;
                {item.nationality}
                &nbsp;
              </Typography>
              <Button
                onClick={() => openInNewTab(item.url)}
                variant="text"
                color="primary"
                align="left"
                sx={{
                  height: 40,
                  marginTop: 2,
                }}
              >
                &nbsp; Biography &nbsp;
              </Button>
            </div>
          </Grid>
        </Grid>
      </Widget>
    </Grid>
  );

  const renderPieCard = () => (
    <Grid item lg={3} md={4} sm={6} xs={12}>
      <Widget
        title="Positions"
        upperTitle
        disableWidgetMenu
        className={classes.card}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ResponsiveContainer width="100%" height={144}>
              <PieChart>
                <Pie
                  data={PositionsPieChartData}
                  innerRadius={30}
                  outerRadius={40}
                  dataKey="value"
                >
                  {PositionsPieChartData.map((entry) => (
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
              {PositionsPieChartData.map(({ name, value, color }) => (
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

  const renderStatsCard = (item) => (
    <Grid item lg={3} md={4} sm={6} xs={12}>
      <Widget
        title="Stats"
        upperTitle
        disableWidgetMenu
        className={classes.card}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className={classes.statsWrapper}>
              <Typography color="text" colorbrightness="secondary" align="left">
                &nbsp; Wins &nbsp;
              </Typography>
              <Typography color="text" colorbrightness="secondary" align="left">
                &nbsp; Podiums &nbsp;
              </Typography>
              <Typography color="text" colorbrightness="secondary" align="left">
                &nbsp; Points &nbsp;
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.statsWrapper}>
              <Typography color="text" colorbrightness="secondary" align="left">
                &nbsp;
                {item.wins}
                &nbsp;
              </Typography>
              <Typography color="text" colorbrightness="secondary" align="left">
                &nbsp;
                {item.podiums}
                &nbsp;
              </Typography>
              <Typography color="text" colorbrightness="secondary" align="left">
                &nbsp;
                {item.points}
                &nbsp;
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Widget>
    </Grid>
  );

  const renderSeasonsCard = () => (
    <Grid item lg={3} md={4} sm={6} xs={12}>
      <Widget
        title="Seasons"
        upperTitle
        disableWidgetMenu
        className={classes.card}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className={classes.statsWrapper}>
              {driverSeasons.map((item) => (
                <Typography
                  color="text"
                  colorbrightness="secondary"
                  align="left"
                >
                  &nbsp;
                  {item.season}
                  &nbsp;
                </Typography>
              ))}
            </div>
          </Grid>
        </Grid>
      </Widget>
    </Grid>
  );

  useEffect(() => {
    if (isEmpty(selectedDriver)) {
      dispatch(driverActions.getSelectedDriverRequest({ id: location.state.driver.driverId }));
    }
    dispatch(seasonActions.getSeasonRequest({ appendURL: `drivers/${location.state.driver.driverId}` }));
    dispatch(
      standingActions.getSelectedDriverStandingRequest({
        driverId: `${location.state.driver.driverId}`,
      }),
    );
    dispatch(resultActions.getRaceResultRequest({ appendURL: `drivers/${location.state.driver.driverId}` }));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fetchDriverInfo();
      fetchDriverSeasons();
      fetchDriverStats();
      fetchDriverResults();
    }, 1000);
  }, [selectedDriver, seasonsList, selectedDriverStandings, raceResults]);

  return (
    <div className={classes.body}>
      <PageTitle title="Driver" />
      <Grid container spacing={4}>
        {renderInfo(driverInfo)}
        {renderStatsCard(driverStats)}
        {renderPieCard()}
        {renderSeasonsCard()}
        {driverRaceResults.length > 0 ? (
          <Grid item xs={12}>
            <Widget
              title="Results"
              upperTitle
              noBodyPadding
              disableWidgetMenu
              bodyClass={classes.tableWidget}
            >
              <DriverTableComponent data={driverRaceResults} />
            </Widget>
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
}

export default Drivers;

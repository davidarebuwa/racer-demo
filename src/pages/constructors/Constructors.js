/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import {
  Grid, Typography, Box, Button, useTheme,
} from '@mui/material';
import { DirectionsCarFilled } from '@mui/icons-material';
import { isEmpty } from 'underscore';
import {
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import ConstructorTableComponent from './components/ConstructorsTable';
import Dot from '../../components/Dot/Dot';
import Widget from '../../components/Widget/Widget';
import PageTitle from '../../components/PageTitle/PageTitle';
import useStyles from './styles';
import * as constructorActions from '../../core/constructor/constructorActions';
import * as seasonActions from '../../core/season/seasonActions';
import * as standingActions from '../../core/standing/standingActions';
import * as resultActions from '../../core/result/resultActions';

// Dummy data: due to technical issues
const PieChartData = [
  { name: 'First', value: 400, color: 'primary' },
  { name: 'Third', value: 300, color: 'secondary' },
  { name: 'Fourth', value: 300, color: 'warning' },
  { name: 'Fifth', value: 200, color: 'success' },
];

function Constructors() {
  const dispatch = useDispatch();
  const location = useLocation();
  const constructors = useSelector((state) => state.constructors);
  const seasons = useSelector((state) => state.seasons);
  const standing = useSelector((state) => state.standing);
  const results = useSelector((state) => state.results);
  const { seasonsList } = seasons;
  const { selectedConstructor } = constructors;
  const { selectedConstructorStandings } = standing;
  const { raceResults } = results;
  const [constructorInfo, setConstructorInfo] = useState([]);
  const [constructorSeasons, setConstructorSeasons] = useState([]);
  const [constructorStats, setConstructorStats] = useState([]);
  const [constructorRaceResults, setConstructorRaceResults] = useState([]);
  const classes = useStyles();
  const theme = useTheme();

  const fetchConstructorInfo = () => {
    if (selectedConstructor.length > 0) {
      setConstructorInfo(selectedConstructor[0]);
    } else {
      setConstructorInfo(selectedConstructor);
    }
  };

  const fetchConstructorSeasons = () => {
    if (!isEmpty(seasonsList)) {
      setConstructorSeasons(seasonsList.Seasons);
    }
  };

  const fetchConstructorStats = () => {
    if (
      selectedConstructorStandings.data?.MRData?.StandingsTable?.StandingsLists
        .length > 0
    ) {
      const stats = selectedConstructorStandings.data?.MRData?.StandingsTable?.StandingsLists;
      const constructorStatsList = [];
      stats?.forEach((stat) => {
        stat.ConstructorStandings.forEach((constructor) => {
          const constructorStat = {
            season: stat?.season,
            position: constructor?.position,
            points: Number(constructor?.points),
            wins: Number(constructor?.wins),
          };
          constructorStatsList.push(constructorStat);
        });
      });

      const totalPoints = constructorStatsList.reduce(
        (a, b) => a + (b.points || 0),
        0,
      );
      const totalWins = constructorStatsList.reduce((a, b) => a + (b.wins || 0), 0);
      const totalPodiums = constructorStatsList.reduce(
        (a, b) => a + (b.position <= 3 ? 1 : 0),
        0,
      );

      const totalStats = {
        season: '2022',
        points: totalPoints,
        wins: totalWins,
        podiums: totalPodiums,
      };
      setConstructorStats(totalStats);
    }
  };

  const convertToTableData = (data) => {
    const tableData = [];
    for (let i = 0; i < data.length; i++) {
      const row = {
        id: i,
        circuit: data[i].Circuit.circuitName,
        driver: data[i].Results[0].Driver.givenName,
        grid: data[i].Results[0].grid,
        position: data[i].Results[0].position,
        points: data[i].Results[0].points,
        laps: data[i].Results[0].laps,
        time: data[i].Results[0].Time?.time,
        status: data[i].Results[0].status,
      };
      tableData.push(row);
    }
    setConstructorRaceResults(tableData);
  };

  const fetchConstructorResults = () => {
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
              <DirectionsCarFilled sx={{ width: 100, height: 100 }} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.infoWrapper}>
              <Typography color="text" colorbrightness="secondary" align="left">
                &nbsp;
                {item.name}
                &nbsp;
              </Typography>
              <Typography color="text" colorbrightness="secondary" align="left">
                &nbsp;
                {item.nationality}
                &nbsp;
              </Typography>
              <Typography color="text" colorbrightness="secondary" align="left">
                &nbsp;
                {item.country}
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
                &nbsp; About &nbsp;
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
                  data={PieChartData}
                  innerRadius={30}
                  outerRadius={40}
                  dataKey="value"
                >
                  {PieChartData.map((entry) => (
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
              {PieChartData.map(({ name, value, color }) => (
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

  useEffect(() => {
    if (isEmpty(selectedConstructor)) {
      dispatch(
        constructorActions.getSelectedConstructorRequest({
          id: location.state.constructor.constructorId,
        }),
      );
    }
    dispatch(
      seasonActions.getSeasonRequest({
        appendURL: `constructors/${location.state.constructor.constructorId}`,
      }),
    );
    dispatch(
      standingActions.getSelectedConstructorStandingRequest({
        constructorId: `${location.state.constructor.constructorId}`,
      }),
    );
    dispatch(
      resultActions.getRaceResultRequest({
        appendURL: `constructors/${location.state.constructor.constructorId}`,
      }),
    );
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fetchConstructorInfo();
      fetchConstructorSeasons();
      fetchConstructorStats();
      fetchConstructorResults();
    }, 1000);
  }, [selectedConstructor, seasonsList, selectedConstructorStandings, raceResults]);

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
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item xs={6}>
            <div className={classes.seasonStatsWrapper}>
              {constructorSeasons.map((season) => (
                <Typography
                  color="text"
                  colorbrightness="secondary"
                  align="left"
                  key={season.season}
                >
                  &nbsp;
                  {season.season}
                  &nbsp;
                </Typography>
              ))}
            </div>
          </Grid>
        </Grid>
      </Widget>
    </Grid>
  );

  return (
    <div className={classes.body}>
      <PageTitle title="Constructors" />
      <Grid container spacing={4}>
        {renderInfo(constructorInfo)}
        {renderStatsCard(constructorStats)}
        {renderPieCard()}
        {renderSeasonsCard()}
        {constructorRaceResults.length > 0 ? (
          <Grid item xs={12}>
            <Widget
              title="Results"
              upperTitle
              noBodyPadding
              disableWidgetMenu
              bodyClass={classes.tableWidget}
            >
              <ConstructorTableComponent data={constructorRaceResults} />
            </Widget>
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
}

export default Constructors;

/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import {
  Grid, Typography, Box, Button, useTheme,
} from '@mui/material';
import {
  AddRoadOutlined,
} from '@mui/icons-material';
import {
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { isEmpty } from 'underscore';
import Dot from '../../components/Dot/Dot';
import CircuitTableComponent from './components/CircuitsTable';
import Widget from '../../components/Widget/Widget';
import ApexLineChart from '../../components/charts/ApexChart/ApexLineChart';
import PageTitle from '../../components/PageTitle/PageTitle';
import useStyles from './styles';
import * as circuitActions from '../../core/circuit/circuitActions';
import * as seasonActions from '../../core/season/seasonActions';
import * as resultActions from '../../core/result/resultActions';

function Circuits() {
  const dispatch = useDispatch();
  const location = useLocation();
  const classes = useStyles();
  const theme = useTheme();
  const circuits = useSelector((state) => state.circuits);
  const seasons = useSelector((state) => state.seasons);
  const results = useSelector((state) => state.results);
  const { selectedCircuit } = circuits;
  const { raceResults } = results;
  const { seasonsList } = seasons;
  const [circuitInfo, setCircuitInfo] = useState([]);
  const [circuitSeasons, setCircuitSeasons] = useState([]);
  const [topDriversPieChartData, setTopDriversPieChartData] = useState([]);
  const [topConstructorsPieChartData, setTopConstructorsPieChartData] = useState([]);
  const [resultsTableData, setResultsTableData] = useState([]);
  const CardData = [
    { name: 'Top Drivers', data: topDriversPieChartData },
    { name: 'Top Constructors', data: topConstructorsPieChartData },
  ];

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };
  const colors = ['primary', 'secondary', 'success', 'warning', 'info'];

  const convertResultsToPieChartData = (table, type) => {
    const pieChartData = [];
    // For top 5
    for (let i = 0; i < 5; i++) {
      const result = table[i];
      if (result) {
        const { Driver, Constructor } = result;
        const { givenName, familyName } = Driver;
        const { name } = Constructor;
        const color = colors[i];
        const pieChartItem = {
          name: type === 'driver' ? `${givenName} ${familyName}` : name,
          value: Number(result.points),
          color,
        };
        pieChartData.push(pieChartItem);
      }
    }
    return pieChartData;
  };

  const convertResultListToTable = () => {
    const resultList = raceResults.Races[0].Results;

    const tableData = [];
    for (let i = 0; i < resultList.length; i++) {
      const row = {
        id: i,
        driver: `${resultList[i].Driver.givenName} ${resultList[i].Driver.familyName}`,
        constructor: resultList[i].Constructor.name,
        grid: resultList[i].grid,
        position: resultList[i].position,
        points: resultList[i].points,
        laps: resultList[i].laps,
        time: resultList[i].Time?.time,
        status: resultList[i].status,
      };
      tableData.push(row);
    }

    setResultsTableData(tableData);
  };

  const fetchResultsTableData = () => {
    if (raceResults.Races) {
      convertResultListToTable();
    }
  };

  const fetchPieChartData = () => {
    if (
      raceResults?.Races.length > 0
    ) {
      const topDrivers = convertResultsToPieChartData(
        raceResults.Races[0].Results,
        'driver',
      );
      const topConstructors = convertResultsToPieChartData(
        raceResults.Races[0].Results,
        'constructor',
      );
      setTopDriversPieChartData(topDrivers);
      setTopConstructorsPieChartData(topConstructors);
    }
  };

  const fetchCircuitSeasons = () => {
    if (!isEmpty(seasonsList)) {
      setCircuitSeasons(seasonsList.Seasons);
    }
  };

  const fetchCircuitInfo = () => {
    if (selectedCircuit) {
      setCircuitInfo(selectedCircuit);
    }
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
              <AddRoadOutlined sx={{ width: 100, height: 100 }} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.infoWrapper}>
              <Typography color="text" colorbrightness="secondary" align="left">
                &nbsp;
                {item.circuitName}
                &nbsp;
              </Typography>
              <Typography color="text" colorbrightness="secondary" align="left">
                &nbsp;
                {item.Location?.locality}
                &nbsp;
              </Typography>
              <Typography color="text" colorbrightness="secondary" align="left">
                &nbsp;
                {item.Location?.country}
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

  const renderPieCard = (item) => (
    <Grid item lg={3} md={4} sm={6} xs={12}>
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
            <div className={classes.seasonStatsWrapper}>
              {circuitSeasons.map((season) => (
                <Typography
                  color="text"
                  colorbrightness="secondary"
                  align="left"
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

  const renderLineChart = () => (
    <Grid item xs={12}>
      <Widget
        bodyClass={classes.mainChartBody}
        title="Lap Times"
        upperTitle
        disableWidgetMenu
      >
        <ApexLineChart />
      </Widget>
    </Grid>
  );

  useEffect(() => {
    if (isEmpty(selectedCircuit)) {
      dispatch(
        circuitActions.getSelectedCircuitRequest({
          id: location.state.circuit.circuitId,
        }),
      );
    }

    dispatch(
      seasonActions.getSeasonRequest({
        appendURL: `circuits/${location.state.circuit.circuitId}`,
      }),
    );

    dispatch(
      resultActions.getRaceResultRequest({
        appendURL: `2022/${location.state.round}`,
      }),
    );
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fetchPieChartData();
      fetchCircuitInfo();
      fetchCircuitSeasons();
      fetchResultsTableData();
    }, 1000);
  }, [selectedCircuit, seasonsList, raceResults]);

  return (
    <div className={classes.body}>
      <PageTitle title="Circuits" />
      <Grid container spacing={4}>
        {renderInfo(circuitInfo)}
        {renderSeasonsCard()}
        { topDriversPieChartData.length > 0
          ? CardData.map(renderPieCard) : null}
        {renderLineChart()}
        {resultsTableData.length > 0 ? (
          <Grid item xs={12}>
            <Widget
              title="Results"
              upperTitle
              noBodyPadding
              disableWidgetMenu
              bodyClass={classes.tableWidget}
            >
              <CircuitTableComponent data={resultsTableData} />
            </Widget>
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
}

export default Circuits;

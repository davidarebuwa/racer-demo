import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Grid, Typography, Box, Button,
} from '@mui/material';
import {
  AddRoadOutlined,
} from '@mui/icons-material';
import Widget from '../../components/Widget/Widget';
import PageTitle from '../../components/PageTitle/PageTitle';
import useStyles from './styles';
import * as scheduleActions from '../../core/schedule/scheduleActions';

function CircuitsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const schedule = useSelector((state) => state.schedule);
  const { recentRaceSchedule } = schedule;
  const [circuitsList, setCircuitsList] = useState([]);

  const fetchCircuitsList = () => {
    if (recentRaceSchedule.Races.length > 0) {
      setCircuitsList(recentRaceSchedule.Races);
    }
  };

  const goToCircuitDetails = (item) => {
    dispatch(scheduleActions.getMostRecentRaceScheduleRequest());
    navigate(`/circuits/${item.Circuit.circuitId}`, {
      state: {
        round: item.round,
        circuit: item.Circuit,
      },
    });
  };

  const renderListItem = (item) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
      <Widget
        title={item.Circuit?.circuitName}
        upperTitle
        disableWidgetMenu
        className={classes.card}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className={classes.imageWrapper}>
              <Box component="div" sx={{ width: 100, height: 100 }}>
                <AddRoadOutlined sx={{ width: 100, height: 100 }} />
              </Box>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.infoWrapper}>
              <Typography color="text" colorBrightness="secondary" align="left">
                &nbsp;
                {item.Circuit?.Location?.locality}
                &nbsp;
              </Typography>
              <Typography color="text" colorBrightness="secondary" align="left">
                &nbsp;
                {item.Circuit?.Location?.country}
                &nbsp;
              </Typography>
              <Button
                onClick={() => goToCircuitDetails(item)}
                variant="outlined"
                color="primary"
                fullWidth
              >
                View
              </Button>
            </div>
          </Grid>
        </Grid>
      </Widget>
    </Grid>
  );

  useEffect(() => {
    dispatch(scheduleActions.getMostRecentRaceScheduleRequest());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fetchCircuitsList();
    }, 1000);
  }, [recentRaceSchedule]);

  return (
    <div className={classes.body}>
      <PageTitle title="Circuits" />
      <Grid container spacing={4}>
        {circuitsList.map((item) => renderListItem(item))}
      </Grid>
    </div>
  );
}

export default CircuitsList;

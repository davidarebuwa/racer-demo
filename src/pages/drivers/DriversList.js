import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Grid, Typography, Box, Button,
} from '@mui/material';
import {
  SportsMotorsports,
} from '@mui/icons-material';

import Widget from '../../components/Widget/Widget';
import PageTitle from '../../components/PageTitle/PageTitle';
import useStyles from './styles';
import * as driverActions from '../../core/driver/driverActions';

function DriversList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const drivers = useSelector((state) => state.drivers);
  const { filteredDrivers } = drivers;
  const [driversList, setDriversList] = useState([]);

  const fetchDriversList = () => {
    if (filteredDrivers.length > 0) {
      setDriversList(filteredDrivers);
    }
  };

  const goToDriverDetails = (driver) => {
    dispatch(driverActions.setSelectedDriverRequest(driver));
    navigate(`/drivers/${driver.driverId}`, {
      state: {
        driver,
      },
    });
  };

  const renderListItem = (item) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
      <Widget
        title={item.name}
        upperTitle
        disableWidgetMenu
        className={classes.card}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className={classes.imageWrapper}>
              <Box
                component="div"
                sx={{ width: 100, height: 100 }}
              >
                <SportsMotorsports
                  sx={{ width: 100, height: 100 }}
                />
              </Box>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.infoWrapper}>
              <Typography color="text" colorBrightness="secondary" align="left">
                &nbsp;
                {item.givenName}
                {' '}
                {item.familyName}
                &nbsp;
              </Typography>
              <Typography color="text" colorBrightness="secondary" align="left">
                &nbsp;
                {item.dateOfBirth}
                &nbsp;
              </Typography>
              <Typography color="text" colorBrightness="secondary" align="left">
                &nbsp;
                {item.permanentNumber}
                &nbsp;
              </Typography>
              <Button
                onClick={() => goToDriverDetails(item)}
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
    dispatch(driverActions.getAllDriversInRaceYearRequest({ year: 2022 }));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fetchDriversList();
    }, 1000);
  }, [filteredDrivers]);

  return (
    <div className={classes.body}>
      <PageTitle title="Drivers" />
      <Grid container spacing={4}>
        {driversList.map((item, index) => renderListItem(item, index))}
      </Grid>
    </div>
  );
}

export default DriversList;

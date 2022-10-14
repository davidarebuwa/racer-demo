import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Grid, Typography, Box, Button,
} from '@mui/material';
import {
  DirectionsCarFilled,
} from '@mui/icons-material';
import Widget from '../../components/Widget/Widget';
import PageTitle from '../../components/PageTitle/PageTitle';
import useStyles from './styles';
import * as constructorActions from '../../core/constructor/constructorActions';

function ConstructorList() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const constructors = useSelector((state) => state.constructors);
  const { filteredConstructors } = constructors;
  const [constructorsList, setConstructorsList] = useState([]);

  const fetchConstructorsList = () => {
    if (filteredConstructors.length > 0) {
      setConstructorsList(filteredConstructors);
    }
  };

  const goToConstructorDetails = (constructor) => {
    dispatch(constructorActions.setSelectedConstructorRequest(constructor));
    navigate(`/constructors/${constructor.constructorId}`, {
      state: {
        constructor,
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
              <Box component="div" sx={{ width: 100, height: 100 }}>
                <DirectionsCarFilled sx={{ width: 100, height: 100 }} />
              </Box>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.infoWrapper}>
              <Typography color="text" colorBrightness="secondary" align="left">
                &nbsp;
                {item.constructorId}
                &nbsp;
              </Typography>
              <Typography color="text" colorBrightness="secondary" align="left">
                &nbsp;
                {item.nationality}
                &nbsp;
              </Typography>
              <Button
                onClick={() => goToConstructorDetails(item)}
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
    dispatch(constructorActions.getAllConstructorsInRaceYearRequest({ year: 2022 }));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fetchConstructorsList();
    }, 1000);
  }, [filteredConstructors]);

  return (
    <div className={classes.body}>
      <PageTitle title="Constructors" />
      <Grid container spacing={4}>
        {constructorsList.map((item) => renderListItem(item))}
      </Grid>
    </div>
  );
}

export default ConstructorList;

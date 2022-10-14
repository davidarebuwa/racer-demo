/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';

// styles
import {
  Typography,
} from '@mui/material';
import useStyles from './styles';

// components

export default function PageTitle(props) {
  const classes = useStyles();

  return (
    <div className={classes.pageTitleContainer}>
      <Typography
        className={classes.typo}
        variant="h6"
        size="sm"
        sx={{ color: 'text.primary', marginLeft: 4 }}
      >
        {props.title}
      </Typography>
      {props.button && props.button}
    </div>
  );
}

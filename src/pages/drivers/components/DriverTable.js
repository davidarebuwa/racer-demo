/* eslint-disable react/prop-types */
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import useStyles from './styles';

const states = {
  sent: 'success',
  pending: 'warning',
  declined: 'secondary',
};

export default function DriverTableComponent({ data }) {
  const classes = useStyles();
  const keys = Object.keys(data[0]).map((i) => i.toUpperCase());
  keys.shift(); // delete "id" key

  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          {keys.map((key) => (
            <TableCell key={key}>{key}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(
          ({
            id, circuit, grid, position, points, laps, time, status,
          }) => (
            <TableRow key={id}>
              <TableCell className="pl-3 fw-normal">{circuit}</TableCell>
              <TableCell>{grid}</TableCell>
              <TableCell>{position}</TableCell>
              <TableCell>{points}</TableCell>
              <TableCell>{laps}</TableCell>
              <TableCell>{time}</TableCell>
              <TableCell>
                <Chip
                  label={status}
                  classes={{ root: classes[states[status.toLowerCase()]] }}
                />
              </TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
}

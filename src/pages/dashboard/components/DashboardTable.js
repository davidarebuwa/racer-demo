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

export default function DashboardTableComponent({ data }) {
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
        {data.map(({
          id, round, name, locality, date, hour, country, status,
        }) => (
          <TableRow key={id}>
            <TableCell className="pl-3 fw-normal">{round}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{locality}</TableCell>
            <TableCell>{date}</TableCell>
            <TableCell>{hour}</TableCell>
            <TableCell>{country}</TableCell>
            <TableCell>
              <Chip
                label={status}
                classes={{ root: classes[states[status.toLowerCase()]] }}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

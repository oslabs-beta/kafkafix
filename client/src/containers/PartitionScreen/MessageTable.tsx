import React, { FC, useState } from 'React';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Input,
  makeStyles,
  Modal
} from '@material-ui/core';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  tableWrapper: {
    margin: 30,
    boxShadow: '10px 5px 5px lightgrey;',
  },
  tableHeaderRow: {
    backgroundColor: 'black',
  },
  tableHeaderText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

interface MessageTableProps {
  messages: {}[];
}

export const MessageTable: FC<MessageTableProps> = ({ messages }) => {
  const classes = useRowStyles();

  const [pageSize, setPageSize] = useState(25);
  const pageIndex = Math.floor(messages.length/pageSize);
  const start = pageIndex * pageSize;
  const end = Math.min(start + pageSize, messages.length);
  const showMessages = messages.slice(start, end);

  return (
    <>
      <TableContainer component={Paper} className={classes.tableWrapper}>
        <Table aria-label="custom pagination table">

          <TableHead>
            <TableRow className={classes.tableHeaderRow}>
              {messages[0] && Object.keys(messages[0]).map( (key) => {
                <TableCell>
                  {key}
                </TableCell>
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {showMessages.map( (el) => {
              return (
                <TableRow>
                  {Object.keys(el).map( (key) => {
                    return (
                      <TableCell>

                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

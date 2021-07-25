import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { KafkaState } from '../../state/reducers/kafkaDataReducer';
import { overallState } from '../../state/reducers/index';

// importing components
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Paper,
  Typography,
  Input,
  makeStyles,
  Modal,
} from '@material-ui/core';

import { MTPaginationOptions } from '../PartitionScreen/MTPaginationOptions';

// importing styles
const useRowStyles = makeStyles({
  bigwrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  tableWrapper: {
    marginTop: 30,
  },
  tableHeaderRow: {
    backgroundColor: 'black',
  },
  tableHeaderText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export const ErrorTable: FC = () => {
  const classes = useRowStyles();

  const errors = useSelector<overallState, KafkaState['notif']>(
    (state) => state.kafka.notif
  ); 

  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(
    Math.floor(errors.length / pageSize)
  );
  const [togglePause, setTogglePause] = useState(false);
  const start = pageIndex * pageSize; 
  const end = Math.min(start + pageSize, errors.length); 
  const showErrors = errors.slice(start, end); 

  const numEmptyRows = pageSize - (end - start);

  const emptyRows = []; 
  for (let i = 0; i < numEmptyRows; i++) {
    emptyRows.push(
      <TableRow key={'emptyRow' + i} style={{ height: 53 }}>
        <TableCell colSpan={errors[0] ? Object.keys(errors[0]).length : 0} />
      </TableRow>
    );
  }

  const handleChangePage = (
    e: React.MouseEvent<HTMLButtonElement> | null,
    pageIndex: number
  ) => {
    setPageIndex(pageIndex);
  };

  const handleChangePageSize = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newPageIndex = Math.floor(start / parseInt(e.target.value));
    if (newPageIndex === Math.floor(errors.length / pageSize))
      setTogglePause(false);
    else setTogglePause(true);
    setPageSize(parseInt(e.target.value));
    setPageIndex(newPageIndex);
  };

  return (
    <div className={classes.bigwrapper}>
      <TableContainer component={Paper} className={classes.tableWrapper}>
        <Table aria-label='custom pagination table'>
          <TableHead>
            <TableRow className={classes.tableHeaderRow}>
              {errors[0] &&
                Object.keys(errors[0]).map((key) => (
                  <TableCell style={{ color: 'white' }}>{key}</TableCell>
                ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {showErrors.map((el, index) => (
              <TableRow key={index} style={{ height: 53 }}>
                {Object.values(el).map((value: any) => (
                  <TableCell>{value}</TableCell>
                ))}
              </TableRow>
            ))}
            {emptyRows}
          </TableBody>

          <TableFooter>
            <TableRow style={{ height: 53 }}>
              <TablePagination
                rowsPerPageOptions={[25, 50, 100]}
                count={errors.length}
                rowsPerPage={pageSize}
                page={pageIndex}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangePageSize}
                ActionsComponent={(props) => (
                  <MTPaginationOptions
                    {...props}
                    togglePause={togglePause}
                    setTogglePause={setTogglePause}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    totalMessages={errors.length}
                  />
                )}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

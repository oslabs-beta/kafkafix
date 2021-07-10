import React, { FC, MouseEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { overallState } from '../../../state/reducers';
// // importing IPCReder
const { ipcRenderer } = window.require('electron');

import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';

import { Link } from 'react-router-dom';

import {
  Button,
  Box,
  Collapse,
  Divider,
  IconButton,
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
  Modal,
} from '@material-ui/core';

import { ErrorRounded } from '@material-ui/icons';

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
  partitionButtons: {
    backgroundColor: 'white',
  },
  modal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#75BEDA',
  },
});

interface Options {
  // headers: {};
  body: string;
  method: string;
}

export const TopicRow = (props: { row: any }) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const [isOpenModal, setOpenModal] = useState(false);

  // function to handle partition click -- opens a new window -- we need to know which partiton to show live data for
  const handleClickPartition = () => {
    ipcRenderer.send('open-partition');
  };

  const handleCreatePartition = () => {
    // grabbing input
    const input: HTMLInputElement | null =
      document.querySelector('#inputPartition');

    // input validation
    if (input && input.value === '') {
      alert('cannot leave the name field empty for the partition');
      return;
    }
    // fetch request
    const options: RequestInit | Options = {
      method: 'POST',
      body: JSON.stringify({ name: input?.value }),
    };
    //finish the then after getting reposne
    fetch('api/partition', options)
      .then((data: any) => data.json())
      .catch((e) => console.log(e));
  };

  const openModal = () => {
    // setOpenModal(true);
  };

  const closeModal = () => {
    // setOpenModal(false);
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          {/* onclick - arrow changes */}
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>

        <TableCell component='th' scope='row'>
          {row.topicName}
        </TableCell>
        <TableCell>{row.partitions}</TableCell>
      </TableRow>

      {/* Create another TableRow for the partitions*/}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={3}>
              <Typography
                style={{ fontWeight: 'bold' }}
                align='left'
                variant='h6'
                gutterBottom
                component='div'
              >
                Partitions
              </Typography>

              {/* Table headers for Partitions */}
              <Table size='small' aria-label='partitions'>
                <TableHead>
                  <TableRow className={classes.tableHeaderRow}>
                    <TableCell className={classes.tableHeaderText}>
                      Id
                    </TableCell>
                    <TableCell className={classes.tableHeaderText}>
                      Leader
                    </TableCell>
                    <TableCell className={classes.tableHeaderText}>
                      Parttion-errode
                    </TableCell>
                    <TableCell className={classes.tableHeaderText}>
                      ISR
                    </TableCell>
                    <TableCell className={classes.tableHeaderText}>
                      Replicas
                    </TableCell>
                  </TableRow>
                </TableHead>

                {/* Table Body */}
                {/* Mapping through array of partitions -- row needs to be state */}
                <TableBody>
                  {row.partitionData.map((data: any) => (
                    <>
                      <TableRow
                        hover={true}
                        key={data.id}
                        // onClick={() => handleClickPartition()}
                      >
                        <TableCell component='th' scope='row'>
                          {data.id}
                        </TableCell>
                        <TableCell>{data.leader}</TableCell>
                        <TableCell>{data.partitionErrorCode}</TableCell>
                        <TableCell>{data.isr}</TableCell>
                        <TableCell>{data.replicas}</TableCell>
                      </TableRow>
                      <Link to='partition' style={{ textDecoration: 'none' }}>
                        <Button
                          size='small'
                          className={classes.partitionButtons}
                        >
                          Visualize Streams
                        </Button>
                      </Link>
                      <div style={{ margin: 15 }}></div>
                    </>
                  ))}
                  <Button
                    onClick={openModal}
                    variant='contained'
                    color='secondary'
                  >
                    Create Partition
                  </Button>
                  {/* <Modal
                    open={isOpenModal}
                    onClose={closeModal}
                    aria-labelledby='create-partition'
                    aria-describedby='create-partition'
                    className= {classes.modal}
                  >
                    <>
                      <Typography variant='h6'>Name your Partition</Typography>
                      <Input
                        id='inputPartition'
                        type='text'
                        placeholder='Name Your Partition'
                      />
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={handleCreatePartition}
                      >
                        Create
                      </Button>
                    </>
                  </Modal> */}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

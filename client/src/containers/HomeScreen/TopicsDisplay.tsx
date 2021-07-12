import React, { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { overallState } from '../../state/reducers';
import { KafkaState } from '../../state/reducers/kafkaDataReducer';
import { TopicRow } from './TopicsDisplay/TopicRow';
import { populateData } from '../../helperFunctions/populateData';

/*
------------------------------Update------------------------
Topics Row is now part of topics display becasue of the collapsable table
*/

// importing IPCReder
const { ipcRenderer } = window.require('electron');

// importing prop types
import PropTypes from 'prop-types';
// importing componenets from Material UI
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
  Modal
} from '@material-ui/core';
import { ErrorRounded } from '@material-ui/icons';

// importing icons from material-UI
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';

// fucntion to make styles for rows
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

interface Options {
  method: string,
  body: string
}


const TopicsDisplay = () => {
  const classes = useRowStyles();
  const isConnected = useSelector<overallState, KafkaState['isConnected']>(
    (state) => state.kafka.isConnected
    );

  const rows = useSelector<overallState, KafkaState['data']>(
    (state) => state.kafka.data
    ); // [{topicName, partitions, ... }, {}]

  const [isModalOpen, setOpenModal] = useState(false);

  const dispatch = useDispatch();


  const openModal = () => {
    setOpenModal(true);
  };

  const closeModal = () =>{
    setOpenModal(false);
  }

  const handleCreateTopic = () => {
    const topicName: HTMLInputElement | null =
      document.querySelector('#inputTopic');
    if (topicName && topicName.value) {
      const options: Options = {
        method: 'POST',
        body: JSON.stringify({topicName: topicName.value})
      }

      fetch('/api/topic', options)
        .then(data => data.json())
        .then(data => {
          populateData(data, dispatch);
          closeModal();
          alert('got a response');
        })
        .catch(e => console.log(e));
    }
  };

  // onclick handler for deleting a topic
  const deleteTopicHandler = (topicName: String) => {

    const options: Options = {
      method: 'DELETE',
      body: JSON.stringify({ topicName: topicName }),
    };

    fetch('/api/topic', options)
      .then(data => data.json())
      .then(data => {
        populateData(data, dispatch);
      })
      .catch((e) =>
        console.log('error in deleting topic, ', e)
      );
  };

  return (
    <TableContainer component={Paper} className={classes.tableWrapper}>
      <Table aria-label='collapsible table'>
        {/* Table Head */}
        <TableHead>
          <TableRow className={classes.tableHeaderRow}>
            <TableCell />
            <TableCell className={classes.tableHeaderText}>
              Topic Name
            </TableCell>
            <TableCell className={classes.tableHeaderText}>
              Partitions
            </TableCell>
          </TableRow>
        </TableHead>
        <Button
              variant='contained'
              color='primary'
              onClick={openModal}
            >
              Create Topic
        </Button>
        <Modal
          open={isModalOpen}
          onClose={closeModal}
          aria-labelledby='create-partition'
          aria-describedby='create-partition'
        >
          <>
            <Typography variant='h6'>Enter Topic Name</Typography>
            <Input
              id='inputTopic'
              type='text'
              placeholder='Topic Name'
            />
            <Button
              variant='contained'
              color='primary'
              onClick={handleCreateTopic}
            >
              Create
            </Button>
          </>
        </Modal>

        {/* Table Body*/}
        {isConnected && (
          <TableBody>
            {rows.map((row) => (
              <React.Fragment>
                <TopicRow key={row.topicName} row={row} />
                {/* // delete a topic */}
                <Button
                  onClick={() => deleteTopicHandler(row.topicName)}
                >
                  Delete
                </Button>
              </React.Fragment>
            ))}
          </TableBody>
          // create a topic
        )}
      </Table>
    </TableContainer>
  );
};

export default TopicsDisplay;

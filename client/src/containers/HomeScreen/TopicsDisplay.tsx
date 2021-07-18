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
// const { ipcRenderer } = window.require("electron");

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
  Modal,
  Checkbox,
} from '@material-ui/core';
import { ErrorRounded } from '@material-ui/icons';

// importing icons from material-UI
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
// import { useFetch } from '../../hooks/useFetch';
// import { MBeans } from '../../../../server/jmx/MBeans';

// const data = await useFetch(
// 	`http://localhost:9090/api/v1/query?query=${MBeans.isrShrinksPerSec}`
// );

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
  modal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#75BEDA',
  },
  buttonNotSelected: {
    backgroundColor: 'white',
  },
  buttonSelected: {
    backgroundColor: 'blue',
  },
});

interface Options {
  method: string;
  body: string;
  headers: any;
}

const TopicsDisplay = () => {
  const classes = useRowStyles();
  const isConnected = useSelector<overallState, KafkaState['isConnected']>(
    (state) => state.kafka.isConnected
  );

  const rows = useSelector<overallState, KafkaState['data']>(
    (state) => state.kafka.data
  ); // [{topicName, partitions, ... }, {}]

  const dispatch = useDispatch();

  // local state to create a topic
  const [modalForCreateTopic, setModalForCreateTopic] = useState(false);

  const toggleCreateTopicModal = () => {
    setModalForCreateTopic(!modalForCreateTopic);
  };

  const [modalForConsumer, setModalForConsumer] = useState(false);

  const toggleConsumerModal = () => {
    setModalForConsumer(!modalForConsumer);
  };

  const handleCreateTopic = () => {
    const topicName: HTMLInputElement | null =
      document.querySelector('#inputTopic');
    if (topicName && topicName.value) {
      const options: Options = {
        method: 'POST',
        body: JSON.stringify({ topic: topicName.value }),
        headers: { 'Content-Type': 'application/json' },
      };

      fetch('/api/topic', options)
        .then((data) => data.json())
        .then((data) => {
          populateData(data, dispatch);
          toggleCreateTopicModal();
          alert('got a response');
        })
        .catch((e) => console.log(e));
    }
  };

  // onclick handler for deleting a topic
  const deleteTopicHandler = (topicName: String) => {
    const options: Options = {
      method: 'DELETE',
      body: JSON.stringify({ topic: topicName }),
      headers: { 'Content-Type': 'application/json' },
    };

    fetch('/api/topic', options)
      .then((data) => data.json())
      .then((data) => {
        populateData(data, dispatch);
      })
      .catch((e) => console.log('error in deleting topic, ', e));
  };

  const handleStartProducer = () => {
    fetch('/api/producer', { method: 'GET' })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
      })
      .catch((e) => console.log(e));
  };

  const handleStartConsumer = () => {
    fetch('/api/consumer', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
      })
      .catch((e) => console.log(e));
  };

  // let defaultObj: any = {};
  // rows.forEach((obj) => (defaultObj[obj.topicName] = false));
  // // {topic1: false, topic2: false ... }
  // const [buttonState, setButtonState] = useState(defaultObj);
  // console.log(buttonState);

  // interface Colors {
  //   buttonSelected: string;
  //   buttonNotSelected: string;
  // }

  // const colorSwitch: any = {
  //   buttonSelected: 'buttonNotSelected',
  //   buttonNotSelected: 'buttonSelected',
  // };

  const handleSelectTopicClick = () => {
    const topic = (document.getElementById('selectTopic') as HTMLInputElement)
      .value;
    const groupId = (
      document.getElementById('createGroupID') as HTMLInputElement
    ).value;

    console.log('topic: ', topic, 'groupId ', groupId);

    const option = {
      method: 'POST',
      body: JSON.stringify({ topic, groupId }),
      headers: { 'content-type': 'application/json' },
    };

    fetch('/api/consumer', option)
      .then((data) => data.json())
      .then((data) => toggleConsumerModal())
      .catch((e) => console.log(e.target));
    // console.log('after split ', e.target.id.split('button'));
    // const [, key] = e.target.id.split('button');
    // console.log('topic is ', key);
    // setButtonState({ ...buttonState, [key]: !buttonState[key] });
    // console.log('event target class', e.target.className);
    // e.target.className = colorSwitch[e.target.className];
    // console.log('event target class after switch ', e.target.className);
    // console.log(e.target.className === 'buttonSelected');
    // if (e.target.className === 'buttonSelected')
    //   e.target.style = classes.buttonSelected;
    // else if (e.target.className === 'buttonNotSelected')
    //   e.target.style = classes.buttonNotSelected;
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

        <Button variant='text' color='primary' onClick={toggleCreateTopicModal}>
          Create Topic
        </Button>
        <Modal
          open={modalForCreateTopic}
          onClose={toggleCreateTopicModal}
          aria-labelledby='create-partition'
          aria-describedby='create-partition'
          className={classes.modal}
        >
          <>
            <Typography variant='h6'>Enter Topic Name</Typography>
            <Input id='inputTopic' type='text' placeholder='Topic Name' />
            <Button variant='text' color='primary' onClick={handleCreateTopic}>
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
                  variant='text'
                  color='primary'
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
      <Button variant='text' color='primary' onClick={handleStartProducer}>
        Start Producer
      </Button>
      <Button
        onClick={toggleConsumerModal}
        variant='contained'
        color='secondary'
      >
        Start Consumer
      </Button>
      <Modal
        open={modalForConsumer}
        onClose={toggleConsumerModal}
        aria-labelledby='create-partition'
        aria-describedby='create-partition'
        className={classes.modal}
      >
        <>
          <Typography variant='h6'>Select Topics To Read</Typography>

          <Input id='selectTopic' type='text' placeholder='Kafkafix' />

          <Typography variant='h6'>Create A Group ID</Typography>

          <Input
            id='createGroupID'
            type='text'
            placeholder='Create a Group ID'
          />

          <Button
            variant='contained'
            color='primary'
            onClick={handleSelectTopicClick}
          >
            Start Consumer
          </Button>
        </>
      </Modal>
    </TableContainer>
  );
};

export default TopicsDisplay;

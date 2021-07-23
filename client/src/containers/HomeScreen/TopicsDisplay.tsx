import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { overallState } from '../../state/reducers';
import { KafkaState } from '../../state/reducers/kafkaDataReducer';
import { TopicRow } from './TopicsDisplay/TopicRow';
import { populateData } from '../../helperFunctions/populateData';
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
	Modal,
} from '@material-ui/core';
import { ErrorRounded } from '@material-ui/icons';

import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useRowStyles = makeStyles({
	root: {
		'& > *': {
			borderBottom: 'unset',
		},
	},
	tableWrapper: {
		margin: 30,
	},
	buttonsWrapper: {
		display: 'flex',
		justifyContent: 'space-around',
	},
	tableHeaderRow: {
		backgroundColor: 'black',
	},
	tableHeaderText: {
		color: 'white',
		fontWeight: 'bold',
	},
	buttonNotSelected: {
		backgroundColor: 'white',
	},
	buttonSelected: {
		backgroundColor: 'blue',
	},
	partitionButtons: {
		backgroundColor: 'white',
	},
	primaryButtons: {
		backgroundColor: 'white',
		justifySelf: 'center',
		color: 'black',
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	insideModalDiv: {
		display: 'flex',
		width: 300,
		height: 300,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		borderRadius: '5%',
	},
	button: {
		marginTop: 10,
		backgroundColor: 'red',
	},
});

interface Options {
	method: string;
	body: string;
	headers: any;
}

const TopicsDisplay: FC = () => {
  const classes = useRowStyles();
  const isConnected = useSelector<overallState, KafkaState['isConnected']>(
    (state) => state.kafka.isConnected
  );

  const rows = useSelector<overallState, KafkaState['data']>(
    (state) => state.kafka.data
  ); 

  const dispatch = useDispatch();

  // local state to create a topic
  const [modalForCreateTopic, setModalForCreateTopic] = useState(false);

  const toggleCreateTopicModal = () => {
    setModalForCreateTopic(!modalForCreateTopic);
  };

  // state for modal
  const [modalForConsumer, setModalForConsumer] = useState(false);

  // state for button
  const [isConsumerStarted, setIsConsumerStarted] = useState(false);

  const toggleConsumerModal = () => {
    setModalForConsumer(!modalForConsumer);
  };

  // state for modal
  const [modalForProducer, setModalForProducer] = useState(false);

  // state for button
  const [isProducerStarted, setIsProducerStarted] = useState(false);

  const toggleProducerModal = () => {
    setModalForProducer(!modalForProducer);
  };

  const handleCreateTopic = () => {
    const topicName: HTMLInputElement | null =
      document.querySelector('#inputTopic');

    const numberOfPartitions: HTMLInputElement | null = document.querySelector(
      '#inputNumberOfPartitions'
    );

    // sending topic name and number of partitions when creating partitions
    if (
      topicName &&
      topicName.value &&
      numberOfPartitions &&
      numberOfPartitions.value
    ) {
      const options: Options = {
        method: 'POST',
        body: JSON.stringify({
          topic: topicName.value,
          numPartitions: numberOfPartitions.value,
        }),
        headers: { 'Content-Type': 'application/json' },
      };

      fetch('/api/topic', options)
        .then((data) => data.json())
        .then((data) => {
          populateData(data, dispatch);
          toggleCreateTopicModal();
          alert('Created a new topic');
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

  const handleToggleProducer = () => {
    // include inputted data from modal

    const topic = (
      document.getElementById('selectProducer') as HTMLInputElement
    ).value;

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: topic }),
    };

    if (isProducerStarted) {
      options.method = 'PUT';
    }

    fetch('/api/producer', options)
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
      })
      .catch((e) => console.log(e));

    setIsProducerStarted(!isProducerStarted);
    toggleProducerModal();
  };

  const handleToggleConsumer = () => {
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

    if (isConsumerStarted) {
      option.method = 'PUT';
    }

    fetch('/api/consumer', option)
      .then((data) => data.json())
      .then((data) => toggleConsumerModal())
      .catch((e) => console.log(e.target));

    setIsConsumerStarted(!isConsumerStarted);
    toggleConsumerModal();
  };

  return (
    <React.Fragment>
      <TableContainer component={Paper} className={classes.tableWrapper}>
        <Paper className={classes.buttonsWrapper}>
          <Button
            size='small'
            variant='text'
            className={classes.primaryButtons}
            onClick={toggleCreateTopicModal}
          >
            Create Topic
          </Button>
          <Button
            size='small'
            variant='text'
            onClick={toggleProducerModal}
            className={classes.primaryButtons}
          >
            {!isProducerStarted ? 'Start Producer' : 'Stop Producer'}
          </Button>
          <Button
            size='small'
            onClick={toggleConsumerModal}
            variant='text'
            className={classes.primaryButtons}
          >
            {!isConsumerStarted ? 'Start Consumer' : 'Stop Consumer'}
          </Button>
        </Paper>
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

          {/* Table Body*/}
          {isConnected && (
            <TableBody>
              {rows.map((row) => (
                <React.Fragment>
                  <TopicRow key={row.topicName} row={row} />
                  {/* // delete a topic */}
                  <Button
                    variant='text'
                    size='small'
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

        {/* Modal for Creating a new topic */}
        <Modal
          open={modalForCreateTopic}
          onClose={toggleCreateTopicModal}
          aria-labelledby='create-partition'
          aria-describedby='create-partition'
          className={classes.modal}
        >
          <div className={classes.insideModalDiv}>
            <Typography variant='h6'>Enter Topic Name</Typography>
            <Input id='inputTopic' type='text' placeholder='KafkaFix' />
            <Input id='inputNumberOfPartitions' type='number' placeholder='3' />
            <Button
              variant='outlined'
              className={classes.button}
              onClick={handleCreateTopic}
            >
              Create
            </Button>
          </div>
        </Modal>

        {/* Modal for Producer */}
        <Modal
          open={modalForProducer}
          onClose={toggleProducerModal}
          aria-labelledby='start-producer'
          aria-describedby='start-producer'
          className={classes.modal}
        >
          <div className={classes.insideModalDiv}>
            <Typography variant='h6'>Producer to start</Typography>

            <Input id='selectProducer' type='text' placeholder='Kafkafix' />

            <Button
              variant='contained'
              color='primary'
              onClick={handleToggleProducer}
              className={classes.button}
            >
              Start
            </Button>
          </div>
        </Modal>

        {/* Modal for Consumer */}
        <Modal
          open={modalForConsumer}
          onClose={toggleConsumerModal}
          aria-labelledby='create-partition'
          aria-describedby='create-partition'
          className={classes.modal}
        >
          <div className={classes.insideModalDiv}>
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
              onClick={handleToggleConsumer}
              className={classes.button}
            >
              Start
            </Button>
          </div>
        </Modal>
      </TableContainer>
    </React.Fragment>
  );
};

export default TopicsDisplay;

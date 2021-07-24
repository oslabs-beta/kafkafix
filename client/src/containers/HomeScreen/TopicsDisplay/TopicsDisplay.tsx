import React, { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { overallState } from '../../../state/reducers';
import { KafkaState } from '../../../state/reducers/kafkaDataReducer';
import { TopicRow } from './TopicRow';
import { populateData } from '../../../helperFunctions/populateData';
import { TopicModal } from './TopicModal';
import { ProducerModal } from './ProducerModal';
import { ConsumerModal } from './ConsumerModal';

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
		state => state.kafka.isConnected
	);

	const rows = useSelector<overallState, KafkaState['data']>(
		state => state.kafka.data
	);

	const dispatch = useDispatch();

	// local state to create a topic
	const [modalForCreateTopic, setModalForCreateTopic] = useState(false);

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

			fetch('http://localhost:3000/api/topic', options)
				.then(data => data.json())
				.then(data => {
					populateData(data, dispatch);
					setModalForCreateTopic(false);
					alert('Created a new topic');
				})
				.catch(e => console.log(e));
		}
	};

	// onclick handler for deleting a topic
	const deleteTopicHandler = (topicName: String) => {
		console.log('delete topic topic name', topicName);
		const options: Options = {
			method: 'DELETE',
			body: JSON.stringify({ topic: topicName }),
			headers: { 'Content-Type': 'application/json' },
		};

		fetch('http://localhost:3000/api/topic', options)
			.then(data => data.json())
			.then(data => {
				populateData(data, dispatch);
			})
			.catch(e => console.log('error in deleting topic, ', e));
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

		fetch('http://localhost:3000/api/producer', options)
			.then(data => data.json())
			.then(data => {
				setModalForProducer(false);
				setIsProducerStarted(!isProducerStarted);
				console.log(data);
			})
			.catch(e => console.log(e));
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

		fetch('http://localhost:3000/api/consumer', option)
			.then(data => data.json())
			.then(data => {
				setModalForConsumer(false);
				setIsConsumerStarted(!isConsumerStarted);
			})
			.catch(e => console.log(e.target));
	};

	return (
		<React.Fragment>
			<TableContainer component={Paper} className={classes.tableWrapper}>
				<Paper className={classes.buttonsWrapper}>
					<Button
						size='small'
						variant='text'
						className={classes.primaryButtons}
						onClick={() => setModalForCreateTopic(!modalForCreateTopic)}
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
							{rows.map((row: any) => (
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
				<TopicModal
					modalStatus={modalForCreateTopic}
					setModalStatus={setModalForCreateTopic}
					handleSubmit={handleCreateTopic}
				/>

				{/* Modal for Producer */}
				<ProducerModal
					modalStatus={modalForProducer}
					setModalStatus={setModalForProducer}
					handleSubmit={handleToggleProducer}
				/>

				{/* Modal for Consumer */}
				<ConsumerModal
					modalStatus={modalForConsumer}
					setModalStatus={setModalForConsumer}
					handleSubmit={handleToggleConsumer}
				/>
			</TableContainer>
		</React.Fragment>
	);
};

export default TopicsDisplay;

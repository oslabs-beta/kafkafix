import React, { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../state/reducers';
import { KafkaState } from '../../../state/reducers/kafkaDataReducer';
import { TopicRow } from './TopicRow';
import { TopicModal } from './TopicModal';
import { ProducerModal } from './ProducerModal';
import { ConsumerModal } from './ConsumerModal';
import '../../../../stylesheets/TopicsDisplay.css';

import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@material-ui/core';

export const TopicsTable: FC = () => {
	const isConnected = useSelector(
		(state: RootState) => state.kafka.isConnected
	);

	const rows = useSelector((state: RootState) => state.kafka.data);

	const [modalForCreateTopic, setModalForCreateTopic] = useState(false);
	const [modalForProducer, setModalForProducer] = useState(false);
	const [modalForConsumer, setModalForConsumer] = useState(false);

	const [isConsumerStarted, setIsConsumerStarted] = useState(false);
	const [isProducerStarted, setIsProducerStarted] = useState(false);

	const dispatch = useDispatch();

	const handleClickProducerButton = () => {
		if (isProducerStarted) {
			const options = {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
			};
			fetch('http://localhost:3000/api/producer', options)
				.then(data => data.json())
				.then(data => {
					setIsProducerStarted(false);
					console.log('res from stopping producer', data);
				})
				.catch(e => console.log(e));
		} else setModalForProducer(true);
	};

	const handleClickConsumerButton = () => {
		if (isConsumerStarted) {
			const options = {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
			};
			fetch('http://localhost:3000/api/consumer', options)
				.then(data => data.json())
				.then(data => {
					setIsConsumerStarted(false);
					console.log('res from stopping consumer', data);
				})
				.catch(e => console.log(e.target));
		} else setModalForConsumer(true);
	};

	return (
		<TableContainer component={Paper} className='tableWrapper'>
			<Paper className='buttonWrapper'>
				<Button
					size='small'
					variant='text'
					className='primaryButtons'
					onClick={() => setModalForCreateTopic(true)}
				>
					Create Topic
				</Button>

				<Button
					size='small'
					variant='text'
					onClick={handleClickProducerButton}
					className='primaryButtons'
				>
					{!isProducerStarted ? 'Start Producer' : 'Stop Producer'}
				</Button>

				<Button
					size='small'
					onClick={handleClickConsumerButton}
					variant='text'
					className='primaryButtons'
				>
					{!isConsumerStarted ? 'Start Consumer' : 'Stop Consumer'}
				</Button>
			</Paper>
			<Table aria-label='collapsible table'>
				{/* Table Head */}
				<TableHead>
					<TableRow className='tableHeaderRow'>
						<TableCell className='tableHeaderText'>Topic Name</TableCell>
						<TableCell className='tableHeaderText'>Partitions</TableCell>
					</TableRow>
				</TableHead>

				{/* Table Body*/}
				{isConnected && (
					<TableBody>
						{rows.map((row: any) => (
							<TopicRow key={row.topicName} row={row} />
						))}
					</TableBody>
					// create a topic
				)}
			</Table>

			{/* Modal for Creating a new topic */}
			<TopicModal
				modalStatus={modalForCreateTopic}
				setModalStatus={setModalForCreateTopic}
			/>

			{/* Modal for Producer */}
			<ProducerModal
				modalStatus={modalForProducer}
				setModalStatus={setModalForProducer}
				setProducerButton={setIsProducerStarted}
			/>

			{/* Modal for Consumer */}
			<ConsumerModal
				modalStatus={modalForConsumer}
				setModalStatus={setModalForConsumer}
				setConsumerButton={setIsConsumerStarted}
			/>
		</TableContainer>
	);
};

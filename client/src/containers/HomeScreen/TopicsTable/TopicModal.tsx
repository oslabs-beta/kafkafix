import React, { FC, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Typography, Input, Modal } from '@material-ui/core';
import { populateData } from '../../../helperFunctions/populateData';

interface TopicModalInterface {
	modalStatus: boolean;
	setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TopicModal: FC<TopicModalInterface> = ({
	modalStatus,
	setModalStatus,
}) => {
	const inputTopic = useRef<HTMLInputElement>(null);
	const inputNumPartitions = useRef<HTMLInputElement>(null);
	const dispatch = useDispatch();

	const handleCreateTopic = () => {
		if (inputTopic.current !== null && inputNumPartitions.current !== null) {
			const topic = inputTopic.current.value;
			const numPartitions = inputNumPartitions.current.value;
			console.log('topic is', topic, 'numPart is', numPartitions);
			if (topic.length === 0 || numPartitions.length === 0) {
				alert('Cannot leave topic/partition number fields empty');
				return;
			}

			const options = {
				method: 'POST',
				body: JSON.stringify({ topic, numPartitions }),
				headers: { 'Content-Type': 'application/json' },
			};

			fetch('http://localhost:3000/api/topic', options)
				.then(data => data.json())
				.then(data => {
					populateData(data, dispatch);
					setModalStatus(false);
					alert('Created a new topic');
				})
				.catch(e => console.log(e));
		}
	};

	return (
		<>
			<Modal
				open={modalStatus}
				onClose={() => setModalStatus(false)}
				aria-labelledby='create-partition'
				aria-describedby='create-partition'
				className='modal'
			>
				<div className='insideModalDiv'>
					<Typography variant='h6'>Enter Topic Name</Typography>
					<Input
						id='inputTopic'
						inputRef={inputTopic}
						type='text'
						placeholder='KafkaFix'
					/>
					<Input
						id='inputNumberOfPartitions'
						inputRef={inputNumPartitions}
						type='number'
						placeholder='3'
					/>
					<Button
						variant='outlined'
						className='button'
						onClick={handleCreateTopic}
					>
						Create
					</Button>
				</div>
			</Modal>
		</>
	);
};

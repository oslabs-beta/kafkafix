import React, { FC, useRef } from 'react';
import { Button, Typography, Input, Modal } from '@material-ui/core';

interface ConsumerModalInterface {
	modalStatus: boolean;
	setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
	setConsumerButton: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ConsumerModal: FC<ConsumerModalInterface> = ({
	modalStatus,
	setModalStatus,
	setConsumerButton,
}) => {
	const inputTopic = useRef<HTMLInputElement>(null);
	const inputGroupID = useRef<HTMLInputElement>(null);

	const handleStartConsumer = () => {
		if (inputTopic.current !== null && inputGroupID.current !== null) {
			const topic = inputTopic.current.value;
			const groupId = inputGroupID.current.value;
			console.log('topic is ', topic, ' groupID is ', groupId);
			if (topic.length === 0 || groupId.length === 0) {
				alert('Cannot leave topic name/groupID fields empty');
				return;
			}

			const options = {
				method: 'POST',
				body: JSON.stringify({ topic, groupId }),
				headers: { 'Content-Type': 'application/json' },
			};

			fetch('http://localhost:3000/api/consumer', options)
				.then(data => data.json())
				.then(data => {
					setModalStatus(false);
					setConsumerButton(true);
				})
				.catch(e => console.log(e.target));
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

					<Typography variant='h6'>Create A Group ID</Typography>
					<Input
						id='createGroupID'
						inputRef={inputGroupID}
						type='text'
						placeholder='Create a Group ID'
					/>

					<Button
						variant='contained'
						color='primary'
						onClick={handleStartConsumer}
						className='button'
					>
						Start
					</Button>
				</div>
			</Modal>
		</>
	);
};

import React, {FC, useRef} from 'react';
import {
	Button,
	Typography,
	Input,
	Modal,
} from '@material-ui/core';

interface TopicModalInterface {
  modalStatus: boolean;
  setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void;
}

export const TopicModal: FC<TopicModalInterface> = ({ modalStatus, setModalStatus, handleSubmit }) => {

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
						<Input id='inputTopic' type='text' placeholder='KafkaFix' />
						<Input id='inputNumberOfPartitions' type='number' placeholder='3' />
						<Button
							variant='outlined'
							className='button'
							onClick={handleSubmit}
						>
							Create
						</Button>
					</div>
				</Modal>
    </>
  )
}
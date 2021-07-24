import React, { FC } from 'react';
import { Button, Typography, Input, Modal } from '@material-ui/core';

interface ProducerModalInterface {
	modalStatus: boolean;
	setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
	handleSubmit: () => void;
}

export const ProducerModal: FC<ProducerModalInterface> = ({
	modalStatus,
	setModalStatus,
	handleSubmit,
}) => {
	return (
		<>
			<Modal
				open={modalStatus}
				onClose={() => setModalStatus(false)}
				aria-labelledby='start-producer'
				aria-describedby='start-producer'
				className='modal'
			>
				<div className='insideModalDiv'>
					<Typography variant='h6'>Producer to start</Typography>

					<Input id='selectProducer' type='text' placeholder='Kafkafix' />

					<Button
						variant='contained'
						color='primary'
						onClick={handleSubmit}
						className='button'
					>
						Start
					</Button>
				</div>
			</Modal>
		</>
	);
};

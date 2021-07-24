import React, {FC} from 'react';
import {
	Button,
	Typography,
	Input,
	Modal,
} from '@material-ui/core';

interface ConsumerModalInterface {
  modalStatus: boolean;
  setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void;
}

export const ConsumerModal: FC<ConsumerModalInterface> = ({ modalStatus, setModalStatus, handleSubmit }) => {
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
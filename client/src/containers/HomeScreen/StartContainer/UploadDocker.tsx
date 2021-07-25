import React, { FC } from 'react';
import { Button, Card, Typography } from '@material-ui/core';
const { ipcRenderer } = window.require('electron');

// FIX - NO FETCH
export const UploadDocker: FC = () => {
	const handleUpload = () => ipcRenderer.send('upload-file');

	return (
		<>
			<Card className='card'>
				<Typography variant='subtitle2' className='title'>
					Upload Your Docker-compose File
				</Typography>
				<Button
					size='small'
					variant='outlined'
					color='primary'
					id='uploadButton'
					onClick={handleUpload}
				>
					Upload
				</Button>
			</Card>
		</>
	);
};

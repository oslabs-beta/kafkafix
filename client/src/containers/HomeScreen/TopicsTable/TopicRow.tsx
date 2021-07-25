import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import { IconButton, TableCell, TableRow, Button } from '@material-ui/core';

import { DataEntries } from '../../../state/reducers/kafkaDataReducer';
import { CollapsibleTable } from './CollapsibleTable';
import { populateData } from '../../../helperFunctions/populateData';

interface TopicRowProps {
	row: DataEntries;
}

export const TopicRow: FC<TopicRowProps> = ({ row }) => {
	const [openInnerTable, setOpenInnerTable] = useState<boolean>(false);
	const dispatch = useDispatch();

	const deleteTopicHandler = () => {
		const topic = row.topicName;
		console.log('delete topic topic name', topic);
		const options = {
			method: 'DELETE',
			body: JSON.stringify({ topic }),
			headers: { 'Content-Type': 'application/json' },
		};

		fetch('http://localhost:3000/api/topic', options)
			.then(data => data.json())
			.then(data => {
				populateData(data, dispatch);
			})
			.catch(e => console.log('error in deleting topic, ', e));
	};

	return (
		<>
			<TableRow className='root'>
				<TableCell>
					<IconButton
						aria-label='expand row'
						size='small'
						onClick={() => setOpenInnerTable(!openInnerTable)}
					>
						{openInnerTable ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
					</IconButton>
				</TableCell>

				<TableCell>{row.topicName}</TableCell>
				<TableCell>{row.partitions}</TableCell>
				<TableCell>
					<Button variant='text' size='small' onClick={deleteTopicHandler}>
						Delete
					</Button>
				</TableCell>
			</TableRow>

			{/* Create another TableRow for the partitions*/}
			<TableRow>
				<TableCell className='removeVerticalPadding' colSpan={5}>
					<CollapsibleTable openTable={openInnerTable} dataEntries={row} />
				</TableCell>
			</TableRow>
		</>
	);
};

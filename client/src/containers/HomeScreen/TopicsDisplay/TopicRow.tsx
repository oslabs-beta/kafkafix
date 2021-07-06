import React, { FC, MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { overallState } from '../../../state/reducers';
// // importing IPCReder
const { ipcRenderer } = window.require('electron');

import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';

import {
	Button,
	Box,
	Collapse,
	Divider,
	IconButton,
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
} from '@material-ui/core';

import { ErrorRounded } from '@material-ui/icons';

const useRowStyles = makeStyles({
	root: {
		'& > *': {
			borderBottom: 'unset',
		},
	},
	tableWrapper: {
		margin: 30,
		boxShadow: '10px 5px 5px lightgrey;',
	},
	tableHeaderRow: {
		backgroundColor: 'black',
	},
	tableHeaderText: {
		color: 'white',
		fontWeight: 'bold',
	},
});

export const TopicRow = (props: { row: any }) => {
	const { row } = props;
	const [open, setOpen] = React.useState(false);
	const classes = useRowStyles();

	// import state

	// function to handle partition click -- opens a new window -- we need to know which partiton to show live data for
	const handleClickPartition = (topic: any) => {
		console.log(topic);
		ipcRenderer.send('open-partition');
	};

	const handleDeletePartition = (partitionID: number) => {
		// import state

		console.log(partitionID);
		// fetch
		const options = {
			method: 'DELETE',
			body: { partitionID },
		};

		//finish the then after getting reposne
		//   fetch('api/', options)
		//     .then((data) => data.json())
		//     .then()
		//     .catch();
	};

	return (
		<React.Fragment>
			<TableRow className={classes.root}>
				<TableCell>
					{/* onclick - arrow changes */}
					<IconButton
						aria-label='expand row'
						size='small'
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
					</IconButton>
				</TableCell>

				<TableCell component='th' scope='row'>
					{row.topicName}
				</TableCell>
				<TableCell>{row.partitions}</TableCell>
			</TableRow>

			{/* Create another TableRow for the partitions*/}
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
					<Collapse in={open} timeout='auto' unmountOnExit>
						<Box margin={3}>
							<Typography
								style={{ fontWeight: 'bold' }}
								align='left'
								variant='h6'
								gutterBottom
								component='div'
							>
								Partitions
							</Typography>

							{/* Table headers for Partitions */}
							<Table size='small' aria-label='partitions'>
								<TableHead>
									<TableRow className={classes.tableHeaderRow}>
										<TableCell className={classes.tableHeaderText}>
											Id
										</TableCell>
										<TableCell className={classes.tableHeaderText}>
											Leader
										</TableCell>
										<TableCell className={classes.tableHeaderText}>
											Parttion-errode
										</TableCell>
										<TableCell className={classes.tableHeaderText}>
											ISR
										</TableCell>
										<TableCell className={classes.tableHeaderText}>
											Replicas
										</TableCell>
									</TableRow>
								</TableHead>

								{/* Table Body */}
								{/* Mapping through array of partitions -- row needs to be state */}
								<TableBody>
									{row.partitionData.map((data: any) => (
										<>
											<TableRow
												hover={true}
												key={data.id}
												onClick={() => handleClickPartition(row.topicName)}
											>
												<TableCell component='th' scope='row'>
													{data.id}
												</TableCell>
												<TableCell>{data.leader}</TableCell>
												<TableCell>{data.partitionErrorCode}</TableCell>
												<TableCell>{data.isr}</TableCell>
												<TableCell>{data.replicas}</TableCell>
											</TableRow>
											<Button onClick={() => handleDeletePartition(data.id)}>
												Delete
											</Button>
										</>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
};

import React, { useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	InputLabel,
	Button,
	Select,
	FormControl,
	MenuItem,
	Paper,
	Typography,
	Input,
	makeStyles,
	Card,
} from '@material-ui/core';

import NavBar from '../HomeScreen/Sidepanel/NavBar';
import { populateChart } from '../../helperFunctions/populateChart';

export const MetricsScreen: FC = () => {
	console.log('MetricsScreen');
	const classes = useStyles();
	const dispatch = useDispatch();

	const [isSelectOpen, setIsSelectOpen] = useState(false);
	const [selectedMetric, setSelectedMetric] = useState('');

	const toggleSelect = () => setIsSelectOpen(!isSelectOpen);

	const handleSelectedMetric = (e: any) => {
		setSelectedMetric(e.target.value);

		// let url = 'http://localhost:9090/api/v1/query?query=';
		// fetch((url += e.target.value))
		// 	.then(data => data.json())
		// 	.then(data => {
		// 		const {
		// 			data: { result },
		// 		} = data;
		// 		populateChart(result, dispatch);
		// 	});
	};

  fetch('http://localhost:3000/api/metrics', {
    method: 'GET',
		headers: {'Content-Type': 'application/json'}
  })
		.then(res => res.json())
		.then(data => console.log(data));
	return (
		<>
			<Card className={classes.metricsWrapper}>
				<NavBar />
				{/* Form to select metric you want to display */}
				<FormControl className={classes.formControl}>
					<InputLabel>Select a metric from the dropdown</InputLabel>
					<Select
						labelId='select-metric'
						id='slectMetric'
						open={isSelectOpen}
						onClose={toggleSelect}
						onOpen={toggleSelect}
						value={selectedMetric}
						onChange={handleSelectedMetric}
					>
						<MenuItem value=''>None</MenuItem>
						{/* Mapping menu items manually grabbed from Prometheus */}
					</Select>
				</FormControl>

				{/* Import bar Chart */}
				<Card className={classes.barChart}></Card>

				{/* Import pie Chart */}
				<div className={classes.pieChart}></div>
			</Card>
		</>
	);
};

const useStyles = makeStyles(() => ({
	metricsWrapper: {
		display: 'flex',
		flexDirection: 'column',
	},
	barChart: {
		alignItems: 'center',
	},
	pieChart: {
		width: 600,
		alignSelf: 'center',
		marginTop: 50,
		marginBottom: 40,
	},
	button: {
		display: 'block',
		marginBottom: 20,
	},
	formControl: {
		margin: 20,
		minWidth: 120,
	},
}));

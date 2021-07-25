import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Card, makeStyles } from '@material-ui/core';

import { KafkaState } from '../../../state/reducers/kafkaDataReducer';
import { RootState } from '../../../state/reducers';

interface notifItemsProps {
	setNotif: any;
}
export const NotifItems: FC<notifItemsProps> = ({ setNotif }) => {
	const classes = useStyles();

	// can edit the slices to depend on a state/allow user to config
	const notifs = useSelector<RootState, KafkaState['errors']>(state =>
		state.kafka.errors.slice(-10)
	);

	return (
		<>
			<div
				role='presentation'
				className={classes.list}
				onClick={() => setNotif({ open: false })}
			>
				{notifs.map(el => (
					<Card className={classes.divForNotifs}>
						<div className={classes.span}>
							<Typography variant='overline'>{el.namespace}</Typography>
							<Typography variant='overline'>{el.broker}</Typography>
						</div>

						<Typography variant='body2' className={classes.errorMessage}>
							{el.error}
						</Typography>

						<div className={classes.span}>
							<Typography variant='button'>{el.clientId}</Typography>
							<Typography variant='caption'>{el.message}</Typography>
						</div>
					</Card>
				))}
			</div>
		</>
	);
};

const useStyles = makeStyles({
	list: {
		display: 'flex',
		flexDirection: 'column',
		width: 420,
		margin: 20,
		// marginBottom: 100,
		justifyContent: 'center',
	},
	divForNotifs: {
		display: 'flex',
		flexDirection: 'column',
		// justifyContent: 'center',
		alignItems: 'center',
		width: 400,
		marginBottom: 20,
		padding: 10,
		backgroundColor: 'white',
	},
	span: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	errorMessage: {
		fontWeight: 'bold',
		textAlign: 'center',
		margin: 10,
	},
});

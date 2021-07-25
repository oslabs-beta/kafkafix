import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Drawer, Button, Typography } from '@material-ui/core';
import { Notifications, AccountCircle, Menu } from '@material-ui/icons';

import { NotifItems } from './NotifItems';
import { logoutActionCreator } from '../../../state/actions/userActions';
import { LeftSidePanel } from './LeftSidePanel';

const NavBar: FC = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [openLeft, setOpenLeft] = useState(false);
	const [notifState, setNotif] = useState(false);

	return (
		<div className={classes.navbar}>
			<AppBar className={classes.appbar}>
				{/* menu button on nav bar */}
				<Toolbar>
					<Button onClick={() => setOpenLeft(true)}>
						<Menu fontSize='large' style={{ color: 'white' }} />
					</Button>
				</Toolbar>

				{/* Kafka fix logo on Nav bar - takes you back home */}
				<Toolbar>
					<Link to='/' style={{ textDecoration: 'none' }}>
						<Button>
							<Typography variant='h4' component='h2' className={classes.logo}>
								KafkaFix
							</Typography>
						</Button>
					</Link>
				</Toolbar>

				{/* Notifications and login on Nav bar - open drawers on click*/}
				<Toolbar>
					<Button onClick={() => setNotif(true)}>
						<Notifications fontSize='large' style={{ color: 'white' }} />
					</Button>
					<Button
						onClick={() => {
							console.log('inside button click for signout');
							dispatch(logoutActionCreator());
						}}
					>
						<AccountCircle fontSize='large' style={{ color: 'white' }} />
					</Button>
				</Toolbar>

				{/* Drawer for menu click */}
				<Drawer
					anchor='left'
					open={openLeft}
					onClose={() => setOpenLeft(false)}
				>
					<LeftSidePanel />
				</Drawer>

				{/* Drawer for notifications */}
				<Drawer
					anchor='right'
					open={notifState}
					onClose={() => setNotif(false)}
				>
					<NotifItems setNotif={setNotif} />
				</Drawer>
			</AppBar>
		</div>
	);
};

export default NavBar;

const useStyles = makeStyles({
	navbar: {
		marginBottom: 70,
	},
	appbar: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: 'black',
	},
	list: {
		display: 'flex',
		flexDirection: 'column',
		width: 200,
		height: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	topHalfList: {
		marginTop: 25,
	},
	bottomHalfList: {
		justifySelf: 'end',
	},
	listItem: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	listItemText: {
		marginLeft: 10,
	},
	logo: {
		color: 'white',
		textDecoration: 'none',
	},
	logoOnMenu: {
		color: 'black',
		textDecoration: 'none',
	},
	buttonGroup: {
		color: 'black',
	},
	imgIcon: {
		height: '100%',
		width: '100%',
	},
});

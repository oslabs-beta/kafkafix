import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { RootState } from '../../state/reducers/index';
import { StartContainer } from './StartContainer/StartContainer';
import NavBar from './Sidepanel/NavBar';
import { TopicsTable } from './TopicsTable/TopicsTable';

export const HomeScreen: FC = () => {
	const email = useSelector((state: RootState) => state.user.email);

	return (
		<React.Fragment>
			<NavBar />
			<StartContainer />
			<TopicsTable />
			{/* <button onClick={()=>dispatch(logoutActionCreator())}>Sign Out</button> */}
			{!email && <Redirect to='/' />}
		</React.Fragment>
	);
};

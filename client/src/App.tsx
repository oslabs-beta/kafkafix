import React, { FC } from 'react';
import {
	HashRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

import { HomeScreen } from './containers/HomeScreen/HomeScreen';
import { FailureReportScreen } from './containers/FailureReports/FailureReportScreen';
import { MetricsScreen } from './containers/Metrics/MetricsScreen';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './state/reducers/index';
import { PartitionScreen } from './containers/PartitionScreen/PartitionScreen';
import { Groups } from './containers/HomeScreen/Sidepanel/Groups';
import { Login } from './containers/Authentication/Login';
import { appendMessageActionCreator } from './state/actions/actions';

const ws = new WebSocket('ws://localhost:3000');
ws.onopen = () => console.log('connected to websocket');

export const App: FC = () => {
	const email = useSelector((state: RootState) => state.user.email);
	const dispatch = useDispatch();

	ws.onmessage = (event: any) => {
		console.log('event data from ws', event.data);
		const array = event.data.split('message: ');
		const data = JSON.parse(array[1]);
		dispatch(appendMessageActionCreator(data));
		// if (!togglePause) setPageIndex(Math.floor(messages.length / pageSize));
	};
	return (
		<>
			<Router>
				<Switch>
					<Route path='/metrics' component={MetricsScreen} />
					<Route path='/failureReports' component={FailureReportScreen} />
					<Route
						path='/'
						exact
						render={() => (email.length ? <Redirect to='/home' /> : <Login />)}
					/>
					<Route path='/home' exact component={HomeScreen} />
					<Route path='/metrics' component={MetricsScreen} />
					<Route path='/failureReports' component={FailureReportScreen} />
					<Route path='/groups' component={Groups} />
					<Route
						path='/partition/:topic/:partitionID'
						render={props => (
							<PartitionScreen
								topic={props.match.params.topic}
								partitionID={props.match.params.partitionID}
							/>
						)}
					/>
				</Switch>
			</Router>
		</>
	);
};

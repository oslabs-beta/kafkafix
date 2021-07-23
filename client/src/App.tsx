import React, { FC } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

import HomeScreen from './containers/HomeScreen';
import { FailureReportScreen } from './containers/FailureReports/FailureReportScreen';
import { MetricsScreen } from './containers/Metrics/MetricsScreen';
import { useSelector } from 'react-redux';
import { overallState } from './state/reducers/index';
import { PartitionScreen } from './containers/PartitionScreen/PartitionScreen';
import { Groups } from './containers/HomeScreen/Sidepanel/Groups';
import { Login } from './containers/Authentication/Login';
import { UserState } from './state/reducers/userReducer';

const wss = new WebSocket('ws://localhost:3000');
wss.onopen = () => console.log('connected to websocket');

const App: FC = () => {
	const email = useSelector<overallState, UserState['email']>(
		state => state.user.email
	);

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
								ws={wss}
							/>
						)}
					/>
				</Switch>
			</Router>
		</>
	);
};

export default App;

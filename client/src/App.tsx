import React from 'react';
// app renders 1 component -- Home Screen --

// importing browser capabilities
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// importing HomeScreen and router components
import HomeScreen from './containers/HomeScreen';
import FailureReports from './containers/HomeScreen/FailureReports';
import Metrics from './containers/HomeScreen/Metrics';
import Partitions from './containers/HomeScreen/TopicsDisplay/Partitions';
import ws from './websocket';

const App: React.FC = () => {
	// const wss = ws();
	// wss.onmessage = (message: any) => {
	// 	console.log('client received: ', message.data);
	// };
	return (
		<>
			<div>KafkaFix logo</div>
			<Router>
				<Switch>
					<Route path='/' exact component={HomeScreen} />
					<Route path='/metrics' component={Metrics} />
					<Route path='/failureReports' component={FailureReports} />
					<Route path='/partition' component={Partitions} />
				</Switch>
			</Router>
		</>
	);
};

export default App;

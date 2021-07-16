import React, { FC } from 'react';
// app renders 1 component -- Home Screen --

// importing browser capabilities
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// importing HomeScreen and router components
import HomeScreen from "./containers/HomeScreen";
import { FailureReportScreen } from './containers/FailureReports/FailureReportScreen';
import { MetricsScreen } from "./containers/Metrics/MetricsScreen";
import Partitions from "./containers/HomeScreen/TopicsDisplay/Partitions";
import ws from "./websocket";
import { useDispatch, useSelector } from "react-redux";
import { appendMessageActionCreator } from "./state/actions/actions";
import { KafkaState } from "./state/reducers/kafkaDataReducer";
import { overallState } from "./state/reducers/index";
import { PartitionScreen } from "./containers/PartitionScreen/PartitionScreen";

const wss = ws();

import { MBeans } from '../../server/jmx/MBeans';
import { useFetch } from './hooks/useFetch';

const App: FC = () => {
	const dispatch = useDispatch();
	const messages = useSelector<overallState, KafkaState['messages']>(
		state => state.kafka.messages
	);
	console.log(messages);

<<<<<<< HEAD
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/metrics" component={MetricsScreen} />
          <Route path="/failureReports" component={FailureReportScreen} />
          <Route
            path="/partition/:topic/:partitionID"
            render={(props) => (
              <PartitionScreen
                topic={props.match.params.topic}
                partitionID={props.match.params.partitionID}
                ws={wss}
              />
            )}
          />
          {/* <Route path="/partition" component={PartitionScreen} /> */}
        </Switch>
      </Router>
    </>
  );
=======
	const ws = new WebSocket('ws://localhost:3000');
	ws.onopen = () => {
		console.log('connected to websocket for app');
		ws.send('App');
	};
	ws.onmessage = data => {
		console.log(data);
		// dispatch(appendNotifActionCreator(data));
	};

	const response = useFetch(
		`http://localhost:9090/api/v1/query?query=${MBeans.garbageCollectionTime}`
	);
	console.log('fetched', response);

	return (
		<>
			<Router>
				<Switch>
					<Route path='/' exact component={HomeScreen} />
					<Route path='/metrics' component={Metrics} />
					<Route path='/failureReports' component={FailureReports} />
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
					{/* <Route path="/partition" component={PartitionScreen} /> */}
				</Switch>
			</Router>
		</>
	);
>>>>>>> bfd786aa830ad378775eb5a0a17c83d7428aa444
};

export default App;

// render={() => {
// 	console.log('hit this block');
// 	return <Partitions />;
//   }}

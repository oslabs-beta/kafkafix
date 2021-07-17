import React, { FC } from 'react';
// app renders 1 component -- Home Screen --

// importing browser capabilities
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// importing HomeScreen and router components
import HomeScreen from './containers/HomeScreen';
import { FailureReportScreen } from './containers/FailureReports/FailureReportScreen';
import { MetricsScreen } from './containers/Metrics/MetricsScreen';
import Partitions from './containers/HomeScreen/TopicsDisplay/Partitions';
import ws from './websocket';
import { useDispatch, useSelector } from 'react-redux';
import { appendMessageActionCreator } from './state/actions/actions';
import { KafkaState } from './state/reducers/kafkaDataReducer';
import { overallState } from './state/reducers/index';
import { PartitionScreen } from './containers/PartitionScreen/PartitionScreen';

const wss = ws();

import { MBeans } from '../../server/jmx/MBeans';
import { useFetch } from './hooks/useFetch';

const App: FC = () => {
  const dispatch = useDispatch();
  const messages = useSelector<overallState, KafkaState['messages']>(
    (state) => state.kafka.messages
  );
  console.log(messages);

  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact component={HomeScreen} />
          <Route path='/metrics' component={MetricsScreen} />
          <Route path='/failureReports' component={FailureReportScreen} />
          <Route
            path='/partition/:topic/:partitionID'
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
};

export default App;

// render={() => {
// 	console.log('hit this block');
// 	return <Partitions />;
//   }}

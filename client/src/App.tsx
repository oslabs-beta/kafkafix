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
import { useDispatch, useSelector } from 'react-redux';
import { appendMessageActionCreator } from './state/actions/actions';
import { KafkaState } from './state/reducers/kafkaDataReducer';
import { overallState } from './state/reducers/index';
import { PartitionScreen } from './containers/PartitionScreen/PartitionScreen';

const App: React.FC = () => {
  const dispatch = useDispatch();
  // const messages = useSelector<overallState, KafkaState['messages']>(
  //   (state) => state.kafka.messages
  // );
  // console.log(messages);
  // const wss = ws();
  // wss.onmessage = (event: any) => {
  //   console.log('client received: ', event.data);
  //   // console.log('type of data for event.data', typeof event.data);
  //   const array = event.data.split('message: ');
  //   // console.log(array);
  //   // console.log(array[1]);
  //   const data = JSON.parse(array[1]);
  //   // console.log('data after parse', data);
  //   dispatch(appendMessageActionCreator(data));
  // };
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact component={HomeScreen} />
          <Route path='/metrics' component={Metrics} />
          <Route path='/failureReports' component={FailureReports} />
          <Route path='/partition' component={PartitionScreen} />
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

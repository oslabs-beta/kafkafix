import { combineReducers } from 'redux';
import { kafkaDataReducer, KafkaState } from './kafkaDataReducer';
import metricsReducer from './metricsReducer';
import sampleReducer from './sampleReducer';
import { userReducer } from './userReducer';

export interface overallState {
  sample: any;
  kafka: KafkaState;
}

//state = {
//   sample: sampleReducer({state1,state2})
//   kafka:kafkaDataReducer  ( {isConnected, data})
// }

const reducers = combineReducers({
  sample: sampleReducer,
  kafka: kafkaDataReducer,
  user: userReducer,
  metrics: metricsReducer,
});

export default reducers;

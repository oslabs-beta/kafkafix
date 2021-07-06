import { combineReducers } from 'redux';
import { kafkaDataReducer, KafkaState } from './kafkaDataReducer';
import sampleReducer from './sampleReducer';

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
});

export default reducers;

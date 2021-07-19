import { combineReducers } from 'redux';
import { kafkaDataReducer, KafkaState } from './kafkaDataReducer';
import { userReducer, UserState } from './userReducer';

export interface overallState {
  kafka: KafkaState;
  user: UserState
}

//state = {
//   sample: sampleReducer({state1,state2})
//   kafka:kafkaDataReducer  ( {isConnected, data})
// }

const reducers = combineReducers({
  kafka: kafkaDataReducer,
  user: userReducer,
});

export default reducers;
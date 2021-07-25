import { combineReducers } from 'redux';
import { kafkaDataReducer, KafkaState } from './kafkaDataReducer';
import { userReducer, UserState } from './userReducer';
import {metricsReducer, MetricsState} from './metricsReducer';

export interface RootState {
  kafka: KafkaState;
  user: UserState,
  metrics: MetricsState
}

const reducers = combineReducers({
  kafka: kafkaDataReducer,
  user: userReducer,
  metrics: metricsReducer,
});

export default reducers;

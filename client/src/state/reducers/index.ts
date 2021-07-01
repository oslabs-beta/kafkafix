import { combineReducers } from "redux";
import { kafkaDataReducer, KafkaState } from "./kafkaDataReducer";
import sampleReducer from "./sampleReducer";

export interface overallState {
  sample: any;
  kafka: KafkaState;
}

const reducers = combineReducers({
  sample: sampleReducer,
  kafka: kafkaDataReducer,
});

export default reducers;

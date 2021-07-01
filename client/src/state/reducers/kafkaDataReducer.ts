import { Type } from "../constants/constants";
import { Action } from "../actions/actions";

export interface TopicData {
  name: string;
  partitionNum: number;
  consumerNum: number;
  producerNum: number;
}

const dummy: TopicData = {
  name: "topic1",
  partitionNum: 12,
  consumerNum: 2,
  producerNum: 1,
};
export interface KafkaState {
  isConnected: boolean;
  topics: TopicData[];
}
const initialState: KafkaState = {
  isConnected: false,
  topics: [dummy, dummy, dummy],
};

export const kafkaDataReducer = (
  state: KafkaState = initialState,
  action: Action
): KafkaState => {
  switch (action.type) {
    case Type.CONNECTED:
      console.log("arrived here");
      return {
        ...state,
        isConnected: true,
      };
    case Type.DISCONNECTED:
      return {
        ...state,
        isConnected: false,
      };
    case Type.POPULATE_TOPICS:
      return {
        ...state,
        topics: action.payload,
      };
    default:
      return state;
  }
};

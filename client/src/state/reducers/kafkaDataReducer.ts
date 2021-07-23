import { Type } from '../constants/constants';
import { Action } from '../actions/actions';

export interface TopicData {
  name: string;
  partitionNum: number;
  consumerNum: number;
  producerNum: number;
}

export interface KafkaState {
  isConnected: boolean;
  data: any[];
  messages: any[];
  notif: any[];
}

const initialState: KafkaState = {
  isConnected: false,
  data: [],
  messages: [],
  notif: [],
};

export const kafkaDataReducer = (
  state: KafkaState = initialState,
  action: Action
): KafkaState => {
  switch (action.type) {
    case Type.CONNECTED:
      return {
        ...state,
        isConnected: true,
      };
    case Type.DISCONNECTED:
      return {
        ...state,
        isConnected: false,
      };
    case Type.POPULATE_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case Type.APPEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case Type.POPULATE_NOTIF:
      return {
        ...state,
        notif: action.payload,
      };
    case Type.APPEND_NOTIF:
      return {
        ...state,
        notif: [...state.notif, action.payload],
      };
    default:
      return state;
  }
};

import { Type } from "../constants/constants";
import { Action } from "../actions/actions";

export interface KafkaState {
  isConnected: boolean;
  data: DataEntries[];
  messages: Object[];
  errors: ErrorMessages[];
}

export interface DataEntries {
  topicName: string;
  partitions: number;
  partitionData: partitionDataEntries[];
}

export interface partitionDataEntries {
  id: number;
  partitionErrorCode: any;
  leader: boolean;
  replicas: any;
  isr: any;
}

interface ErrorMessages {
  level: string;
  namespace: string;
  message: string;
  error: string;
  clientId: string;
  broker: string;
  timestamp: string;
}

const initialState: KafkaState = {
  isConnected: false,
  data: [],
  messages: [],
  errors: [],
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
        errors: action.payload,
      };
    case Type.APPEND_NOTIF:
      return {
        ...state,
        errors: [...state.errors, action.payload],
      };
    default:
      return state;
  }
};

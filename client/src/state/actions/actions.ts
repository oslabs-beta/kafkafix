import { Type } from '../constants/constants';
import { KafkaState } from '../reducers/kafkaDataReducer';

export interface Action {
  type: number;
  payload?: any;
}

export const connectedActionCreator = (): Action => {
  return {
    type: Type.CONNECTED,
  };
};

export const disconnectedActionCreator = (): Action => {
  return {
    type: Type.DISCONNECTED,
  };
};

export const populateTopicsActionsCreator = (input: KafkaState[]): Action => {
  return {
    type: Type.POPULATE_TOPICS,
    payload: input,
  };
};

export const populateDataActionCreator = (input: any) => {
  return {
    type: Type.POPULATE_DATA,
    payload: input,
  };
};

export const appendMessageActionCreator = (input: any) => {
  return {
    type: Type.APPEND_MESSAGE,
    payload: input,
  };
};

export const populateNotifActionCreator = (input: any) => {
  return {
    type: Type.POPULATE_NOTIF,
    payload: input,
  };
};

import React, { FC, useState } from 'React';
import { useSelector, useDispatch } from 'react-redux';
import { KafkaState } from '../../state/reducers/kafkaDataReducer';
import { overallState } from '../../state/reducers/index';
import { MessageTable } from './MessageTable';
import { SideView } from './SideView';

interface PartitionScreenProps {
  topic: string;
  partitionID: string;
}

export const PartitionScreen: FC<PartitionScreenProps> = (props) => {
  const dispatch = useDispatch();
  // const messages = useSelector<overallState, KafkaState['messages']>(
  //   (state) => state.kafka.messages
  // );
  // console.log(messages);
  const [messages, setMessages] = useState<{}[]>([]);

  const ws = new WebSocket('ws://localhost:3000');
	ws.onopen = () => console.log('connected to websocket');
  ws.onmessage = (event: any) => {
    console.log('client received: ', event.data);
    // console.log('type of data for event.data', typeof event.data);
    const array = event.data.split('message: ');
    // console.log(array);
    // console.log(array[1]);
    const data = JSON.parse(array[1]);
    // console.log('data after parse', data);
    // dispatch(appendMessageActionCreator(data));
    setMessages([...messages, data]);
  };

  // const messages = useSelector<overallState, KafkaState['messages']>(
  //   (state) => state.kafka.messages
  // );
  return (
    <>
      <MessageTable messages={messages} />
      <SideView />
    </>
  );
};

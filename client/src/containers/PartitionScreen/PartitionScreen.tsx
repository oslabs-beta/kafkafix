import React, { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { KafkaState } from '../../state/reducers/kafkaDataReducer';
import { overallState } from '../../state/reducers/index';
import { MessageTable } from './MessageTable';
import { SideView } from './SideView';
import NavBar from '../HomeScreen/Sidepanel/NavBar';

interface PartitionScreenProps {
  topic: string;
  partitionID: string;
  ws: WebSocket;
}

export const PartitionScreen: FC<PartitionScreenProps> = ({
  topic,
  partitionID,
  ws,
}) => {
  const dispatch = useDispatch();
  const messages = useSelector<overallState, KafkaState['messages']>(
    (state) => state.kafka.messages
  );

  // console.log(messages);
  // const [messages, setMessages] = useState<{}[]>([]);

  // const ws = new WebSocket("ws://localhost:3000");
  // ws.onopen = () => console.log("connected to websocket");

  // const messages = useSelector<overallState, KafkaState['messages']>(
  //   (state) => state.kafka.messages
  // );
  return (
    <>
      <NavBar />
      <MessageTable messages={messages} ws={ws} setMessages={dispatch} />
      {/* <MessageTable messages={messages} setMessages={dispatch} /> */}
      <SideView />
    </>
  );
};

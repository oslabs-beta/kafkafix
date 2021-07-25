import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { KafkaState } from '../../state/reducers/kafkaDataReducer';
import { RootState } from '../../state/reducers/index';
import { MessageTable } from './MessageTable';
import NavBar from '../HomeScreen/Sidepanel/NavBar';

interface PartitionScreenProps {
	topic: string;
	partitionID: string;
}

export const PartitionScreen: FC<PartitionScreenProps> = ({
	topic,
	partitionID,
}) => {
	const dispatch = useDispatch();
	const messages = useSelector<RootState, KafkaState['messages']>(
		state => state.kafka.messages
	);

	return (
		<>
			<NavBar />
			<MessageTable messages={messages} setMessages={dispatch} />
		</>
	);
};

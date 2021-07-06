import React, { useState, useEffect } from 'react';
import wsCreator from '../../../websocket';

const Partitions = () => {
	const [messageList, setML] = useState<any[]>([]);
	useEffect(() => {
		const ws = wsCreator();
		ws.onmessage = (message: any) => {
			setML([...messageList, message.data]);
			console.log('client received: ', message.data);
		};
		ws.onclose = () => console.log('websocket closed');
	});
	const arr = [];
	for (let i = 0; i < messageList.length; i++) {
		arr.push(<div>{messageList[i]}</div>);
	}
	return <div>{arr}</div>;
};

export default Partitions;

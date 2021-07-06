// import WebSocket from "ws";

const ws = () => {
	const newWs = new WebSocket('ws://localhost:3000');
	newWs.onopen = () => console.log('connected to websocket');
	return newWs;
};

export default ws;
//ws.on('message', function incoming(data) {
//   display info
// });

// import WebSocket from "ws";

const ws = () => {
	const newWs = new WebSocket('ws://localhost:3000');
  console.log('start', newWs);
	newWs.onopen = () => console.log('connected to websocket');
  
  console.log('end', newWs);
	return newWs;
};

export default ws;
//ws.on('message', function incoming(data) {
//   display info
// });

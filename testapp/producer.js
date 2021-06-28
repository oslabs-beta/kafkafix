// requiring in client from client file
import client from './client';
// creating and exporting the publishing function (exporting because we are using a CLI to publish messages)
const publish = async (topic, message) => {
    try {
        // creating a producer from the producer function of the imported client
        const producer = client.producer();
        // awaiting connecting
        await producer.connect();
        // sending message
        await producer.send({
            topic: topic,
            messages: [{ value: message }],
        });
        console.log(`Message: ${message} sent to topic: ${topic}`);
        // awaiting disconnection
        await producer.disconnect();
    }
    catch (e) {
        console.log('error in sending message', e);
    }
};
let i = 0;
setTimeout(() => {
    publish('test-topic', `Message: ${i++}`);
}, 1000);
//# sourceMappingURL=producer.js.map
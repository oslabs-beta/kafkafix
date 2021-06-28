"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import kafkajs from dependecies
var kafkajs_1 = require("kafkajs");
// create an instance of kafka, passing in the clientId & brockers
// no broker discovery here - just passing in port of kafka
var kafka = new kafkajs_1.Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'],
});
console.log(kafka);
exports.default = kafka;
//# sourceMappingURL=client.js.map
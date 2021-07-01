"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
<<<<<<< HEAD
var kafkaDataReducer_1 = require("./kafkaDataReducer");
var sampleReducer_1 = __importDefault(require("./sampleReducer"));
var reducers = redux_1.combineReducers({
    sample: sampleReducer_1.default,
    kafka: kafkaDataReducer_1.kafkaDataReducer,
=======
var sampleReducer_1 = __importDefault(require("./sampleReducer"));
var reducers = redux_1.combineReducers({
    sample: sampleReducer_1.default,
>>>>>>> 1a63151de50e787b527c61336deb16d6e63ee56e
});
exports.default = reducers;

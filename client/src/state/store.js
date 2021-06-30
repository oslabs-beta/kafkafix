"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
// import { composeWithDevTools } from 'redux-devtools-extension';
var reducers_1 = __importDefault(require("./reducers"));
var store = redux_1.createStore(reducers_1.default);
exports.default = store;

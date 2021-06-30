"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var sampleReducer_1 = __importDefault(require("./sampleReducer"));
var reducers = redux_1.combineReducers({
    sample: sampleReducer_1.default,
});
exports.default = reducers;

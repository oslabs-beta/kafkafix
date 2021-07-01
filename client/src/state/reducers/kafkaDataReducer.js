"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kafkaDataReducer = void 0;
var constants_1 = require("../constants/constants");
var dummy = {
    name: "topic1",
    partitionNum: 12,
    consumerNum: 2,
    producerNum: 1,
};
var initialState = {
    isConnected: false,
    topics: [dummy, dummy, dummy],
};
var kafkaDataReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case constants_1.Type.CONNECTED:
            console.log("arrived here");
            return __assign(__assign({}, state), { isConnected: true });
        case constants_1.Type.DISCONNECTED:
            return __assign(__assign({}, state), { isConnected: false });
        case constants_1.Type.POPULATE_TOPICS:
            return __assign(__assign({}, state), { topics: action.payload });
        default:
            return state;
    }
};
exports.kafkaDataReducer = kafkaDataReducer;

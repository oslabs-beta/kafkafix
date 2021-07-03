"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateTopicsActionsCreator = exports.disconnectedActionCreator = exports.connectedActionCreator = void 0;
var constants_1 = require("../constants/constants");
var connectedActionCreator = function () {
    return {
        type: constants_1.Type.CONNECTED,
    };
};
exports.connectedActionCreator = connectedActionCreator;
var disconnectedActionCreator = function () {
    return {
        type: constants_1.Type.DISCONNECTED,
    };
};
exports.disconnectedActionCreator = disconnectedActionCreator;
var populateTopicsActionsCreator = function (input) {
    return {
        type: constants_1.Type.POPULATE_TOPICS,
        payload: input,
    };
};
exports.populateTopicsActionsCreator = populateTopicsActionsCreator;

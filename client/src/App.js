"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
// app renders 1 component -- Home Screen --
// importing HomeScreen
var HomeScreen_1 = __importDefault(require("./containers/HomeScreen"));
var App = function () {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", null, "KafkaFix logo"),
        react_1.default.createElement(HomeScreen_1.default, null)));
};
exports.default = App;

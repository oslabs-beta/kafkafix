"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
// Home screen renders two componenets - the left panel (Sidepane) and the right topics display (topicsDisplay)
// importing Sidepane component
var Sidepanel_1 = __importDefault(require("./HomeScreen/Sidepanel"));
// importing TopicsDisplay
var TopicsDisplay_1 = __importDefault(require("./HomeScreen/TopicsDisplay"));
var HomeScreen = function () {
    return (react_1.default.createElement("div", { className: "homeScreen" },
        react_1.default.createElement("h1", null, "Homescreen"),
        react_1.default.createElement(Sidepanel_1.default, null),
        react_1.default.createElement(TopicsDisplay_1.default, null)));
};
exports.default = HomeScreen;

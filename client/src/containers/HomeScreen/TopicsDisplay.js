"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
<<<<<<< HEAD
var react_redux_1 = require("react-redux");
var TopicRow_1 = require("./TopicRow");
var TopicsDisplay = function (props) {
    var isConnected = react_redux_1.useSelector(function (state) { return state.kafka.isConnected; });
    var topicsArr = react_redux_1.useSelector(function (state) {
        return state.kafka.topics;
    });
    // console.log(topicsArr);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("table", { className: "topicsDisplay" },
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", null, "Topics"),
                    react_1.default.createElement("th", null, "Partitions"),
                    react_1.default.createElement("th", null, "Consumers"),
                    react_1.default.createElement("th", null, "Products"))),
            react_1.default.createElement("tbody", null, isConnected &&
                topicsArr.map(function (el, i) { return (react_1.default.createElement(TopicRow_1.TopicRow, { key: i, name: el.name, partitionNum: el.partitionNum, consumerNum: el.consumerNum, producerNum: el.producerNum })); })))));
=======
var TopicsDisplay = function () {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h1", null, "Topics Diplay")));
>>>>>>> 1a63151de50e787b527c61336deb16d6e63ee56e
};
exports.default = TopicsDisplay;

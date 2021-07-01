"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicRow = void 0;
var react_1 = __importDefault(require("react"));
var TopicRow = function (props) {
    var handleClickTopic = function (e) {
        console.log(e.target);
    };
    return (react_1.default.createElement("tr", { onClick: handleClickTopic },
        react_1.default.createElement("td", null, props.name),
        react_1.default.createElement("td", null, props.partitionNum),
        react_1.default.createElement("td", null, props.consumerNum),
        react_1.default.createElement("td", null, props.producerNum)));
};
exports.TopicRow = TopicRow;

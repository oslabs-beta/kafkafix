"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var NavBar = function () {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { id: "metrics", className: "navBlock" },
            react_1.default.createElement("i", { className: "fas fa-circle-notch" }),
            react_1.default.createElement("div", null, "Metrics"),
            react_1.default.createElement("a", null, "Key insights into your Kafka system")),
        react_1.default.createElement("div", { id: "failureReports", className: "navBlock" },
            react_1.default.createElement("i", { className: "fas fa-print" }),
            react_1.default.createElement("div", null, "Failure Report"),
            react_1.default.createElement("a", null, "Key insights into your Kafka system")),
        react_1.default.createElement("div", { id: "darkMode", className: "navBlock" },
            react_1.default.createElement("i", { className: "fas fa-cog" }),
            "Dark Mode"),
        react_1.default.createElement("div", { id: "documentation", className: "navBlock" },
            react_1.default.createElement("i", { className: "fas fa-info-circle" }),
            "Documentation")));
};
exports.default = NavBar;

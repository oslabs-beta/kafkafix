"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
// importing Connect
var Connect_1 = __importDefault(require("./Sidepane/Connect"));
// importing Navbar
var NavBar_1 = __importDefault(require("./Sidepane/NavBar"));
var Sidepane = function () {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h1", null, "Sidepane"),
        react_1.default.createElement("div", null,
            react_1.default.createElement(Connect_1.default, null)),
        react_1.default.createElement("div", null,
            react_1.default.createElement(NavBar_1.default, null))));
};
exports.default = Sidepane;

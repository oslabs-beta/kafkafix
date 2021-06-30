"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var Connect = function () {
    // display form function -> onSubmit -> send fetch request to backend with Broker URI
    var _a = react_1.useState(false), form = _a[0], setForm = _a[1];
    var returnForm = function () {
        return (react_1.default.createElement("form", null,
            react_1.default.createElement("label", null, "Enter Your Broker ID"),
            react_1.default.createElement("input", { id: 'brokerID', name: 'brokerID', placeholder: 'localhost:9092' }),
            react_1.default.createElement("button", null, "Connect")));
    };
    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   const inputField = document.querySelector('#brokerID');
    //   // setForm(true);
    //   const formData: any = new FormData(e.target);
    //   for (let [key, value] of formData.entries()) {
    //     formData[key] = value;
    //   }
    //   console.log('form data object => ', formData);
    //   const options = {
    //     method: 'POST',
    //     headers: { 'content-type': 'application/json' },
    //     body: JSON.stringify(formData),
    //   };
    //   fetch('/api', options);
    // };
    return (
    // display form on click - using state
    react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("button", { onClick: function () { return setForm(true); } }, " Connect Your Broker URI"),
        form ? returnForm() : null));
};
exports.default = Connect;

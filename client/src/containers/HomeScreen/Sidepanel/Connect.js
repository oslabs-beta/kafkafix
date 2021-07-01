"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var actions_1 = require("../../../state/actions/actions");
var Connect = function (props) {
    // display form function -> onSubmit -> send fetch request to backend with Broker URI
    var isConnected = react_redux_1.useSelector(function (state) { return state.kafka.isConnected; });
    var dispatch = react_redux_1.useDispatch();
    dispatch(actions_1.connectedActionCreator());
    console.log(isConnected);
    var handleSubmit = function (e) {
        e.preventDefault();
        var method;
        var body;
        var inputField;
        if (!isConnected) {
            method = "POST";
            inputField = document.querySelector("#brokerID");
            console.log(inputField);
            if (inputField)
                console.log(inputField.value);
            // if (inputField?.value)
            if (inputField && parseInt(inputField.value)) {
                // move down to fetch
                // inputField.setAttribute("disabled", "true");
                // edit body
                body = JSON.stringify({ brokerID: inputField.value });
            }
            else {
                alert("Cannot connect because Broker ID field is empty");
                return;
            }
        }
        else {
            method = "PUT";
            //edit the body
            body = JSON.stringify({});
        }
        var options = {
            method: method,
            headers: { "content-type": "application/json" },
            body: body,
        };
        // move down into fetch
        //edit the fetch api
        // fetch("/api", options)
        //   .then((data) => {
        //     setConnect(true);
        //   })
        //   .catch((e) => {
        //     console.log(e);
        //   });
    };
    return (
    // display form on click - using state
    react_1.default.createElement("div", null,
        react_1.default.createElement("form", { onSubmit: handleSubmit },
            react_1.default.createElement("div", null,
                react_1.default.createElement("label", null, "Enter Your Broker Port Number")),
            react_1.default.createElement("input", { id: "brokerID", name: "brokerID", placeholder: "Your Broker Port Number", pattern: "[0-9]+" }),
            react_1.default.createElement("button", null, isConnected ? "Disconnect" : "Connect"))));
};
exports.default = Connect;

import React, { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { KafkaState } from "../../../state/reducers/kafkaDataReducer";
import { overallState } from "../../../state/reducers";
import { connectedActionCreator } from "../../../state/actions/actions";
import WebSocket from "ws";

interface Options {
  headers: {};
  body: string;
  method: string;
}
// export let ws: any;

const Connect: FC = (props) => {
  // display form function -> onSubmit -> send fetch request to backend with Broker URI
  const isConnected = useSelector<overallState, KafkaState["isConnected"]>(
    (state) => state.kafka.isConnected
  );

  const dispatch = useDispatch();
  // dispatch(connectedActionCreator());
  console.log(isConnected);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let method;
    let inputField: HTMLInputElement | null =
      document.querySelector("#brokerID");
    let body;
    if (inputField) {
      console.log(inputField.value);
      // move down to fetch
      body = JSON.stringify({ PORT: inputField.value });
      // inputField.setAttribute("disabled", "true");
    } else {
      alert("Cannot connect because Broker ID field is empty");
      return;
    }

    if (!isConnected) {
      method = "POST";
      console.log(inputField);
    } else {
      method = "PUT";
    }

    const options: Options = {
      method,
      headers: { "content-type": "application/json" },
      body,
    };
    // move down into fetch

    //edit the fetch api
    fetch("/api/connect", options)
      .then((data) => {
        console.log(data);
        // ws = new WebSocket("ws://localhost:3000");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    // display form on click - using state
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter Your Broker Port Number</label>
        </div>
        <input
          id="brokerID"
          name="brokerID"
          placeholder="Your Broker Port Number"
          pattern="[0-9]+"
        ></input>
        <button>{isConnected ? "Disconnect" : "Connect"}</button>
      </form>
    </div>
  );
};

export default Connect;

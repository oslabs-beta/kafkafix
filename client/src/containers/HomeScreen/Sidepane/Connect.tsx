import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { KafkaState } from "../../../state/reducers/kafkaDataReducer";
import { overallState } from "../../../state/reducers";

interface options {
  headers: string;
  body: string;
  method: string;
}

const Connect: FC = (props) => {
  // display form function -> onSubmit -> send fetch request to backend with Broker URI
  const isConnected = useSelector<overallState, KafkaState["isConnected"]>(
    (state) => state.kafka.isConnected
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let method;
    let body;
    let inputField: HTMLInputElement | null;
    if (!isConnected) {
      method = "POST";
      inputField = document.querySelector("#brokerID");
      console.log(inputField);
      if (inputField) console.log(inputField.value);
      // if (inputField?.value)
      if (inputField && parseInt(inputField.value)) {
        // move down to fetch
        // inputField.setAttribute("disabled", "true");

        // edit body
        body = JSON.stringify({ brokerID: inputField.value });
      } else {
        alert("Cannot connect because Broker ID field is empty");
        return;
      }
    } else {
      method = "PUT";
      //edit the body
      body = JSON.stringify({});
    }

    const options = {
      method,
      headers: { "content-type": "application/json" },
      body,
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

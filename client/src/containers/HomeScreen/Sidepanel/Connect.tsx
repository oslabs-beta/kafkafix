import React, { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { KafkaState } from '../../../state/reducers/kafkaDataReducer';
import { overallState } from '../../../state/reducers';
import { connectedActionCreator } from '../../../state/actions/actions';
import WebSocket from 'ws';

// importing componenets from Material UI
import {
  Button,
  Card,
  List,
  Divider,
  Typography,
  Input,
  makeStyles,
} from '@material-ui/core';

interface Options {
  headers: {};
  body: string;
  method: string;
}
// export let ws: any;

// styles for connect Component
const useStyles = makeStyles({
  form: {
    alignSelf: 'start',
    margin: 30,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    width: 'auto',
    // justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    boxShadow: '10px 5px 5px lightgrey;',
  },
  title: {
    fontWeight: 'bold',
  },
  input: {},
  button: {
    marginTop: 10,
    backgroundColor: 'red',
  },
});

const Connect: FC = (props) => {
  // display form function -> onSubmit -> send fetch request to backend with Broker URI
  const isConnected = useSelector<overallState, KafkaState['isConnected']>(
    (state) => state.kafka.isConnected
  );

  const dispatch = useDispatch();
  dispatch(connectedActionCreator());
  console.log(isConnected);

  // creating a classes variable to customize styles
  const classes = useStyles();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let method;
    let inputField: HTMLInputElement | null =
      document.querySelector('#brokerID');
    let body;
    if (inputField) {
      console.log(inputField.value);
      // move down to fetch
      body = JSON.stringify({ PORT: inputField.value });
      // inputField.setAttribute("disabled", "true");
    } else {
      alert('Cannot connect because Broker ID field is empty');
      return;
    }

    if (!isConnected) {
      method = 'POST';
      console.log(inputField);
    } else {
      method = 'PUT';
    }

    const options: Options = {
      method,
      headers: { 'content-type': 'application/json' },
      body,
    };
    // move down into fetch

    //edit the fetch api
    fetch('/api/connect', options)
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

    <form onSubmit={handleSubmit} className={classes.form}>
      <Card className={classes.card}>
        <Typography variant='h6' className={classes.title}>
          Enter Your Broker Port Number
        </Typography>
        <Divider></Divider>
        <Input
          id='brokerID'
          name='brokerID'
          type='number'
          placeholder='9092'
          required={true}
          autoFocus={true}
        ></Input>
        <Button className={classes.button} variant='contained' color='primary'>
          {isConnected ? 'Disconnect' : 'Connect'}
        </Button>
      </Card>
    </form>
  );
};

export default Connect;

// <div>
//   <label>Enter Your Broker Port Number</label>
// </div>
// <input
//   id='brokerID'
//   name='brokerID'
//   placeholder='Your Broker Port Number'
//   pattern='[0-9]+'
// ></input>
// <button>{isConnected ? 'Disconnect' : 'Connect'}</button>

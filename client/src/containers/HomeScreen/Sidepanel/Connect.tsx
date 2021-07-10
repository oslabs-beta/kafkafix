import React, { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { KafkaState } from '../../../state/reducers/kafkaDataReducer';
import { overallState } from '../../../state/reducers';
import {
  connectedActionCreator,
  populateDataActionCreator,
} from '../../../state/actions/actions';
import { populateData } from '../../../helperFunctions/populateData';
import WebSocket from 'ws';

// importing electron and fileSystem modules
import electron from 'electron';
import path from 'path';
import fs from 'fs';

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

// const createData = (
//   topicName: string,
//   partitions: number,
//   partitionData: any
// ) => {
//   return {
//     topicName: topicName,
//     partitions: partitions,
//     partitionData: partitionData.map((el: any) => ({
//       id: el.partitionId,
//       partitionErrorCode: el.partitionErrorCode,
//       leader: !!el.leader,
//       replicas: el.replicas[0],
//       isr: el.isr[0],
//     })),
//   };
// };

const Connect: FC = (props) => {
  // display form function -> onSubmit -> send fetch request to backend with Broker URI
  const isConnected = useSelector<overallState, KafkaState['isConnected']>(
    (state) => state.kafka.isConnected
  );

  const dispatch = useDispatch();

  console.log('from connect component =>', isConnected);

  // creating a classes variable to customize styles
  const classes = useStyles();

  const handleSubmit = (e: any) => {
    console.log('make it inside handlesubmit');
    e.preventDefault();
    let method;
    let inputField: HTMLInputElement | null =
      document.querySelector('#brokerID');
    let body;
    if (inputField) {
      console.log(inputField.value);
      // move down to fetch
      body = JSON.stringify({ PORT: inputField.value });
    } else {
      alert('Cannot connect because Broker ID field is empty');
      return;
    }

    if (!isConnected) {
      method = 'POST';
      console.log('106 =>', inputField);
    } else {
      method = 'PUT';
    }

    const options: Options = {
      method,
      headers: { 'content-type': 'application/json' },
      body,
    };
    // move down into fetch
    console.log(options);
    //edit the fetch api
    fetch('/api/connect', options)
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        // const { metadata: { topics: array } } = data;
        // const array = data.metadata.topics;
        // const rows = array.map( (el:any) => createData(el.name, el.partitions.length, el.partitions));
        // dispatch(populateDataActionCreator(rows));
        dispatch(connectedActionCreator());
        populateData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleUpload = (e: any) => {
    // first we need to get the filePath, then read the file using the filePath then send it to backend

    console.log('made it inside handleUpload function in Connect.Tsx');

    // Importing dialog module using remote
    const dialog = electron.remote.dialog;

    // Initializing a file path Variable to store user-selected file
    // let filePath = undefined;

    // if using Windows or Linux
    if (process.platform !== 'darwin') {
      // Resolves to a Promise<Object>
      dialog
        .showOpenDialog({
          title: 'Select your docker-compose file',
          defaultPath: path.join(__dirname, '../assets/'),
          buttonLabel: 'Upload',
          // Restricting the user to only YML Files.
          filters: [
            {
              name: 'YML file',
              extensions: ['yml'],
            },
          ],
          // Specifying the File Selector Property
          properties: ['openFile'],
        })
        .then((file) => {
          // if file wasn't canceled
          if (!file.canceled) {
            const filePath: string = file.filePaths[0].toString();
            console.log(filePath);

            // sending the file info to back end
            if (filePath && !file.canceled) {
              const formData = new FormData();
              const stream = fs.createReadStream(filePath);
              stream.on('data', (chunk: Buffer | string) => {
                if (typeof chunk !== 'string') chunk = chunk.toString();
                formData.append('file', chunk);
              });

              // options for fetch request
              const options = {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
                body: JSON.stringify(formData),
              };

              fetch('/api/dockerfile', options).catch((e) =>
                console.log('error in sending fetch request for file', e)
              );
            }
          }
        })
        .catch((e) => console.log('error in upload => ', e));
    }
    // if using MacOS
    else {
      dialog
        .showOpenDialog({
          title: 'Select your docker-compose file',
          defaultPath: path.join(__dirname, '../assets/'),
          buttonLabel: 'Upload',
          // Restricting the user to only YML Files.
          filters: [
            {
              name: 'YML file',
              extensions: ['yml'],
            },
          ],
          // Specifying the File Selector and Directory selector Property In macOS
          properties: ['openFile', 'openDirectory'],
        })
        .then((file) => {
          if (!file.canceled) {
            const filePath: string = file.filePaths[0].toString();
            console.log(filePath);

            // sending the file info to back end
            if (filePath && !file.canceled) {
              const formData = new FormData();
              const stream = fs.createReadStream(filePath);
              stream.on('data', (chunk: Buffer | string) => {
                if (typeof chunk !== 'string') chunk = chunk.toString();
                formData.append('file', chunk);
              });

              // options for fetch request
              const options = {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
                body: JSON.stringify(formData),
              };

              fetch('/api/dockerfile', options).catch((e) =>
                console.log('error in sending fetch request for file', e)
              );
            }
          }
        })
        .catch((e) => console.log('error in uplaoding file', e));
    }
  };

  return (
    <form className={classes.form}>
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
          // required={true}
          autoFocus={true}
        ></Input>
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          onClick={handleSubmit}
        >
          {isConnected ? 'Disconnect' : 'Connect'}
          {/* {isConnected && <Redirect to='/partition'/>} */}
        </Button>
        <Typography variant='h6' className={classes.title}>
          OR Upload Your Docker-compose File
        </Typography>
        <Button
          className={classes.button}
          variant='contained'
          color='secondary'
          id='uploadButton'
          //  onClick={handleUpload}
        >
          Upload
        </Button>
      </Card>
    </form>
  );
};

export default Connect;

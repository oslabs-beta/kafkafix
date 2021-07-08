import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import wsCreator from '../../../websocket';
import NavBar from '../Sidepanel/NavBar';
import { KafkaState } from '../../../state/reducers/kafkaDataReducer';
import { overallState } from '../../../state/reducers/index';
// importing componenets from Material UI
import {
  Button,
  Card,
  List,
  Divider,
  Typography,
  makeStyles,
  CardContent,
} from '@material-ui/core';

// styles for connect Component
const useStyles = makeStyles({
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
});

const Partitions = () => {
  const classes = useStyles();

  console.log('we are in partitions');
  const messages = useSelector<overallState, KafkaState['messages']>(
    (state) => state.kafka.messages
  );
  console.log(messages);
  // const [messageList, setML] = useState<any[]>([
  //   {
  //     'full name': 'Kurt Miller',
  //     address: { street: '6997 Mills Heights', city: 'Ba' },
  //     'Bitcoin Address': '1GYv9z3o2o9HVam3wtPSxxWwnpy1knr8SD',
  //     'Product Name': 'Tasty Steel Chair',
  //     Price: '$382.79',
  //   },
  // ]);

  // const ws = wsCreator();
  // console.log('line 38');
  // ws.onmessage = (message: any) => {
  //   console.log('please');
  //   console.log('client received: ', message.data);
  //   setML([...messageList, message.data]);
  //   console.log(messageList);
  // };
  // ws.onclose = () => console.log('websocket closed');
  // useEffect(() => {
  // });

  // console.log('help');

  const arr = [];
  for (let i = 0; i < messages.length; i++) {
    console.log(messages[i]);
    arr.push(
      <React.Fragment key={messages.length - 1 - i}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant='h6'>
              {messages[messages.length - 1 - i]['full name']}
            </Typography>
            <Typography variant='h6'>
              {messages[messages.length - 1 - i].address.street}
            </Typography>
            <Typography variant='h6'>
              {messages[messages.length - 1 - i].address.city}
            </Typography>
            <Typography variant='h6'>
              {messages[i]['Bitcoin Address']}
            </Typography>
            <Typography variant='h6'>
              {messages[messages.length - 1 - i]['Product Name']}
            </Typography>
            <Typography variant='h6'>
              {messages[messages.length - 1 - i].Price}
            </Typography>
          </CardContent>
        </Card>
      </React.Fragment>
    );
  }
  return (
    <>
      <NavBar />
      <h1>We are in partitions</h1>
      {arr}
    </>
  );
};

export default Partitions;

/* {"full name":"Kurt Miller","address":{"street":"6997 Mills Heights","city":"Ba"},"Bitcoin Address":"1GYv9z3o2o9HVam3wtPSxxWwnpy1knr8SD","Product Name":"Tasty Steel Chair","Price":"$382.79"}
 */

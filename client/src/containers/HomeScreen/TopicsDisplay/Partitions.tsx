import React, { useState, useEffect } from 'react';
import wsCreator from '../../../websocket';

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

  const [messageList, setML] = useState<any[]>([]);
  useEffect(() => {
    const ws = wsCreator();
    ws.onmessage = (message: any) => {
      setML([...messageList, message.data]);
      console.log('client received: ', message.data);
    };
    ws.onclose = () => console.log('websocket closed');
  });
  const arr = [];
  for (let i = 0; i < messageList.length; i++) {
    console.log(messageList[i]);
    arr.push(
      <React.Fragment>
        <Card className={classes.card}>
          <CardContent>
            <Typography>{messageList[i]['full name']}</Typography>
            <Typography>{messageList[i]['address']}</Typography>
            <Typography>{messageList[i]['street']}</Typography>
            <Typography>{messageList[i]['city']}</Typography>
            <Typography>{messageList[i]['Bitcoin Address']}</Typography>
            <Typography>{messageList[i]['Product Name']}</Typography>
            <Typography>{messageList[i]['Price']}</Typography>
          </CardContent>
        </Card>
      </React.Fragment>
    );
  }
  return <>{arr}</>;
};

export default Partitions;

/* {"full name":"Kurt Miller","address":{"street":"6997 Mills Heights","city":"Ba"},"Bitcoin Address":"1GYv9z3o2o9HVam3wtPSxxWwnpy1knr8SD","Product Name":"Tasty Steel Chair","Price":"$382.79"}
 */

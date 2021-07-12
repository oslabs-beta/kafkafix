import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import wsCreator from "../../../websocket";
import NavBar from "../Sidepanel/NavBar";
import { KafkaState } from "../../../state/reducers/kafkaDataReducer";
import { overallState } from "../../../state/reducers/index";
import { appendMessageActionCreator } from "../../../state/actions/actions";
// importing componenets from Material UI
import {
  Button,
  Card,
  List,
  Divider,
  Typography,
  makeStyles,
  CardContent,
} from "@material-ui/core";

// styles for connect Component
const useStyles = makeStyles({
  card: {
    display: "flex",
    flexDirection: "column",
    height: "auto",
    width: "auto",
    // justifyContent: 'space-around',
    alignItems: "center",
    padding: 10,
    boxShadow: "10px 5px 5px lightgrey;",
  },
  div: {
    marginBottom: 30,
  },
  text: {
    fontWeight: "bold",
  },
});

const Partitions = () => {
  const classes = useStyles();

  // console.log('we are in partitions');
  const dispatch = useDispatch();
  const messages = useSelector<overallState, KafkaState["messages"]>(
    (state) => state.kafka.messages
  );

  const wss = new WebSocket("ws://localhost:3000");
  console.log("wss: ", wss);
  wss.onopen = () => console.log("connected to websocket");
  wss.onmessage = (event: any) => {
    console.log("client received: ");
    // console.log('type of data for event.data', typeof event.data);
    const array = event.data.split("message: ");
    // console.log(array);
    // console.log(array[1]);
    const data = JSON.parse(array[1]);
    // console.log('data after parse', data);
    dispatch(appendMessageActionCreator(data));
    console.log(messages);
  };
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
            <Typography variant="h6" className={classes.text}>
              Name: {messages[messages.length - 1 - i]["full name"]}
            </Typography>
            <Typography variant="subtitle1">
              Street: {messages[messages.length - 1 - i].address.street}
            </Typography>
            <Typography variant="subtitle1">
              City: {messages[messages.length - 1 - i].address.city}
            </Typography>
            <Typography variant="body1">
              BitCoin Address: {messages[i]["Bitcoin Address"]}
            </Typography>
            <Typography variant="body2" className={classes.text}>
              Product Name: {messages[messages.length - 1 - i]["Product Name"]}
            </Typography>
            <Typography variant="body2" className={classes.text}>
              Price: {messages[messages.length - 1 - i].Price}
            </Typography>
          </CardContent>
        </Card>
      </React.Fragment>
    );
  }
  return (
    <>
      <NavBar />
      <div className={classes.div}></div>
      {arr}
    </>
  );
};

export default Partitions;

/* {"full name":"Kurt Miller","address":{"street":"6997 Mills Heights","city":"Ba"},"Bitcoin Address":"1GYv9z3o2o9HVam3wtPSxxWwnpy1knr8SD","Product Name":"Tasty Steel Chair","Price":"$382.79"}
 */

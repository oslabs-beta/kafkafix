import React, { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { overallState } from "../../../state/reducers";
import { KafkaState } from "../../../state/reducers/kafkaDataReducer";
import { TopicRow } from "./TopicRow";
import { populateData } from "../../../helperFunctions/populateData";
import { TopicModal } from "./TopicModal";
import { ProducerModal } from "./ProducerModal";
import { ConsumerModal } from "./ConsumerModal";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
} from "@material-ui/core";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  tableWrapper: {
    margin: 30,
  },
  buttonsWrapper: {
    display: "flex",
    justifyContent: "space-around",
  },
  tableHeaderRow: {
    backgroundColor: "black",
  },
  tableHeaderText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonNotSelected: {
    backgroundColor: "white",
  },
  buttonSelected: {
    backgroundColor: "blue",
  },
  partitionButtons: {
    backgroundColor: "white",
  },
  primaryButtons: {
    backgroundColor: "white",
    justifySelf: "center",
    color: "black",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  insideModalDiv: {
    display: "flex",
    width: 300,
    height: 300,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "5%",
  },
  button: {
    marginTop: 10,
    backgroundColor: "red",
  },
});

interface Options {
  method: string;
  body: string;
  headers: any;
}

export const TopicsDisplay: FC = () => {
  const classes = useRowStyles();
  const isConnected = useSelector<overallState, KafkaState["isConnected"]>(
    (state) => state.kafka.isConnected
  );

  const rows = useSelector<overallState, KafkaState["data"]>(
    (state) => state.kafka.data
  );

  const [modalForCreateTopic, setModalForCreateTopic] = useState(false);
  const [modalForProducer, setModalForProducer] = useState(false);
  const [modalForConsumer, setModalForConsumer] = useState(false);

  const [isConsumerStarted, setIsConsumerStarted] = useState(false);
  const [isProducerStarted, setIsProducerStarted] = useState(false);

  const dispatch = useDispatch();

  const toggleConsumerModal = () => {
    setModalForConsumer(!modalForConsumer);
  };

  const handleClickProducerButton = () => {
    if (isProducerStarted) {
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      };
      fetch("http://localhost:3000/api/producer", options)
        .then((data) => data.json())
        .then((data) => {
          setIsProducerStarted(false);
          console.log("res from stopping producer", data);
        })
        .catch((e) => console.log(e));
    } else setModalForProducer(true);
  };

  const handleClickConsumerButton = () => {
    if (isConsumerStarted) {
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      };
      fetch("http://localhost:3000/api/consumer", options)
        .then((data) => data.json())
        .then((data) => {
          setIsConsumerStarted(false);
          console.log("res from stopping consumer", data);
        })
        .catch((e) => console.log(e.target));
    } else setModalForConsumer(true);
  };

  const deleteTopicHandler = (topicName: String) => {
    console.log("delete topic topic name", topicName);
    const options: Options = {
      method: "DELETE",
      body: JSON.stringify({ topic: topicName }),
      headers: { "Content-Type": "application/json" },
    };

    fetch("http://localhost:3000/api/topic", options)
      .then((data) => data.json())
      .then((data) => {
        populateData(data, dispatch);
      })
      .catch((e) => console.log("error in deleting topic, ", e));
  };

  return (
    <React.Fragment>
      <TableContainer component={Paper} className={classes.tableWrapper}>
        <Paper className={classes.buttonsWrapper}>
          <Button
            size="small"
            variant="text"
            className={classes.primaryButtons}
            onClick={() => setModalForCreateTopic(true)}
          >
            Create Topic
          </Button>

          <Button
            size="small"
            variant="text"
            onClick={handleClickProducerButton}
            className={classes.primaryButtons}
          >
            {!isProducerStarted ? "Start Producer" : "Stop Producer"}
          </Button>

          <Button
            size="small"
            onClick={handleClickConsumerButton}
            variant="text"
            className={classes.primaryButtons}
          >
            {!isConsumerStarted ? "Start Consumer" : "Stop Consumer"}
          </Button>
        </Paper>
        <Table aria-label="collapsible table">
          {/* Table Head */}
          <TableHead>
            <TableRow className={classes.tableHeaderRow}>
              <TableCell />
              <TableCell className={classes.tableHeaderText}>
                Topic Name
              </TableCell>
              <TableCell className={classes.tableHeaderText}>
                Partitions
              </TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body*/}
          {isConnected && (
            <TableBody>
              {rows.map((row: any) => (
                <React.Fragment>
                  <TopicRow key={row.topicName} row={row} />
                  {/* // delete a topic */}
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => deleteTopicHandler(row.topicName)}
                  >
                    Delete
                  </Button>
                </React.Fragment>
              ))}
            </TableBody>
            // create a topic
          )}
        </Table>

        {/* Modal for Creating a new topic */}
        <TopicModal
          modalStatus={modalForCreateTopic}
          setModalStatus={setModalForCreateTopic}
        />

        {/* Modal for Producer */}
        <ProducerModal
          modalStatus={modalForProducer}
          setModalStatus={setModalForProducer}
          setProducerButton={setIsProducerStarted}
        />

        {/* Modal for Consumer */}
        <ConsumerModal
          modalStatus={modalForConsumer}
          setModalStatus={setModalForConsumer}
          setConsumerButton={setIsConsumerStarted}
        />
      </TableContainer>
    </React.Fragment>
  );
};

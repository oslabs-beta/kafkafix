import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { MTPaginationOptions } from "./MTPaginationOptions";
import { appendMessageActionCreator } from "../../state/actions/actions";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Paper,
  Typography,
  Input,
  makeStyles,
  Modal,
} from "@material-ui/core";
import CommunicationSpeakerPhone from "material-ui/svg-icons/communication/speaker-phone";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  tableWrapper: {
    margin: 30,
    boxShadow: "10px 5px 5px lightgrey;",
  },
  tableHeaderRow: {
    backgroundColor: "black",
  },
  tableHeaderText: {
    color: "white",
    fontWeight: "bold",
  },
});

interface MessageTableProps {
  messages: {}[];
  ws: WebSocket;
  setMessages: React.Dispatch<React.SetStateAction<{}[]>>;
}

export const MessageTable: FC<MessageTableProps> = ({
  messages,
  ws,
  setMessages,
}) => {
  const classes = useRowStyles();
  console.log("inside message table");
  console.log("messages ", messages);

  // ws.onmessage = (event: any) => {
  //   console.log("client received: ", event.data);
  //   // console.log('type of data for event.data', typeof event.data);
  //   const array = event.data.split("message: ");
  //   // console.log(array);
  //   // console.log(array[1]);
  //   const data = JSON.parse(array[1]);
  //   // console.log('data after parse', data);
  //   // dispatch(appendMessageActionCreator(data));
  //   setMessages([...messages, data]);
  // };

  const flattenObj = (obj: any) => {
    const flatObj: any = {};
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === "object")
        Object.assign(flatObj, flattenObj(obj[key]));
      else flatObj[key] = obj[key];
    });
    return flatObj;
  };

  messages = messages.map((el) => flattenObj(el));
  console.log("flatmessages", messages);

  const [pageSize, setPageSize] = useState(25);
  const [pageIndex, setPageIndex] = useState(
    Math.floor(messages.length / pageSize)
  );
  const [togglePause, setTogglePause] = useState(false);
  // if (!togglePause) setPageIndex(Math.floor(messages.length / pageSize));
  const start = pageIndex * pageSize;
  const end = Math.min(start + pageSize, messages.length);
  const showMessages = messages.slice(start, end);
  const numEmptyRows = pageSize - (end - start);
  const emptyRows = [];
  for (let i = 0; i < numEmptyRows; i++) {
    emptyRows.push(
      <TableRow key={"emptyRow" + i} style={{ height: 53 }}>
        <TableCell
          colSpan={messages[0] ? Object.keys(messages[0]).length : 0}
        />
      </TableRow>
    );
  }

  const dispatch = useDispatch();

  ws.onmessage = (event: any) => {
    console.log("client received: ");
    // console.log('type of data for event.data', typeof event.data);
    const array = event.data.split("message: ");
    // console.log(array);
    // console.log(array[1]);
    const data = JSON.parse(array[1]);
    // console.log('data after parse', data);
    dispatch(appendMessageActionCreator(data));
    if (!togglePause) setPageIndex(Math.floor(messages.length / pageSize));
  };

  const handleChangePage = (
    e: React.MouseEvent<HTMLButtonElement> | null,
    pageIndex: number
  ) => {
    setPageIndex(pageIndex);
  };

  const handleChangePageSize = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newPageIndex = Math.floor(start / parseInt(e.target.value));
    if (newPageIndex === Math.floor(messages.length / pageSize))
      setTogglePause(false);
    else setTogglePause(true);
    setPageSize(parseInt(e.target.value));
    setPageIndex(newPageIndex);
  };

  return (
    <>
      <TableContainer component={Paper} className={classes.tableWrapper}>
        <Table aria-label="custom pagination table">
          <TableHead>
            <TableRow className={classes.tableHeaderRow}>
              {messages[0] &&
                Object.keys(messages[0]).map((key) => (
                  <TableCell style={{ color: "white" }}>{key}</TableCell>
                ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {showMessages.map((el, index) => (
              <TableRow key={index} style={{ height: 53 }}>
                {Object.values(el).map((value: any) => (
                  <TableCell>{value}</TableCell>
                ))}
              </TableRow>
            ))}
            {emptyRows}
          </TableBody>

          <TableFooter>
            <TableRow style={{ height: 53 }}>
              <TablePagination
                rowsPerPageOptions={[25, 50, 100]}
                count={messages.length}
                rowsPerPage={pageSize}
                page={pageIndex}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangePageSize}
                ActionsComponent={(props) => (
                  <MTPaginationOptions
                    {...props}
                    togglePause={togglePause}
                    setTogglePause={setTogglePause}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    totalMessages={messages.length}
                  />
                )}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

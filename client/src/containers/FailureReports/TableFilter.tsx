import React, { FC, useState } from 'react';

// setting - onlclick - shows up
// filters errors table
import {
  Button,
  Paper,
  Typography,
  Input,
  makeStyles,
  Modal,
} from '@material-ui/core';
import { Interface } from 'readline';
// maybe for metrics/ graphics for failure report
// timestamp  ( within a range) >=,   <=, a < timestamp, b

const colorState: any = {
  buttonSelected: 'blue',
  buttonNotSelected: 'white',
};

const useModalStyles = makeStyles(colorState);

interface TableFilterProps {
  errorMessage: {}[];
}

export const TableFilter: FC<TableFilterProps> = ({ errorMessage }) => {
  const classes = useModalStyles();
  // clientId = topic1; string
  // broker = something; string
  // selecting which columns appear in the table
  // include = {}
  // {namespace, brokerid, clientid, ... }
  let defaultObj: any = {};
  if (errorMessage[0]) {
    Object.keys(errorMessage[0]).forEach((key) => (defaultObj[key] = false));
  }
  const [buttonState, setButtonState] = useState(defaultObj);

  const handleClickButton = (e: any) => {
    console.log(e.target);
    console.log(e.target.id);
    console.log(e.target.classList); // []
    const key = e.target.id;
    setButtonState({ ...buttonState, [key]: !buttonState[key] });
  };
  return (
    <>
      {/* <div>{buttonState}</div> */}
      {/* to show selected filters */}
      <Paper>
        {errorMessage[0] &&
          Object.keys(errorMessage[0]).map((key) => (
            <Button
              onClick={handleClickButton}
              id={key}
              className={classes.buttonNotSelected}
              variant='contained'
            >
              {key}
            </Button>
          ))}
      </Paper>
    </>
  );
};

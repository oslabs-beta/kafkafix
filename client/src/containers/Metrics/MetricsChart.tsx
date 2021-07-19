import React, { useState } from 'react';

// importing componenents from M-UI
import {
  InputLabel,
  Button,
  Select,
  FormControl,
  MenuItem,
  Paper,
  Typography,
  Input,
  makeStyles,
  Modal,
} from '@material-ui/core';

import { requestParameters } from './requestParameters';

// styles
const useStyles = makeStyles(() => ({
  button: {
    display: 'block',
    marginBottom: 20,
  },
  formControl: {
    margin: 20,
    minWidth: 120,
  },
}));

export const MetricsChart = () => {
  const classes = useStyles();

  // local state for opening the selction for metrics
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  // local state for saving selected value
  const [selectedMetric, setSelectedMetric] = useState('');

  const toggleSelect = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const handleSelectedMetric = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedMetric(e.target.value as string);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>Select a metric from the list</InputLabel>
      <Select
        labelId='select-metric'
        id='slectMetric'
        open={isSelectOpen}
        onClose={toggleSelect}
        onOpen={toggleSelect}
        value={selectedMetric}
        onChange={handleSelectedMetric}
      ></Select>
      {/* Mapping menu items manually grabbed from Prometheus */}
      {requestParameters().map((el) => (
        <MenuItem value={el}>{el}</MenuItem>
      ))}
    </FormControl>
  );
};

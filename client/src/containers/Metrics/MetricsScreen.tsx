import React, { useState } from 'react';
import { requestParameters } from './requestParameters';
import { BarChart } from './BarChart';

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
  Card,
} from '@material-ui/core';

// styles
const useStyles = makeStyles(() => ({
  metricsWrapper: {
    display: 'flex',
  },
  button: {
    display: 'block',
    marginBottom: 20,
  },
  formControl: {
    margin: 20,
    minWidth: 120,
  },
}));

export const MetricsScreen = () => {
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

    // we might nead a helper fuction to create labels and values before storing in state
    // {
    //   labels: ['A', 'B', 'C', ...],
    //   datasets: [{
    //     label: 'My data',
    //     data: [10, 20, 30, ...],
    //     backgroundColor: '#112233'
    //   }]
    // }
    // make fetch request and save data to redux - data to be used in reusable charts
  };

  return (
    <React.Fragment>
      <Card className={classes.metricsWrapper}>
        {/* Form to select metric you want to display */}
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

        {/* Import bar Chart */}
        <BarChart />
        {/* Import Other Charts */}
      </Card>
    </React.Fragment>
  );
};

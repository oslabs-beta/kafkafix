import React, { useState } from 'react';
import { requestParameters } from './requestParameters';
import { BarChart } from './BarChart';
import NavBar from '../HomeScreen/Sidepanel/NavBar';
import { PieChart } from './PieChart';

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
  Card,
} from '@material-ui/core';

// styles
const useStyles = makeStyles(() => ({
  metricsWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  barChart: {
    alignItems: 'center',
  },
  pieChart: {
    width: 600,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 40,
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

  const handleSelectedMetric = (e: any) => {
    setSelectedMetric(e.target.value);

    // we nead a helper fuction to create labels and values before storing in state

    // make fetch request and save data to redux - data to be used in reusable charts

    let url = 'http://localhost:9090/api/v1/query?query=';

    console.log('selected metric', selectedMetric);
    console.log('e.target.value =>', e.target.value);
    console.log('this is the fetch request url =>', `${url}${e.target.value}`);
    fetch((url += e.target.value))
      .then((data) => data.json())
      .then((data) => console.log(data));
  };

  return (
    <React.Fragment>
      <Card className={classes.metricsWrapper}>
        <NavBar />
        {/* Form to select metric you want to display */}
        <FormControl className={classes.formControl}>
          <InputLabel>Select a metric from the dropdown</InputLabel>
          <Select
            labelId='select-metric'
            id='slectMetric'
            open={isSelectOpen}
            onClose={toggleSelect}
            onOpen={toggleSelect}
            value={selectedMetric}
            onChange={handleSelectedMetric}
          >
            <MenuItem value=''>None</MenuItem>
            {/* Mapping menu items manually grabbed from Prometheus */}
            {requestParameters().map((el) => (
              <MenuItem key={el} value={el}>
                {el}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Import bar Chart */}
        <Card className={classes.barChart}>
          <BarChart />
        </Card>

        {/* Import pie Chart */}
        <div className={classes.pieChart}>
          <PieChart />
        </div>
      </Card>
    </React.Fragment>
  );
};
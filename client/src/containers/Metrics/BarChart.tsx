import React, { useEffect, useRef, useState, FC } from 'react';
import { Chart, registerables } from 'chart.js';
import { useSelector } from 'react-redux';
import { overallState } from '../../state/reducers/index';
import { MetricsState } from '../../state/reducers/metricsReducer';

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

const useStyles = makeStyles(() => ({
  emptyWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

// chart.js 3 is ESM tree shakeable and requires to register all components that you are going to use. Thus, you have to register the linear scale manually
Chart.register(...registerables);

export const BarChart: FC = () => {
  // state object to plot the chart on
  const chartContainer: any = useRef(null);
  const classes = useStyles();
  // state of barchart
  const [chartInstance, setChartInstance] = useState<any>(null);

  // const chartData = {
  //   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //   datasets: [
  //     {
  //       label: '# of Votes',
  //       data: [12, 19, 3, 5, 2, 3],
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(255, 206, 86, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
  //         'rgba(153, 102, 255, 0.2)',
  //         'rgba(255, 159, 64, 0.2)',
  //       ],
  //       borderWidth: 4,
  //     },
  //   ],
  // };

  const chartData = useSelector<overallState, MetricsState['chartData']>(
    (state) => state.metrics.chartData
  );
  console.log('chartData state', chartData);

  const chartConfig: any = {
    type: 'bar',
    data: chartData,
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  };

  // const demoData = {
  //   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //   datasets: [
  //     {
  //       label: '# of Votes',
  //       data: [12, 19, 3, 5, 2, 3],
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(255, 206, 86, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
  //         'rgba(153, 102, 255, 0.2)',
  //         'rgba(255, 159, 64, 0.2)',
  //       ],
  //       borderWidth: 4,
  //     },
  //   ],
  // };

  useEffect(() => {
    // grab formatted data from state

    // assign it to chartConfig.data
    // chartConfig.data = chartData;
    if (chartInstance) chartInstance.clear();
    if (chartContainer && chartContainer.current) {
      const newChartInstance: any = new Chart(
        chartContainer.current,
        chartConfig
      );
      setChartInstance(newChartInstance);
    }
  }, [chartContainer, chartData]);

  const handleEmptyReturnValue = (): any => {
    return (
      <Card className={classes.emptyWrapper}>
        <Typography variant='h6'>
          The selected metric is currently unavailable
        </Typography>
        <Typography variant='caption'>
          Data is generated as you run your kafka cluster. Select another metric
        </Typography>
      </Card>
    );
  };

  const destroyCanvas = () => {
    const oldCanvas: HTMLCanvasElement | null =
      document.querySelector('canvas');
    if (oldCanvas) {
      // const twod = oldCanvas.getContext("2d");
      // if (twod)
      oldCanvas.remove();
    }
  };

  return (
    <>
      {Object.values(chartData).length ? (
        <canvas id='canvas' ref={chartContainer} />
      ) : (
        handleEmptyReturnValue()
      )}
    </>
  );
};

/*
                format for data object
{
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],
        borderWidth: 4
      }
    ]
  }

*/

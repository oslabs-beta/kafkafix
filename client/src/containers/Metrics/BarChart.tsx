import React, { useEffect, useRef, useState, FC } from 'react';
import { Chart, registerables } from 'chart.js';
import { useSelector } from 'react-redux';
import { overallState } from '../../state/reducers/index';
import { MetricsState } from '../../state/reducers/metricsReducer';

import {
  Typography,
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

  useEffect(() => {
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
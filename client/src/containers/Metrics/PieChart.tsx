import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { useSelector } from 'react-redux';
import { overallState } from '../../state/reducers/index';
import { MetricsState } from '../../state/reducers/metricsReducer';

// import {
//   InputLabel,
//   Button,
//   Select,
//   FormControl,
//   MenuItem,
//   Paper,
//   Typography,
//   Input,
//   makeStyles,
//   Card,
// } from '@material-ui/core';

// chart.js 3 is ESM tree shakeable and requires to register all components that you are going to use. Thus, you have to register the linear scale manually
Chart.register(...registerables);

export const PieChart = () => {
  // state object to plot the chart on
  const chartContainer: any = useRef(null);

  // state of barchart
  const [chartInstance, setChartInstance] = useState<any>(null);

  const chartData = useSelector<overallState, MetricsState['chartData']>(
    (state) => state.metrics.chartData
  );

  const config: any = {
    type: 'polarArea',
    data: {},
  };

  const demoData = {
    labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)',
        ],
      },
    ],
  };

  // const handleEmptyReturnValue = (): any => {
  //   return (
  //     <Card className={classes.emptyWrapper}>
  //       <Typography variant='h6'>
  //         The selected metric is currently unavailable
  //       </Typography>
  //       <Typography variant='caption'>
  //         Data is generated as you run your kafka cluster. Select another metric
  //       </Typography>
  //     </Card>
  //   );
  // };

  useEffect(() => {
    // grab formatted data from state

    // assign it to chartConfig.data
    if (chartInstance) chartInstance.clear();
    config.data = chartData;
    if (chartContainer && chartContainer.current) {
      const newChartInstance: any = new Chart(chartContainer.current, config);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer, chartData]);

  return (
    <>
      {Object.values(chartData).length ? (
        <canvas id='canvas2' ref={chartContainer} />
      ) : null}
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

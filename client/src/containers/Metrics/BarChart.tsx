import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { useSelector } from 'react-redux';
import { overallState } from '../../state/reducers/index';
import { MetricsState } from '../../state/reducers/metricsReducer';

// chart.js 3 is ESM tree shakeable and requires to register all components that you are going to use. Thus, you have to register the linear scale manually
Chart.register(...registerables);

export const BarChart = () => {
  // state object to plot the chart on
  const chartContainer: any = useRef(null);

  // state of barchart
  const [chartInstance, setChartInstance] = useState(null);

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

    if (chartContainer && chartContainer.current) {
      const newChartInstance: any = new Chart(
        chartContainer.current,
        chartConfig
      );
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  return (
    <>
      <canvas ref={chartContainer} />
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

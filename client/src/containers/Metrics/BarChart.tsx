import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js';

export const BarChart = () => {
  // state object to plot the chart on
  const chartContainer: any = useRef(null);

  // state of barchart
  const [chartInstance, setChartInstance] = useState(null);

  const chartConfig: any = {
    type: 'bar',
    data: {},
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

  const demoData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    // grab formatted data from state

    // assign it to chartConfig.data
    chartConfig.data = demoData;

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
        borderWidth: 1
      }
    ]
  }

*/

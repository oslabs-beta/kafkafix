import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';

// chart.js 3 is ESM tree shakeable and requires to register all components that you are going to use. Thus, you have to register the linear scale manually
Chart.register(...registerables);

export const PieChart = () => {
  // state object to plot the chart on
  const chartContainer: any = useRef(null);

  // state of barchart
  const [chartInstance, setChartInstance] = useState(null);

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

  useEffect(() => {
    // grab formatted data from state

    // assign it to chartConfig.data
    config.data = demoData;

    if (chartContainer && chartContainer.current) {
      const newChartInstance: any = new Chart(chartContainer.current, config);
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

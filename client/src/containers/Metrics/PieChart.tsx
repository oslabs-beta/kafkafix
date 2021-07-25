import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { useSelector } from 'react-redux';
import { overallState } from '../../state/reducers/index';
import { MetricsState } from '../../state/reducers/metricsReducer';

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

  useEffect(() => {
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
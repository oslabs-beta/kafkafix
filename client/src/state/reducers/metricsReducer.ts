import { Type } from '../constants/constants';
import { Action } from '../actions/actions';

export interface MetricsState {
  chartData: ChartData | Object;
}

interface ChartData {
  labels: string[],
  datasets: DataSet[]
}

interface DataSet {
  label: string,
  data: number[],
  backgroundColor: string [],
  borderWidth: number
}

const initialState: MetricsState = {
  chartData: {},
};

export const metricsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Type.POPULATE_CHART:
      return {
        ...state,
        chartData: action.payload,
      };
    default:
      return state;
  }
};

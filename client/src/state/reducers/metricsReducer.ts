import { Type } from '../constants/constants';
import { Action } from '../actions/actions';

interface metricsState {
  chartData: Object;
}
const initialState: metricsState = {
  chartData: {},
};

const metricsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Type.POPULATE_CHART:
      console.log('arrived in metricsReducer under POPULATE_CHART');
      return {
        ...state,
        chartData: action.payload,
      };
    default:
      return state;
  }
};

export default metricsReducer;

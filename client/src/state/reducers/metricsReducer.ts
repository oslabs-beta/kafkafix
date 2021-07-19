import { Type } from '../constants/constants';
import { Action } from '../actions/actions';

interface metricsState {
  barChartData: Object;
}
const initialState: metricsState = {
  barChartData: {},
};

const metricsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Type.POPULATE_BARCHART:
      console.log('arrived in metricsReducer under POPULATE BARCHART');
      return {
        ...state,
        barChartData: action.payload,
      };
    default:
      return state;
  }
};

export default metricsReducer;

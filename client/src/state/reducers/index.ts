import { combineReducers } from 'redux';
import sampleReducer from './sampleReducer';

const reducers = combineReducers({
	sample: sampleReducer,
});

export default reducers;

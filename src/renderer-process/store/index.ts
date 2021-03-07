import { createStore, combineReducers } from 'redux';
import moduleReducer from './modules/reducers';

const store = createStore(combineReducers([moduleReducer]));

export default store;

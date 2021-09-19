import {createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const middleswares = [thunk];

const initialState = {}

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleswares)));

export default store;
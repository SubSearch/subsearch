import { createStore } from 'redux';

import initialState from './initialState';
import reducer from './reducer';

export default createStore(reducer, initialState);
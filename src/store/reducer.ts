import RFDC from 'rfdc';

import initialState from './initialState';
import { Action, State } from './types';

const rfdc = RFDC({ proto: true });

export function reducer(_state: State = initialState, action: Action) {
  const state = rfdc(_state);
  switch (action.type) {
    case 'SET_VIDEO':
      state.video = action.payload;
      break;
    case 'SET_SUBTITLES':
      state.subtitles = action.payload;
      break;
    case 'CLEAR_SUBTITLES':
      state.subtitles = initialState.subtitles;
      break;
  }
  return state;
}

export default reducer;

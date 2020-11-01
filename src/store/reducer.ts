import RFDC from 'rfdc';

import initialState from './initialState';
import { Action, State } from './types';

const rfdc = RFDC({ proto: true });

export default function (_state: State = initialState, action: Action) {
  const state = rfdc(_state);
  switch (action.type) {
    case 'SET_VIDEO_ID':
      state.videoID = action.payload;
      state.languages = initialState.languages;
      state.language = initialState.language;
      state.subtitles = initialState.subtitles;
      break;
    case 'SET_LANGUAGES':
      state.languages = action.payload;
      break;
    case 'SET_LANGUAGE':
      state.language = action.payload;
      state.subtitles = initialState.subtitles;
      break;
    case 'SET_SUBTITLES':
      state.subtitles = action.payload;
      break;
  }
  return state;
}
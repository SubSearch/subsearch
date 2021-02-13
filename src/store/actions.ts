import { Dispatch } from 'redux';

import { Action } from './types';
import getSubtitles from '../util/getSubtitles';

export function setVideo(video: string): Action {
  return {
    type: 'SET_VIDEO',
    payload: video
  }
}

export function loadSubtitles(language: string, link: string) {
  return async (dispatch: Dispatch) => {
    if (!language || !link) return dispatch(clearSubtitles());
    const subtitles = await getSubtitles(language, link);
    dispatch<Action>({ type: 'SET_SUBTITLES', payload: subtitles });
  };
}

export function clearSubtitles(): Action {
  return { type: 'CLEAR_SUBTITLES' };
}

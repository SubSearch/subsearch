import { Dispatch } from 'redux';

import videoID from '../util/videoID';
import { Action } from './types';

const setLanguages = (languages: Record<string, string>): Action => {
  return {
    type: 'SET_LANGUAGES',
    payload: languages
  }
}

const setLanguage = (language: string): Action => {
  return {
    type: 'SET_LANGUAGE',
    payload: language
  }
}

const setSubtitles = (subtitles: Record<string, string>): Action => {
  return {
    type: 'SET_SUBTITLES',
    payload: subtitles
  }
}

const setVideoID = (videoID: string): Action => {
  return {
    type: 'SET_VIDEO_ID',
    payload: videoID
  }
}

let timeout: ReturnType<typeof setTimeout>;
export const loadLanguages = (videoLink: string) => (dispatch: Dispatch): void => {
  clearTimeout(timeout);
  const vID = videoID(videoLink);
  timeout = setTimeout(() => {
    dispatch(setVideoID(vID));
    if (!vID) return;
    setTimeout(() => {
      dispatch(setLanguages({ 'ru-RU': 'Russian' }));
    }, 1000);
  }, 1000);
}

export const loadSubtitles = (subtitlesLink: string) => (dispatch: Dispatch): void => {
  dispatch(setLanguage(subtitlesLink));
  if (!subtitlesLink) return;
  setTimeout(() => {
    dispatch(setSubtitles({ '0': 'Hello, world!', '426': 'Good bye, world!' }));
  }, 1000);
}

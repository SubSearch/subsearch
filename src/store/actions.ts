import { Dispatch } from 'redux';

import videoID from '../util/videoID';
import { getSubtitles, getSubtitleURLs } from '../util/YouTube';
import { Action } from './types';

const setLanguages = (languages: Map<string, string>): Action => {
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

const setSubtitles = (subtitles: Map<number, string>): Action => {
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
  timeout = setTimeout(async () => {
    dispatch(setVideoID(vID));
    if (!vID) return;
      const languages = await getSubtitleURLs(vID);
      if (!languages) return;
      dispatch(setLanguages(languages));
  }, 1000);
}

export const loadSubtitles = (subtitlesLink: string) => (dispatch: Dispatch): void => {
  dispatch(setLanguage(subtitlesLink));
  if (!subtitlesLink) return;
  getSubtitles(subtitlesLink).then((subtitles) => {
    dispatch(setSubtitles(subtitles));
  })
}

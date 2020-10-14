import { Dispatch } from 'redux';
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

export const setVideoLink = (videoLink: string): Action => {
  return {
    type: 'SET_VIDEO_LINK',
    payload: videoLink
  }
}

export const setSearchQuery = (query: string): Action => {
  return {
    type: 'SET_SEARCH_QUERY',
    payload: query
  }
}

let timeout: ReturnType<typeof setTimeout>;
export const loadLanguages = (videoLink: string) => (dispatch: Dispatch): void => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    dispatch(setVideoLink(videoLink));
    if (!videoLink) return;
    setTimeout(() => {
      dispatch(setLanguages({ 'ru-RU': 'Russian' }));
    }, 1000);
  }, 1000);
}

export const loadSubtitles = (subtitlesLink: string) => (dispatch: Dispatch): void => {
  dispatch(setLanguage(subtitlesLink));
  if (!subtitlesLink) return;
  setTimeout(() => {
    dispatch(setSubtitles({ '00:00': 'Hello, world!', '06:66': 'Good bye, world!' }));
  }, 1000);
}

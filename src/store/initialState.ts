import { State } from './types';

const initialState: State = {
  videoID: '',
  languages: new Map<string, string>(),
  language: '',
  subtitles: new Map<number, string>()
};

export default initialState;

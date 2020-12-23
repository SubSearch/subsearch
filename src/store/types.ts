import { YoutubeSubtitle } from '../util/getSubtitles';

export interface State {
  subtitles: YoutubeSubtitle[];
}

interface ActionSetSubtitles {
  type: 'SET_SUBTITLES';
  payload: State['subtitles'];
}

interface ActionClearSubtitles {
  type: 'CLEAR_SUBTITLES';
}

type ActionSubtitles = ActionSetSubtitles | ActionClearSubtitles;

export type Action = ActionSubtitles;

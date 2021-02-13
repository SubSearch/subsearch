import { YoutubeSubtitle } from '../util/getSubtitles';

export interface State {
  subtitles: YoutubeSubtitle[];
  video: string;
}

interface ActionSetVideo {
  type: 'SET_VIDEO';
  payload: State['video'];
}

interface ActionSetSubtitles {
  type: 'SET_SUBTITLES';
  payload: State['subtitles'];
}

interface ActionClearSubtitles {
  type: 'CLEAR_SUBTITLES';
}

type ActionSubtitles = ActionSetSubtitles | ActionClearSubtitles;
type ActionVideo = ActionSetVideo;

export type Action = ActionSubtitles | ActionVideo;

export default Action;

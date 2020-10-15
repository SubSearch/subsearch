export type Action = {
  type: 'SET_VIDEO_ID' | 'SET_LANGUAGES' | 'SET_LANGUAGE' | 'SET_SUBTITLES';
  payload: any;
};

export type State = {
  videoID: string;
  languages: Record<string, string>;
  language: string;
  subtitles: Record<number, string>;
};

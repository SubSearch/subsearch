export type Action = {
  type: 'SET_VIDEO_LINK' | 'SET_LANGUAGES' | 'SET_LANGUAGE' | 'SET_SUBTITLES' | 'SET_SEARCH_QUERY';
  payload: any;
};

export type State = {
  videoLink: string;
  languages: Record<string, string>;
  language: string;
  subtitles: Record<string, string>;
  searchQuery: string;
};

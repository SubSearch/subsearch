import axios from 'axios';
import { parseSync, Node } from 'subtitle';
import secondsToTimeCode from './secondsToTimeCode';

export interface Language {
  name: string;
  url: string;
}

export interface Subtitle {
  timecode: string;
  seconds: number;
  text: string;
}

export async function getSubtitleURLs(
  videoID: string,
  format: string = 'vtt'
): Promise<Language[] | null> {
  const url = `http://f0492998.xsph.ru/get_video_info.php?video_id=${videoID}`;
  const { data } = await axios.get(url);
  const params = new URLSearchParams(data);
  const response = JSON.parse(String(params.get('player_response')));
  const tracks: any[] =
    response?.captions?.playerCaptionsTracklistRenderer?.captionTracks ?? [];
  if (!tracks) return null;
  const result: Language[] = [];
  tracks.forEach((track) => {
    const name = track.name?.simpleText;
    const url = `${track?.baseUrl}&format=${format}`;
    result.push({ name, url });
  });
  return result;
}

export async function getSubtitles(subtitlesURL: string): Promise<Subtitle[]> {
  const { data } = await axios.get(subtitlesURL);
  const result: Subtitle[] = [];
  parseSync(data).reduce(
    (previous: Node, node: Node) => {
      if (node.type !== 'cue') return node;
      if (node.data.text.match('<c>')) return node;
      const start =
        previous.type === 'cue' ? previous.data.start : node.data.start;
      const seconds = Math.floor(start / 1000);
      const timecode = secondsToTimeCode(seconds);
      const text = node.data.text.replace(/(<([^>]+)>)/gi, '');
      result.push({ seconds, timecode, text });
      return node;
    },
    { type: 'cue', data: { start: 0, end: 0, text: '' } }
  );
  return result;
}

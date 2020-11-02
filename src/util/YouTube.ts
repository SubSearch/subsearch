import axios from 'axios';
import { parseSync, Node } from 'subtitle';

export async function getSubtitleURLs(
  videoID: string,
  format: string = 'vtt'
): Promise<Map<string, string> | null> {
  const URL = `https://www.youtube.com/get_video_info?video_id=${videoID}`;
  const { data } = await axios.get(
    `https://cors-anywhere.herokuapp.com/${URL}`
  );
  const params = new URLSearchParams(data);
  const response = JSON.parse(String(params.get('player_response')));
  const tracks = response.captions?.playerCaptionsTracklistRenderer?.captionTracks;
  if (!tracks) return null;
  const result = new Map<string, string>();
  Array.from(tracks).forEach((track: any) => {
    const displayName = track?.name?.simpleText;
    const baseURL = `${track?.baseUrl}&format=${format}`;
    result.set(baseURL, displayName);
  });
  return result;
}

export async function getSubtitles(
  subtitlesURL: string
): Promise<Map<number, string>> {
  const { data } = await axios.get(subtitlesURL);
  const result = new Map<number, string>();
  parseSync(data).reduce((previous: Node, node: Node) => {
    if (node.type !== 'cue') return node;
    if (node.data.text.match('<c>')) return node;
    const start = previous.type === 'cue' ? previous.data.start : node.data.start;
    const seconds = Math.floor(start / 1000);
    const text = node.data.text.replace(/(<([^>]+)>)/gi, '');
    result.set(seconds, text);
    return node;
  }, { type: 'cue', data: { start: 0, end: 0, text: '' } });
  return result;
}

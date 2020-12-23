import axios from 'axios';
import { parseSync, NodeCue } from 'subtitle';
import secondsToTimecode from './secondsToTimecode';

export interface Subtitle {
  timecode: string;
  seconds: number;
  text: string;
}

export interface YoutubeSubtitle extends Subtitle {
  url: string;
}

async function getRawSubtitles(subtitlesUrl: string): Promise<string> {
  const { data } = await axios.get(subtitlesUrl);
  if (!data || typeof data !== 'string')
    throw new Error('Empty or incorrect response');
  return data;
}

function parseYoutubeSubtitles(rawSubtitles: string, videoId: string) {
  const result: YoutubeSubtitle[] = [];
  const nodes = parseSync(rawSubtitles);
  let previous: NodeCue | undefined;
  for (const node of nodes) {
    if (node.type !== 'cue') continue;
    if (!previous || node.data.text.match('<c>')) {
      previous = node;
      continue;
    }
    const start = previous.data.start;
    const seconds = Math.floor(start / 1000);
    const timecode = secondsToTimecode(seconds);
    const text = node.data.text.replace(/(<([^>]+)>)/gi, '');
    const url = `https://youtube.com/watch?v=${videoId}&t=${seconds}`;
    result.push({ seconds, timecode, text, url });
    previous = node;
  }
  return result;
}

export function parseSubtitles(rawSubtitles: string): Subtitle[];
export function parseSubtitles(
  rawSubtitles: string,
  videoUrl: string
): YoutubeSubtitle[];
export function parseSubtitles(
  rawSubtitles: string,
  videoUrl?: string
): Subtitle[] | YoutubeSubtitle[] {
  if (videoUrl) return parseYoutubeSubtitles(rawSubtitles, videoUrl);
  const nodes = parseSync(rawSubtitles);
  const result: Subtitle[] = [];
  for (const node of nodes) {
    if (node.type !== 'cue' || node.data.text.match('<c>')) continue;
    const start = node.data.start;
    const seconds = Math.floor(start / 1000);
    const timecode = secondsToTimecode(seconds);
    const text = node.data.text.replace(/(<([^>]+)>)/gi, '');
    result.push({ seconds, timecode, text });
  }
  return result;
}
export async function getSubtitles(subtitlesUrl: string): Promise<Subtitle[]>;
export async function getSubtitles(
  subtitlesUrl: string,
  videoId: string
): Promise<YoutubeSubtitle[]>;
export async function getSubtitles(
  subtitlesUrl: string,
  videoId?: string
): Promise<Subtitle[] | YoutubeSubtitle[]> {
  const subtitles = await getRawSubtitles(subtitlesUrl);
  return parseSubtitles(subtitles, videoId as string);
}

export default getSubtitles;

export function videoId(url: string): string | null {
  const parts = url.split(/vi\/|v=|\/v\/|youtu\.be\/|\/embed\//);
  // if the url is the video ID itself
  if (!parts[1]) return parts[0];
  const match = parts[1].match(/^[\w\d_-]{11}/);
  // if we couldn't find the video ID
  if (!match) return null;
  return match[0];
}

export default videoId;

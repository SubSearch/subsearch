import React, { useState } from 'react';
import { Container, Input, Table } from 'semantic-ui-react';
import YouTube from 'react-youtube';
import Fuse from 'fuse.js';

import { YoutubeSubtitle } from '../../util/getSubtitles';
import { useSelector } from 'react-redux';
import { State } from '../../store/types';
import { videoId } from '../../util';

function SubtitleDisplay() {
  const video = useSelector<State>((state) => state.video) as string;
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [player, setPlayer] = useState<any>(null);
  const [toSeconds, setToSeconds] = useState(0);
  const subtitles = useSelector<State>(
    (state) => state.subtitles
  ) as YoutubeSubtitle[];
  const fuse = new Fuse(subtitles, { keys: ['text'] });

  return (
    <React.Fragment>
      <Input
        label="Subtitle search query"
        type="text"
        fluid
        disabled={subtitles.length === 0}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {subtitles.length === 0 ? null : (
        <YouTube
          videoId={videoId(video) || ''}
          opts={{ width: '100%' }}
          onReady={({ target }) => {
            setPlayer(target);
          }}
          onPlay={({ target }) => {
            if (!toSeconds) return;
            target?.seekTo(toSeconds);
            setToSeconds(0);
          }}
        />
      )}

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Link</Table.HeaderCell>
            <Table.HeaderCell>Timecode</Table.HeaderCell>
            <Table.HeaderCell>Text</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {fuse
            .search(searchQuery)
            .map(({ item: { seconds, timecode, text, url } }) => {
              return (
                <Table.Row key={`${seconds}:${text}`}>
                  <Table.Cell>
                    <a href={url} target="_blank">
                      🔗
                    </a>
                  </Table.Cell>
                  <Table.Cell>
                    <a
                      href="#"
                      onClick={() => {
                        player?.pauseVideo();
                        player?.playVideo();
                        setToSeconds(seconds);
                      }}
                    >
                      {timecode}
                    </a>
                  </Table.Cell>
                  <Table.Cell>{text}</Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </React.Fragment>
  );
}

export default SubtitleDisplay;

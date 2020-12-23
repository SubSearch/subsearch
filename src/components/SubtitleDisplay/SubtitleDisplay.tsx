import React, { useState } from 'react';
import { Input, Table } from 'semantic-ui-react';
import Fuse from 'fuse.js';

import { YoutubeSubtitle } from '../../util/getSubtitles';
import { useSelector } from 'react-redux';
import { State } from '../../store/types';

function SubtitleDisplay() {
  const [searchQuery, setSearchQuery] = useState<string>('');
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

      <Table celled>
        <Table.Header>
          <Table.Row>
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
                    <a href={url} target="_blank" rel="noopener noreferrer">
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
